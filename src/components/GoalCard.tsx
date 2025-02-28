import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";

type Goal = {
  id?: number;
  name: string;
  currentAmount: number;
  targetAmount: number;
  deadline: string;
};

type GoalCardProps = {
  goal: Goal;
  onEdit: () => void;
};

export default function GoalCard({ goal, onEdit }: GoalCardProps) {
  const calculateProgress = () => {
    return Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
  };

  return (
    <View className="bg-card-dark rounded-lg p-4 mx-4 mb-3 shadow-lg">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center  mb-3 flex-grow">
          <Entypo name="pin" size={20} color="#E2E8F0" />
          <Text className="ml-3 text-lg font-semibold text-text-light">
            {goal.name}
          </Text>
        </View>

        <TouchableOpacity onPress={onEdit} className="mb-3">
          <AntDesign name="edit" size={20} color="#E2E8F0" />
        </TouchableOpacity>
      </View>

      <View className="h-3 bg-gray-300 rounded-full overflow-hidden my-2">
        <View
          style={{
            width: `${calculateProgress()}%`,
            backgroundColor: calculateProgress() >= 100 ? "#4CAF50" : "#6200ee",
          }}
          className="h-full rounded-sm "
        />
      </View>

      <View className="flex-row justify-between items-center ">
        <Text className="text-text-light">
          {goal.currentAmount.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}{" "}
        </Text>

        <View className="flex-row justify-between items-center ">
          <Text className="text-text-light pr-2">
            {" "}
            {goal.targetAmount.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Text>
          <Ionicons
            name="trophy"
            size={20}
            color={calculateProgress() >= 100 ? "#4CAF50" : "#E2E8F0"}
          />
        </View>
      </View>

      <Text className="text-right text-xs text-text-light mt-2">
        Data limite: {new Date(goal.deadline).toLocaleDateString()}
      </Text>
    </View>
  );
}
