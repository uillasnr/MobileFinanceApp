import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

interface ExpenseData {
  id: string;
  label: string;
  value: number;
  color: string;
}

interface CategoryListProps {
  filteredData: ExpenseData[];
  selectedCategory: string;
  selectedColor: string;
  onCategoryPress: (categoryId: string, categoryLabel: string) => void;
}

export default function CategoryList({
  filteredData,
  selectedCategory,
  selectedColor,
  onCategoryPress,
}: CategoryListProps) {

  const categoriesfiltere = filteredData.filter(category => category.value > 0);

  return (
    <View style={{ height: height * 0.5, padding: 10 }}>
      
      <ScrollView showsVerticalScrollIndicator={false} className="py-2">
        {categoriesfiltere.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => onCategoryPress(category.id, category.label)}
            activeOpacity={0.8}
            className={`p-4 mb-3 rounded-lg shadow-md h-14 ${
              selectedCategory === category.id
                ? "bg-card-dark"
                : "bg-card-dark bg-opacity-100"
            }`}
          >
            <View className="flex-row items-center justify-between w-full">
              <View className="flex-row items-center">
                <View
                  className="w-4 h-4 rounded-full mr-3"
                  style={{
                    backgroundColor:
                      selectedCategory === category.id
                        ? selectedColor
                        : category.color,
                  }}
                />
                <Text 
                  className={`text-sm font-bold text-text-light ${
                    selectedCategory === category.id ? "" : "opacity-70"
                  }`}
                >
                  {category.label}
                </Text>
              </View>
              <Text 
                className={`text-base font-bold text-text-light ${
                  selectedCategory === category.id ? "" : "opacity-70"
                }`}
              >
                R$ {category.value.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}