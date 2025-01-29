import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colorOptions from "../utils/colorOptions";

interface ColorPickerProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

const ColorPicker = ({ selectedColor, onColorSelect }: ColorPickerProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const screenWidth = Dimensions.get("window").width;
  const colorSize = screenWidth * 0.1;
  const colorSpacing = screenWidth * 0.02;
  const numColumns = Math.floor(screenWidth / (colorSize + colorSpacing));

  const handleSelectColor = (color: string) => {
    onColorSelect(color);
    setIsVisible(false);
  };

  return (
    <>
      <View className="flex-row justify-between items-center py-3 border-b  border-gray-500 w-full">
        <View className="flex-row items-center">
          <Ionicons name="color-palette-outline" size={25} color="#E2E8F0" />
          <Text className="pl-3 text-[#9CA3AF]">Escolha uma Cor</Text>
        </View>

        <TouchableOpacity
          onPress={() => setIsVisible(true)}
          className="flex-row items-center gap-3"
        >
          <View className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-[#9CA3AF]">
            <View
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: selectedColor || "transparent" }}
            />
          </View>
          <View className="bg-gray-500 rounded-lg flex px-4 justify-center items-center text-center h-6">
            <Text className="text-gray-200">Outras ...</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Modal transparent visible={isVisible} animationType="fade">
        <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#334155",
                borderRadius: 12,
                padding: 12,
                width: screenWidth - 40,
                maxHeight: Dimensions.get("window").height * 0.8,
              }}
            >
              <FlatList
                data={colorOptions}
                keyExtractor={(item) => item}
                key={numColumns.toString()}
                numColumns={numColumns}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleSelectColor(item)}
                    style={{
                      width: colorSize,
                      height: colorSize,
                      margin: colorSpacing / 2,
                      borderRadius: colorSize / 2,
                      backgroundColor: item,
                      borderColor: item === selectedColor ? "#FFFFFF" : "#333",
                      borderWidth: item === selectedColor ? 4 : 1,
                    }}
                  />
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default ColorPicker;
