import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

type MonthChangeHandler = (month: number, year: number) => void;

interface MonthSelectorProps {
  onMonthChange: MonthChangeHandler;
  useAsInput?: boolean;
}

export function MonthSelector({ onMonthChange, useAsInput = true }: MonthSelectorProps) {
  const [selectedMonth, setSelectedMonth] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const [isMonthSelectorVisible, setIsMonthSelectorVisible] = useState(false);

  const handleMonthSelect = (monthIndex: number) => {
    setSelectedMonth((prev) => {
      const updated = { ...prev, month: monthIndex };
      onMonthChange(updated.month, updated.year); // Atualiza o callback
      return updated;
    });
    setIsMonthSelectorVisible(false);
  };

  const changeYear = (increment: number) => {
    setSelectedMonth((prev) => {
      const updated = { ...prev, year: prev.year + increment };
      onMonthChange(updated.month, updated.year); // Atualiza o callback
      return updated;
    });
  };

  const getCurrentMonthText = () => {
    return `${MONTHS[selectedMonth.month]} de ${selectedMonth.year}`;
  };

  return (
    <View style={styles.container}>
      {useAsInput ? (
        // Exibe o TextInput com o nome do mês e ano
        <TouchableOpacity
          style={styles.input}
          onPress={() => setIsMonthSelectorVisible(true)}
        >
          <TextInput
            style={styles.inputText}
            placeholder="Selecione um mês"
            placeholderTextColor="#717171"
            value={getCurrentMonthText()}
            editable={false}
          />
          <Ionicons name="chevron-down" size={24} color="#E8E8E8" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setIsMonthSelectorVisible(true)}
        >
          <View className="flex-row justify-center items-center">
            <MaterialCommunityIcons name="filter" size={24} color="#E8E8E8" />
            <Text className="pl-2 text-sm font-body text-text-light">
              Filtrar
            </Text>
          </View>
        </TouchableOpacity>
      )}

      {/* Modal de Seleção */}
      <Modal
        visible={isMonthSelectorVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsMonthSelectorVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setIsMonthSelectorVisible(false)}
        >
          <View style={styles.modalContent}>
            {/* Seletor de Ano */}
            <View style={styles.yearSelector}>
              <TouchableOpacity onPress={() => changeYear(-1)}>
                <Feather name="chevron-left" size={24} color="#E8E8E8" />
              </TouchableOpacity>
              <Text style={styles.yearText}>{selectedMonth.year}</Text>
              <TouchableOpacity onPress={() => changeYear(1)}>
                <Feather name="chevron-right" size={24} color="#E8E8E8" />
              </TouchableOpacity>
            </View>

            {/* Seletor de Mês */}
            <View style={styles.monthsGrid}>
              {MONTHS.map((month, index) => (
                <TouchableOpacity
                  key={month}
                  style={[
                    styles.monthItem,
                    selectedMonth.month === index && styles.selectedMonth,
                  ]}
                  onPress={() => handleMonthSelect(index)}
                >
                  <Text
                    style={[
                      styles.monthText,
                      selectedMonth.month === index && styles.selectedMonthText,
                    ]}
                  >
                    {month}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {},
  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputText: {
    color: "#E8E8E8",
    fontSize: 16,
    textAlign: "center",
  },

  iconButton: {
    padding: 10,
    backgroundColor: "#6200EE",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    height: 45, // Mesma altura
    width: 96, // Mesma largura
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#1E293B",
    borderRadius: 12,
    padding: 16,
  },
  yearSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  yearText: {
    color: "#E8E8E8",
    fontSize: 18,
    fontWeight: "bold",
  },
  monthsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
    justifyContent: "space-between",
  },
  monthItem: {
    width: "30%",
    paddingVertical: 10,
    marginVertical: 6,
    borderRadius: 8,
    alignItems: "center",
  },
  monthText: {
    color: "#E8E8E8",
    fontSize: 14,
  },
  selectedMonth: {
    backgroundColor: "#6200EE",
  },
  selectedMonthText: {
    fontWeight: "bold",
    color: "#FFF",
  },
});
