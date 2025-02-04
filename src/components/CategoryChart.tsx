import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { VictoryPie, VictoryLabel } from "victory-native";
import { categoriesData, transactionsData } from "@/src/services/data";

import CategoryList from "@/src/components/CategoryList";
import { CategoryProps } from "@/src/types/category";

// Defina a interface para os dados
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
  const [refreshing, setRefreshing] = useState(false);

  // Carregar categorias
  useEffect(() => {
    setCategories(categoriesData);
  }, []);

  // Filtra as transações com base no mês e ano selecionados
  useEffect(() => {
    filterTransactions();
  }, [selectedMonth, categories]);

  const filterTransactions = () => {
    const filtered = transactionsData.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate.getMonth() === selectedMonth.month &&
        transactionDate.getFullYear() === selectedMonth.year
      );
    });

    let expenseData: ExpenseData[] = categories.map((category) => {
      const total = filtered
        .filter((transaction) => transaction.category === category.title)
        .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);

      return {
        id: category._id,
        label: category.title,
        value: total,
        color: category.color,
      };
    });

    // Garante que há pelo menos um valor padrão para o gráfico
    if (
      categories.length === 0 ||
      filtered.length === 0 ||
      expenseData.every((data) => data.value === 0)
    ) {
      expenseData = [
        {
          id: "dummy",
          label: "Crie uma Categoria",
          value: 0,
          color: "#CCCCCC",
        },
      ];
    }

    setFilteredData(expenseData);
  };

  function handleCardOnPress(id: string, label: string) {
    setSelected((prev) => (prev === id ? "" : id));
    setTimeout(() => {
      setSelected("");
    }, 2000);
  }

  return (
    <View>
      <ScrollView>
        <Text className="text-sm font-bold text-text-light pl-3 mt-2">
          Despesas por categoria
        </Text>
        <View style={styles.chart}>
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
                    if (id && label) handleCardOnPress(id, label);
                  },
                },
              },
            ]}
          />
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
    backgroundColor: "#1E293B",
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
