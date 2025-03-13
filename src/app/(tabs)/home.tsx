import React, { useState } from "react";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import Header from "@/src/components/Header";
import ChartSelector from "@/src/components/ChartSelector";

type ChartType = "financialEvolution" | "category";


export default function Home() {
  const [selectedMonth, setSelectedMonth] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const [selectedChart, setSelectedChart] = useState<ChartType>("category");
  const [refreshing, setRefreshing] = useState(false);

  function handleMonthChange(month: number, year: number) {
    setSelectedMonth({ month, year });
  }

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      // Atualizar dados globais
    } finally {
      setTimeout(() => setRefreshing(false), 1000);
    }
  };

  return (
    <View style={styles.container}>
      <Header onMonthChange={handleMonthChange} /> 
      <ScrollView
        style={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.chartContainer}>
          <ChartSelector
            selectedChart={selectedChart}
            onSelectChart={setSelectedChart}
            selectedMonth={selectedMonth}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E293B",
 
  },
  scrollContainer: {
    flex: 1,
    paddingTop:20,
  },
  chartContainer: {
   paddingTop:10,
   paddingBottom:10
  },
});
