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


const colorOptions = [
  "#FF5733", "#33FF57", "#3357FF", "#FF33FF", "#FFFF33", "#33FFFF", "#FF8033", "#8033FF",
  "#33FF99", "#33CCFF", "#FFCC33", "#9966FF", "#66FF33", "#FF9933", "#CC33FF", "#FFD700",
  "#D2691E", "#8A2BE2", "#DC143C", "#20B2AA"
];

interface ColorPickerProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

const ColorPicker = ({ selectedColor, onColorSelect }: ColorPickerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [numColumns, setNumColumns] = useState(5); 

  const handleSelectColor = (color: string) => {
    onColorSelect(color);
    setIsVisible(false);
  };

  return (
    <>
      <View className="flex-row justify-between items-center pb-4 border-b border-gray-500 w-full">
        <View className="flex-row items-center">
          <Ionicons name="color-palette-outline" size={25} color="#E2E8F0" />
          <Text className="pl-5 text-[#9CA3AF]">{"Escolha uma cor"}</Text>
        </View>

        <TouchableOpacity
          onPress={() => setIsVisible(true)}
          className="flex-row items-center gap-3"
        >
          <View
            className={`w-6 h-6 rounded-full flex items-center justify-center ${
              selectedColor ? "" : "border border-gray-400"
            }`}
          >
            <View
              className={`w-5 h-5 rounded-full ${selectedColor ? "" : ""}`}
              style={{ backgroundColor: selectedColor || "transparent" }}
            />
          </View>

          {/* "Outras cores" text */}
          <View className="bg-gray-500 rounded-lg flex px-4 justify-center items-center text-center h-6">
            <Text className="text-gray-200">{"Outras cores"}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Color Picker Modal */}
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
                padding: 15,
                width: Dimensions.get("window").width - 40,
              }}
            >
              <FlatList
                key={numColumns} 
                data={colorOptions}
                keyExtractor={(item) => item}
                numColumns={numColumns}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleSelectColor(item)}
                    style={{
                      backgroundColor: item,
                      width: 50,
                      height: 50,
                      margin: 8,
                      borderRadius: 25,
                      borderWidth: item === selectedColor ? 4 : 1,
                      borderColor: item === selectedColor ? "#FFFFFF" : "#333",
                      shadowColor: item === selectedColor ? "#FFFFFF" : "transparent",
                      shadowOpacity: 0.8,
                      shadowRadius: 10,
                      elevation: 5,
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
