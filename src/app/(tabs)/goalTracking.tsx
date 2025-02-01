import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GoalCard from "@/src/components/GoalCard";
import GoalSheet from "@/src/components/GoalSheet";


type Goal = {
  id?: number;
  name: string;
  currentAmount: number;
  targetAmount: number;
  deadline: string;
};

export default function GoalTracking()  {
  const [goals, setGoals] = useState<Goal[]>([
     {
      id: 1,
      name: "Fundo de Emergência",
      currentAmount: 2500,
      targetAmount: 5000, //final da meta
      deadline: "2024-12-31",
    },
    {
      id: 2,
      name: "Viagem de Férias",
      currentAmount: 1200,
      targetAmount: 3000,
      deadline: "2024-07-15",
    }, 
  ]);

  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [isSheetVisible, setSheetVisible] = useState(false);

  const addGoal = (newGoal: Goal) => {
    const goalToAdd = {
      ...newGoal,
      id: goals.length + 1,
      currentAmount: parseFloat(newGoal.currentAmount.toString()),
      targetAmount: parseFloat(newGoal.targetAmount.toString()),
    };
    setGoals([...goals, goalToAdd]);
  };

  const updateGoal = (updatedGoal: Goal) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === updatedGoal.id ? updatedGoal : goal
    );
    setGoals(updatedGoals);
  };

  const handleSave = (goal: Goal) => {
    if (selectedGoal) {
      updateGoal(goal);
    } else {
      addGoal(goal);
    }
    setSheetVisible(false);
    setSelectedGoal(null);
  };


  return (
    <View className="flex-1 bg-background-dark pt-3">

      <View className="p-5 rounded-b-lg shadow-xl">
        <Text className="text-white font-bold text-xl">Metas Financeiras</Text>
        <Text className="text-sm font-body text-white mt-2">
          Poupe hoje para colher os frutos amanhã.
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80, flexGrow: 1 }}
      >
        {goals.length === 0 ? (
          <View className="flex-1 justify-center items-center">
          
            <Text className="text-white font-subtitle  text-sm">Sem metas cadastradas ainda</Text>
          </View>
        ) : (
          goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onEdit={() => {
                setSelectedGoal(goal);
                setSheetVisible(true);
              }}
            />
          ))
        )}
      </ScrollView>

      <TouchableOpacity
        onPress={() => setSheetVisible(true)}
        className="absolute bottom-28 right-6 bg-[#6200ee] opacity-90 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
      >
        <Ionicons name="add" size={32} color="#FFF" />
      </TouchableOpacity>

      <GoalSheet
        isVisible={isSheetVisible}
        goal={selectedGoal}
        onClose={() => setSheetVisible(false)}
        onSave={handleSave}
      />
    </View>
  );
};


