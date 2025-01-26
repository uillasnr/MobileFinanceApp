import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

import CategoryChart from "@/src/components/CategoryChart";
import FinancialEvolutionChart from "./FinancialEvolutionChart ";


type ChartType = "financialEvolution" | "category";

interface ChartSelectorProps {
  selectedChart: ChartType;
  onSelectChart: (chart: ChartType) => void;
  selectedMonth: { month: number; year: number };
}

const ChartSelector: React.FC<ChartSelectorProps> = ({
  selectedChart,
  onSelectChart,
  selectedMonth,
}) => {
  return (
    <View className="flex-1 justify-center items-center ">

      <View className="flex-row w-full mb-4">
        <TouchableOpacity
          onPress={() => onSelectChart("category")}
          className={`flex-1 flex-row items-center justify-center px-4  ${
            selectedChart === "category" ? "text-green-500" : "text-gray-300"
          }`}
        >
          <FontAwesome5
            name="chart-pie"
            size={18}
            color={selectedChart === "category" ? "#fff" : "#4A5568"}
          />
          <Text
            className={`ml-2 text-[10px] ${
              selectedChart === "category" ? "text-white" : "text-gray-700"
            }`}
          >
            Categorias
          </Text>
        </TouchableOpacity>

  
        <View className="border-l-2 border-gray-500 mx-4 h-5" />

        <TouchableOpacity
          onPress={() => onSelectChart("financialEvolution")}
          className={`flex-1 flex-row items-center justify-center px-4  ${
            selectedChart === "financialEvolution"
              ? "text-green-500"
              : "text-gray-300"
          }`}
        >
          <MaterialIcons
            name="show-chart"
            size={18}
            color={selectedChart === "financialEvolution" ? "#fff" : "#4A5568"}
          />
          <Text
            className={`ml-2 text-[10px] ${
              selectedChart === "financialEvolution"
                ? "text-white"
                : "text-gray-700"
            }`}
          >
            Evolução Financeira
          </Text>
        </TouchableOpacity>
      </View>

      {selectedChart === "category" ? (
        <CategoryChart selectedMonth={selectedMonth} />
      ) : (
        <FinancialEvolutionChart selectedMonth={selectedMonth}/>
      )}
    </View>
  );
};

export default ChartSelector;
