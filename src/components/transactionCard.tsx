import React from "react";
import { Text, View } from "react-native";
import { TransactionCardProps } from "../types/transaction";

export default function TransactionCard({
  title,
  category,
  amount,
}: TransactionCardProps) {
  const amountColor = amount < 0 ? "text-red-500" : "text-green-500";

  return (
    <View className="bg-background-dark p-2 mb-2 px-3 rounded-lg shadow-md flex-row justify-between items-center">
      
      {/* Título e Categoria */}
      <View className="">
        <Text className="text-text-light font-bold text-sm">{title}</Text>
        <Text className="text-gray-500 text-xs">{category}</Text>
      </View>
      
      {/* Valor */}
      <View>
        <Text className={`text-base font-bold text-right ${amountColor}`}>
          {amount < 0 ? `-R$ ${Math.abs(amount).toFixed(2)}` : `R$ ${amount.toFixed(2)}`}
        </Text>
      </View>
      
    </View>
  );
}
