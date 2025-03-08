import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { VictoryPie, VictoryLabel } from "victory-native";

import CategoryList from "@/src/components/CategoryList";
import { CategoryProps } from "@/src/types/category";
import { getCategory, getTransaction } from "../services/api";

// Updated transaction interface to match actual data structure
interface TransactionProps {
  _id: string;
  date: string;
  amount: number;
  category: {
    _id: string;
    title: string;
    color: string;
    Icon: string;
    userId: string;
  };
  observation: string;
  title: string;
  type: string;
  userId: string;
}

// Defina a interface para os dados de despesas no gráfico
interface ExpenseData {
  id: string;
  label: string;
  value: number;
  color: string;
}

interface CategoryChartProps {
  selectedMonth: { month: number; year: number };
}

export default function CategoryChart({ selectedMonth }: CategoryChartProps) {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [filteredData, setFilteredData] = useState<ExpenseData[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategories = await getCategory();
        const fetchedTransactions: TransactionProps[] = await getTransaction();

        setCategories(fetchedCategories);
        setTransactions(fetchedTransactions);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };

    fetchData();
  }, [refreshing]);

  useEffect(() => {
    filterTransactions();
  }, [selectedMonth, categories, transactions]);

  const filterTransactions = () => {
    if (!transactions || transactions.length === 0) {
      setFilteredData([{
        id: "dummy",
        label: "Crie uma Categoria",
        value: 0,
        color: "#CCCCCC",
      }]);
      return;
    }

    const filtered = transactions.filter((transaction) => {
      if (!transaction.date) return false;

      const transactionDate = new Date(transaction.date);
      if (isNaN(transactionDate.getTime())) {
          console.error("Data inválida:", transaction.date);
          return false;
      }
      return (
        transactionDate.getMonth() === selectedMonth.month &&
        transactionDate.getFullYear() === selectedMonth.year
      );
    });

    const categoryTotals: Record<string, ExpenseData> = {};

    filtered.forEach((transaction) => {
      if (!transaction.category || !transaction.category._id) return;

      const categoryId = transaction.category._id;

      if (!categoryTotals[categoryId]) {
        categoryTotals[categoryId] = {
          id: categoryId,
          label: transaction.category.title,
          value: 0,
          color: transaction.category.color,
        };
      }

      categoryTotals[categoryId].value += Math.abs(transaction.amount);
    });

    let expenseData = Object.values(categoryTotals);

    if (expenseData.length === 0 || expenseData.every((data) => data.value === 0)) {
      expenseData = [
        {
          id: "dummy",
          label: "Sem despesas neste mês",
          value: 0.01,
          color: "#CCCCCC",
        },
      ];
    }

    setFilteredData(expenseData);
  };
console.log(filteredData)
  function handleCardOnPress(id: string) {
    setSelected((prev) => (prev === id ? "" : id));
    setTimeout(() => {
      setSelected("");
    }, 2000);
  }

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text className="text-sm font-bold text-text-light pl-3 mt-2">
          Despesas por categoria
        </Text>
        <View style={styles.chart}>
          {filteredData.length > 0 && (
            <VictoryPie
              data={filteredData}
              x="label"
              y="value"
              colorScale={filteredData.map((expense) => expense.color)}
              innerRadius={65}
              padding={80}
              padAngle={3}
              animate={{
                duration: 1000,
                easing: "bounce",
              }}
              style={{
                labels: {
                  fill: "#fff",
                  fontSize: 12,
                },
                data: {
                  stroke: ({ datum }) =>
                    datum.id === selected ? datum.color : "none",
                  strokeWidth: 10,
                  strokeOpacity: 3,
                  fillOpacity: ({ datum }) =>
                    datum.id === selected || selected === "" ? 1 : 0.5,
                },
              }}
              labelComponent={
                <VictoryLabel
                  text={({ datum }) => (datum.id === selected ? datum.label : "")}
                />
              }
              events={[
                {
                  target: "data",
                  eventHandlers: {
                    onPress: (evt, clickedData) => {
                      const id = clickedData[0]?.datum?.id;
                      const label = clickedData[0]?.datum?.label;
                      if (id && label) handleCardOnPress(id);
                    },
                  },
                },
              ]}
            />
          )}
          <ScrollView style={{ top: -55 }}>
            <CategoryList
              filteredData={filteredData}
              selectedCategory={selected}
              selectedColor="#FF6347"
              onCategoryPress={handleCardOnPress}
            />
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chart: {
    alignItems: "center",
    marginTop: -50,
  },
  emptyText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
  },
});