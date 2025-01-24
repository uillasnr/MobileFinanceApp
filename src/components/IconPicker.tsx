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

  const screenWidth = Dimensions.get("window").width;
  const iconSize = screenWidth * 0.1; // Tamanho do ícone baseado na largura da tela
  const iconSpacing = screenWidth * 0.02; // Espaçamento entre os ícones

  // Converter o objeto de ícones em um array para o FlatList
  const iconsList = Object.entries(expoIcons).map(([key, value]) => ({
    key,
    ...value,
  }));

  // Calcular número de colunas
  const numColumns = Math.floor(screenWidth / (iconSize + iconSpacing));

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
                padding: 12,
                width: screenWidth - 40,
                maxHeight: Dimensions.get("window").height * 0.8,
              }}
            >
              <FlatList
                data={iconsList}
                keyExtractor={(item) => item.key}
                key={numColumns.toString()} // Alterar chave quando o número de colunas mudar
                numColumns={numColumns} // Número de colunas dinâmico
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      handleSelectIcon(item.key as keyof typeof expoIcons)
                    }
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      width: iconSize,
                      height: iconSize,
                      margin: iconSpacing / 2,
                      borderRadius: iconSize / 2,
                      backgroundColor:
                        selectedIcon === item.key ? "" : "#475569",
                      borderColor:
                        item.key === selectedIcon ? "#FFFFFF" : "#333",
                      borderWidth: item.key === selectedIcon ? 4 : 1,
                    }}
                  >
                    {renderIconByType(
                      { type: item.type, name: item.name },
                      iconSize * 0.5,
                      selectedIcon === item.key ? "#FFFFFF" : "#E2E8F0"
                    )}
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
