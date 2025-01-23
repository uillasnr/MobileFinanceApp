import React from "react";
import { Text, View } from "react-native";
import { TransactionCardProps } from "../types/transaction";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";

export default function TransactionCard({
  title,
  category,
  amount,
}: TransactionCardProps) {
  const amountColor = amount < 0 ? "bg-red-500" : "bg-green-500"; 
  const TextColor = amount < 0 ?  "text-red-500" : "text-green-500"; 

  return (
    <View className="bg-background-dark p-2 mb-2 px-3 rounded-lg shadow-md flex-row items-center justify-between">
      {/* Ícone e Informações */}
      <View className="flex-row items-center gap-3">
        {/* Ícone com Cor Dinâmica */}
        <View
          className={`w-8 h-8 rounded-full flex items-center justify-center ${amountColor}`}
        >
          <AntDesign name="pushpino" size={16} color="#E2E8F0" />
        </View>

        {/* Informações */}
        <View>
          <Text className="text-text-light font-bold text-sm">{title}</Text>
          <Text className="text-gray-500 text-xs">{category}</Text>
        </View>
      </View>

      {/* Valor */}
      <View>
        <Text className={`text-base font-bold text-right ${TextColor}`}>
          {amount < 0
            ? `-R$ ${Math.abs(amount).toFixed(2)}`
            : `R$ ${amount.toFixed(2)}`}
        </Text>
        <View className="flex-row items-center gap-2 justify-end pr-1">
          <AntDesign name="pushpino" size={13} color="#E2E8F0" />
          <SimpleLineIcons name="envelope-letter" size={13} color="#E2E8F0" />
        </View>
      </View>
    </View>
  );
}
