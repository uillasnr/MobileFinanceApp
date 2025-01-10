import React, { useCallback, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import BottomSheet, { BottomSheetFlatList, BottomSheetView } from "@gorhom/bottom-sheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface CategorySelectorProps {
  categories: string[];
  onSelectCategory: (category: string) => void;
  isVisible: boolean;
  onClose: () => void;
  selectedCategory?: string;
}

export default function CategorySelector({ categories, onSelectCategory, isVisible,
   onClose, selectedCategory,}: CategorySelectorProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const screenHeight = Dimensions.get("window").height;

  const handleSelectCategory = useCallback(
    (category: string) => {
      onSelectCategory(category);
      bottomSheetRef.current?.close();
      onClose();
    },
    [onSelectCategory, onClose]
  );

  const renderItem = useCallback(
    ({ item }: { item: string }) => {
      const isSelected = selectedCategory === item;

      return (
        <TouchableOpacity
          onPress={() => handleSelectCategory(item)}
          className="p-4 border-b border-gray-600 flex-row items-center justify-between"
        >
          <View className="flex-row items-center">
            <MaterialCommunityIcons
              name="tag"
              size={20}
              color="#E2E8F0"
              style={{ marginRight: 12 }}
            />
            <Text className="text-base text-gray-200">{item}</Text>
          </View>

          <View
            className={`w-6 h-6 rounded-full flex items-center justify-center ${
              isSelected ? "border-2 border-secondary" : "border border-gray-400"
            }`}
          >
            <View
              className={`w-3 h-3 rounded-full ${
                isSelected ? "bg-secondary" : ""
              }`}
            />
          </View>
        </TouchableOpacity>
      );
    },
    [selectedCategory, handleSelectCategory]
  );

  if (!isVisible) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={onClose} accessible={false}>
      <View style={{ 
        flex: 1, 
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        height: screenHeight,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}>
        <BottomSheet
          containerStyle={{ 
            flex: 1, 
            backgroundColor: "transparent",
          }}
          index={0}
          snapPoints={["50%"]} 
          onClose={onClose}
          ref={bottomSheetRef}
          backgroundStyle={{
            backgroundColor: "#334155",
          }}
          enableOverDrag
          enablePanDownToClose
          handleIndicatorStyle={{
            backgroundColor: "#9CA3AF",
          }}
        >
          <BottomSheetView style={{ flex: 1, }}>
            <View className="p-4 flex-1 ">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-xl font-medium text-center text-gray-200 flex-1">
                  Selecione uma Categoria
                </Text>
               
              </View>

              <BottomSheetFlatList
                data={categories}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20,}}
                
              />
            </View>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </TouchableWithoutFeedback>
  );
}