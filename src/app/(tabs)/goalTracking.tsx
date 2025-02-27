import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Vibration } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GoalCard from "@/src/components/GoalCard";
import GoalSheet from "@/src/components/GoalSheet";
import { getGoalTracking } from "@/src/services/api";
import { GoalTrackingProps } from "@/src/types/GoalTracking";


export default function GoalTracking()  {
  const [goals, setGoals] = useState<GoalTrackingProps[]>([]);
  const [loading, setLoading] = useState(true); // Estado para indicar carregamento
  const [selectedGoal, setSelectedGoal] = useState<GoalTrackingProps | null>(null);
  const [isSheetVisible, setSheetVisible] = useState(false);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        setLoading(true);
        const response = await getGoalTracking();
        setGoals(response); // Atualiza o estado com os dados da API
      } catch (error) {
        console.error("Erro ao buscar metas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);


  const addGoal = (newGoal: GoalTrackingProps) => {
    const goalToAdd = {
      ...newGoal,
      id: goals.length + 1,
      currentAmount: parseFloat(newGoal.currentAmount.toString()),
      targetAmount: parseFloat(newGoal.targetAmount.toString()),
    };
    setGoals([...goals, goalToAdd]);
  };

  const updateGoal = (updatedGoal: GoalTrackingProps) => {
    const updatedGoals = goals.map((goal) =>
      goal._id === updatedGoal._id ? updatedGoal : goal
    );
    setGoals(updatedGoals);
  };

  const handleSave = (goal: GoalTrackingProps) => {
    if (selectedGoal) {
      updateGoal(goal);
    } else {
      addGoal(goal);
    }
    setSheetVisible(false);
    setSelectedGoal(null);
  };


  const handlePress = () => {
    Vibration.vibrate(100); 
    setSheetVisible(true);
  };

  const deleteGoal = (goalId: string) => {
    setGoals((prevGoals) => prevGoals.filter((goal) => goal._id !== goalId));
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
          goals.map((goal, index) => (
            <GoalCard
            key={goal._id ?? `goal-${index}`}
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
       onPress={handlePress}
        className="absolute bottom-28 right-6 bg-[#6200ee] opacity-90 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
      >
        <Ionicons name="add" size={32} color="#FFF" />
      </TouchableOpacity>

      <GoalSheet
        isVisible={isSheetVisible}
        goal={selectedGoal}
        onClose={() => setSheetVisible(false)}
        onSave={handleSave}
        onDelete={deleteGoal}
      />
    </View>
  );
};


