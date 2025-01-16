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
import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  Fontisto,
  AntDesign,
} from "@expo/vector-icons";
import { expoIcons, getIcon, IconType } from "../utils/iconsCategory";

interface IconPickerProps {
  selectedIcon: keyof typeof expoIcons | null;
  onIconSelect: (iconKey: keyof typeof expoIcons) => void;
}

const renderIconByType = (icon: IconType, size: number, color: string) => {
  switch (icon.type) {
    case "Ionicons":
      return (
        <Ionicons
          name={icon.name as keyof typeof Ionicons.glyphMap}
          size={size}
          color={color}
        />
      );
    case "MaterialIcons":
      return (
        <MaterialIcons
          name={icon.name as keyof typeof MaterialIcons.glyphMap}
          size={size}
          color={color}
        />
      );
    case "FontAwesome":
      return (
        <FontAwesome
          name={icon.name as keyof typeof FontAwesome.glyphMap}
          size={size}
          color={color}
        />
      );
    default:
      return null;
  }
};

export default function IconPicker({
  selectedIcon,
  onIconSelect,
}: IconPickerProps) {
  const [isVisible, setIsVisible] = useState(false);

  const handleSelectIcon = (iconKey: keyof typeof expoIcons) => {
    onIconSelect(iconKey);
    setIsVisible(false);
  };

  // Converter o objeto de ícones em um array para o FlatList
  const iconsList = Object.entries(expoIcons).map(([key, value]) => ({
    key,
    ...value,
  }));

  return (
    <>
      <View className="flex-row justify-between items-center py-3 border-b border-gray-500 w-full">
        <View className="flex-row justify-between items-center">
          <Fontisto name="nav-icon-grid-a" size={20} color="#E2E8F0" />
          <Text className="pl-5 text-[#9CA3AF]">Escolha um Ícone</Text>
        </View>

        <TouchableOpacity
          onPress={() => setIsVisible(true)}
          className="flex-row items-center gap-3"
        >
          {selectedIcon ? (
            <View className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-[#9CA3AF]">
              {renderIconByType(getIcon(selectedIcon), 18, "#E2E8F0")}
            </View>
          ) : (
            <View className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-[#9CA3AF]">
              <AntDesign name="ellipsis1" size={20} color="#E2E8F0" />
            </View>
          )}
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
                padding: 15,
                width: Dimensions.get("window").width - 40,
                maxHeight: Dimensions.get("window").height * 0.7,
              }}
            >
              <FlatList
                data={iconsList}
                keyExtractor={(item) => item.key}
                numColumns={4}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      handleSelectIcon(item.key as keyof typeof expoIcons)
                    }
                    style={{
                      flex: 1,
                      alignItems: "center",
                      margin: 8,
                      padding: 10,
                      borderRadius: 10,
                      backgroundColor:
                        selectedIcon === item.key ? "#1F2937" : "#475569",
                    }}
                  >
                    {renderIconByType(
                      { type: item.type, name: item.name },
                      30,
                      selectedIcon === item.key ? "#FFFFFF" : "#E2E8F0"
                    )}
                    <Text
                      style={{
                        marginTop: 5,
                        color: "#FFFFFF",
                        fontSize: 12,
                        textAlign: "center",
                      }}
                      numberOfLines={1}
                    >
                      {item.key}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}
