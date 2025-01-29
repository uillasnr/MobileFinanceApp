import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Ionicons, MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";
import ColorPicker from "./ColorPicker";
import IconPicker from "./IconPicker";
import { expoIcons } from "../utils/iconsCategory";

interface NewCategoryCreatorProps {
  onCreateCategory: (category: {
    name: string;
    color: string;
    icon: keyof typeof expoIcons;
  }) => void;
  isVisible: boolean;
  onClose: () => void;
  type: "expense" | "income";
}

export default function NewCategoryCreator({
  onCreateCategory,
  isVisible,
  onClose,
  type,
}: NewCategoryCreatorProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const screenHeight = Dimensions.get("window").height;

  const [categoryName, setCategoryName] = useState("");
  const [categoryColor, setCategoryColor] = useState("#FFFFFF");
  const [icon, setIcon] = useState<keyof typeof expoIcons | null>(null); // Alteração aqui

  const handleCreateCategory = () => {
    if (categoryName.trim() && icon) {
      // Verificando se o ícone é selecionado
      onCreateCategory({
        name: categoryName,
        color: categoryColor,
        icon: icon,
      });
      setCategoryName("");
      setCategoryColor("#FFFFFF");
      setIcon(null); // Resetando o ícone para null após criação
      bottomSheetRef.current?.close();
      onClose();
    }
  };

  if (!isVisible) {
    return null;
  }

  const buttonColor =
    type === "expense" ? "#F87171" : type === "income" ? "#34D399" : "#3B82F6";

  return (
    <TouchableWithoutFeedback onPress={onClose} accessible={false}>
      <View
        style={{
          flex: 1,
          backgroundColor: "transparent",
          height: screenHeight,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <BottomSheet
          containerStyle={{ flex: 1, backgroundColor: "transparent" }}
          index={0}
          snapPoints={["60%"]}
          onClose={onClose}
          ref={bottomSheetRef}
          backgroundStyle={{ backgroundColor: "#334155" }}
          enableOverDrag
          enablePanDownToClose
          handleIndicatorStyle={{ backgroundColor: "#9CA3AF" }}
        >
          <BottomSheetView style={{ flex: 1 }}>
            <View className="p-4 flex-1">
              <Text className="text-xl font-medium text-center text-gray-200 mb-8">
                Criar Nova Categoria
              </Text>

              <View className="flex-row  border-b  items-center  border-gray-500">
                <MaterialCommunityIcons
                  name="file-document-outline"
                  size={25}
                  color="#E2E8F0" style={{marginBottom:10}}
                />
                <TextInput
                  value={categoryName}
                  onChangeText={setCategoryName}
                  placeholder="Nome da Categoria"
                  placeholderTextColor="#9CA3AF"
                  className="pl-3 mb-2 text-gray-200 w-full "
                />
              </View>

              <View>
                <ColorPicker
                  selectedColor={categoryColor}
                  onColorSelect={setCategoryColor}
                />
              </View>

              <View>
                <IconPicker selectedIcon={icon} onIconSelect={setIcon} />
              </View>

              <TouchableOpacity
                onPress={handleCreateCategory}
                style={{ backgroundColor: buttonColor }}
                className="p-4  rounded-lg mt-10"
              >
                <Text className="text-white text-center font-medium">
                  Criar Categoria
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onClose}
                className="p-4 bg-gray-500 rounded-lg mt-4"
              >
                <Text className="text-white text-center font-medium">
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </TouchableWithoutFeedback>
  );
}
