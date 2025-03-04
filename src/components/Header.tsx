import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MonthSelector } from "./MonthSelector";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { getDashboard } from "../services/api";
import { BalanceProps } from "../types/balance";

interface HeaderProps {
  onMonthChange: (month: number, year: number) => void;
}
export default function Header({ onMonthChange }: HeaderProps) {
  const [balanceData, setBalanceData] = useState<BalanceProps | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); 
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedDashboard = await getDashboard(selectedMonth, selectedYear);
        setBalanceData(fetchedDashboard.balance);
    
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };
    fetchData();
  }, [selectedMonth, selectedYear]);
  
  const handleMonthChange = (month: number, year: number) => {
    setSelectedMonth(month + 1); 
    setSelectedYear(year);
    onMonthChange(month, year); 
  };

  return (
    <View className="bg-card-dark rounded-b-lg w-full h-48">

      <View className="flex-row w-full p-2 justify-between items-center">
        <Link href="/profile">
          <Ionicons name="person-circle-outline" size={35} color="white" />
        </Link>

        <MonthSelector onMonthChange={handleMonthChange} useAsInput={true} />

        <Ionicons name="notifications-off-outline" size={30} color="white" />
      </View>

      <View className="justify-center items-center">
        <Text className="text-text-light text-base font-subtitle">Saldo em conta</Text>
        <Text className="text-text-light text-lg font-bold mt-0.5">
        R$ {balanceData ? (balanceData.balance / 100).toFixed(2) : "0,00"}
        </Text>
      </View>

      <View className="flex-row w-full p-2 justify-between items-center">

      <Link href={`/create-transaction?type=income`}>
        <View className="flex-row items-center p-2">
          <Ionicons name="arrow-up-circle-sharp" size={45} color="#16a34a" />
          <View className="flex-col justify-center items-start ml-2">
            <Text className="text-green-600 text-base font-body">Receita</Text>
            <Text className="text-green-600 text-base font-body">
            R$ {balanceData ? (balanceData.incomes / 100).toFixed(2) : "0,00"}
            </Text>
          </View>
        </View>
        </Link>

        <Link href={`/create-transaction?type=expense`}>
        <View className=" flex-row items-center p-2">   
          <Ionicons name="arrow-down-circle-sharp" size={45} color="#dc2626" />
          <View className="flex-col justify-center items-start ml-2">
            <Text className="text-red-600 text-base font-body">Despesas</Text>
            <Text className="text-red-600 text-base font-body">
            R$ {balanceData ? (Math.abs(balanceData.expenses) / 100).toFixed(2) : "0,00"}
            </Text>
          </View>
        </View>
        </Link>

      </View>
    </View>
  );
}
