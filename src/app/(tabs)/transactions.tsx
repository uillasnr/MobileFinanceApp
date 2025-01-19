import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MonthSelector } from "@/src/components/MonthSelector";
import { MaterialCommunityIcons, FontAwesome6 } from "@expo/vector-icons";
import TransactionCard from "@/src/components/transactionCard";
import { TransactionProps, TransactionType } from "@/src/types/transaction";
import { transactionsData } from "@/src/services/data";
import DetailsTransaction from "@/src/components/details-Transaction";

// Função para agrupar por mês
const groupTransactionsByMonth = (transactions: TransactionProps[]) => {
  const grouped: { title: string; data: TransactionProps[] }[] = [];
  const months: { [key: string]: TransactionProps[] } = {};

  transactions.forEach((transaction) => {
    const transactionDate = new Date(transaction.date);
    const month = transactionDate.toLocaleString("pt-BR", {
      month: "long",
      year: "numeric",
    });

    if (!months[month]) months[month] = [];
    months[month].push(transaction);
  });

  for (const [month, data] of Object.entries(months)) {
    grouped.push({ title: month, data });
  }

  return grouped;
};

export default function Transactions() {
  const [transactions, setTransactions] = useState<
    { title: string; data: TransactionProps[] }[]
  >([]);
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionProps | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  useEffect(() => {
    let filteredTransactions = transactionsData.map((transaction) => ({
      ...transaction,
      type: transaction.type || TransactionType.EXPENSE, // Define um padrão caso 'type' esteja ausente
    }));

    // Aplica o filtro por mês e ano
    if (selectedMonth !== null && selectedYear !== null) {
      filteredTransactions = filteredTransactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        // Comparação corrigida para garantir que o mês e ano estejam corretos
        return (
          transactionDate.getMonth() === selectedMonth && // O mês deve ser comparado corretamente
          transactionDate.getFullYear() === selectedYear
        );
      });
    }

    // Agrupa as transações por mês
    setTransactions(groupTransactionsByMonth(filteredTransactions));
  }, [selectedMonth, selectedYear]);

  return (
    <View className="flex-1 bg-background-dark">
      {/* Header */}
      <View className="h-28 p-2 rounded-b-lg  bg-card-dark w-full ">
        <Text className="text-2xl font-bold text-white text-center">
          Transações
        </Text>
        <View className="flex-row justify-between items-center">
          <MonthSelector
            onMonthChange={(month, year) => {
              setSelectedMonth(month); // Armazena corretamente o índice do mês
              setSelectedYear(year);
            }}
            useAsInput={false}
          />
          <TouchableOpacity
            onPress={() => {
              setSelectedMonth(null);
              setSelectedYear(null);
            }}
            className="p-2 bg-red-600 h-10 w-24 rounded-lg flex-row justify-center items-center"
          >
            <MaterialCommunityIcons
              name="filter-remove"
              size={24}
              color="white"
            />
            <Text className="text-sm text-white pl-2">Limpar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60, flexGrow: 1 }}
      >
        <View className=" p-4 flex-1">
          {transactions.length === 0 ? (
            <View className="flex-1  justify-center items-center">
              <FontAwesome6
                name="money-bill-transfer"
                size={130}
                color="white"
              />
              <Text className="text-white  text-center mt-4">
                Nenhuma transação encontrada.
              </Text>
            </View>
          ) : (
            transactions.map((section) => (
              <View
                className="bg-card-dark rounded-lg  mb-4"
                key={section.title}
              >
                <Text className="text-lg font-bold text-white p-4">
                  {section.title}
                </Text>
                <View className="p-2">
                  {section.data.map((item) => (
                    <View key={item.id}>
                      <TouchableOpacity
                        onPress={() => setSelectedTransaction(item)}
                      >
                        <TransactionCard
                          title={item.title}
                          category={item.category}
                          amount={item.amount}
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Transaction Details */}
      {selectedTransaction && (
        <DetailsTransaction
          selectedTransaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
          onEdit={() => {}}
        />
      )}
    </View>
  );
}
