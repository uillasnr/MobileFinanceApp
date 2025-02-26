import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import {
  EvilIcons,
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome,
  Fontisto,
} from "@expo/vector-icons";

import { Switch } from "react-native";
import { TransactionCardProps, TransactionProps } from "@/src/types/transaction";
import CategorySelector from "@/src/components/CategorySelector";
import DeleteTransactionModal from "@/src/components/DeleteTransactionModal";


interface CreateTransactionProps {
  selectedTransaction: TransactionCardProps | null;
  onClose: () => void;
  onSelectCategory: (category: string) => void;
  onEdit: () => void;
}

export default function EditTransaction() {
  const { transactionId, type } = useLocalSearchParams<{
    transactionId: string;
    type: string;
  }>();
  const router = useRouter();

  const [transaction, setTransaction] = useState<TransactionProps | null>(null);
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [observation, setObservation] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [isFixedExpense, setIsFixedExpense] = useState<boolean>(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const categories = [
    "Viagem",
    "Transporte",
    "Alimentação",
    "Saúde",
    "Educação",
    "Viagem",
    "Transporte",
    "Alimentação",
    "Saúde",
    "Educação",
    "Viagem",
    "Transporte",
    "Alimentação",
    "Saúde",
    "Educação",
    "Viagem",
    "Transporte",
    "Alimentação",
    "Saúde",
    "Educação",
    "Viagem",
    "Transporte",
    "Alimentação",
    "Saúde",
    "Educação",
    "Viagem",
    "Transporte",
    "Alimentação",
    "Saúde",
    "Educação",
    "Viagem",
    "Transporte",
    "Alimentação",
    "Saúde",
    "Educação",
    "Viagem",
    "Transporte",
    "Alimentação",
    "Saúde",
    "Educação",
  ];

  const buttonColor =
    type === "expense" ? "#F87171" : type === "income" ? "#34D399" : "#3B82F6";

  useEffect(() => {
    const fetchedTransaction = {
      id: transactionId,
      title: "Despesa de viagem",
      category: "Viagem",
      amount: 1000,
      observation: "Observação da transação",
      tags: "Viagem, Transporte",
    };

    setTitle(fetchedTransaction.title);
    setCategory(fetchedTransaction.category);
    setAmount(fetchedTransaction.amount.toString());
    setObservation(fetchedTransaction.observation || "");
    setTags(fetchedTransaction.tags || "");
  }, [transactionId]);

  const handleSave = () => {
    console.log("Transação salva:", {
      title,
      category,
      amount,
      observation,
      tags,
    });
    router.back();
  };

  const handleDeleteTransaction = () => {
    console.log(`Transação ${transactionId} excluída.`);
    setIsDeleteModalVisible(false);
    router.back(); 
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
  };

  const handleSelectCategory = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setIsCategoryModalVisible(false);
  };

  const handleCreateCategory = (category: { name: string; color: string }) => {
    console.log("Create Category");
  };

  return (
    <View className="flex-1 bg-background-dark">
      <View className="h-28 mb-3 ">
        <View className="flex-row justify-between items-center p-4">
   
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => router.back()} className="mr-2">
              <AntDesign name="arrowleft" size={28} color="white" />
            </TouchableOpacity>
            <Text className="text-text-light text-base  pl-5">
              Editar transações
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => setIsDeleteModalVisible(true)} 
          >
            <EvilIcons name="trash" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View>
          <Text className="text-text-light text-xs font-heading ml-4">
            Valor da despesa
          </Text>
          <Text className="text-text-light text-3xl font-body ml-4">
            R$ 1.000,00
          </Text>
        </View>
      </View>

      <View className="flex-1  ">
        <View className="bg-card-dark p-4 h-full flex-1 rounded-t-lg">
          <View className="mb-2 border-b border-gray-500 ">
            <View className="flex-row items-center">
              <MaterialCommunityIcons
                name="file-document-outline"
                size={22}
                color="#E2E8F0"
                className="mr-2"
              />
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Insira o título"
                placeholderTextColor="#A1A1AA"
                className="bg-card-dark rounded-lg pl-5 h-14 text-text-light"
              />
            </View>
          </View>

          <View className="mb-2 border-b border-gray-500 ">
            <View className="flex-row items-center">
              <Fontisto
                name="date"
                size={20}
                color="#E2E8F0"
                className="mr-2"
              />
              <TextInput
                value={date}
                onChangeText={setDate}
                placeholder="data"
                placeholderTextColor="#A1A1AA"
                className="bg-card-dark rounded-lg pl-5 h-14 text-text-light"
              />
            </View>
          </View>

          <View className="mb-2 border-b border-gray-500 ">
            <View className="flex-row items-center">
              <FontAwesome
                name="money"
                size={20}
                color="#E2E8F0"
                className="mr-2"
              />
              <TextInput
                value={amount}
                onChangeText={setAmount}
                placeholder="Insira o valor"
                keyboardType="numeric"
                placeholderTextColor="#A1A1AA"
                className="bg-card-dark rounded-lg pl-5 w-28 h-14 text-text-light"
              />
            </View>
          </View>

          <TouchableOpacity onPress={() => setIsCategoryModalVisible(true)}>
            <View className="mb-2 border-b border-gray-500">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <MaterialCommunityIcons
                    name="tag"
                    size={20}
                    color="#E2E8F0"
                    className="mr-2"
                  />

                  <TextInput
                    value={category}
                    onChangeText={setCategory}
                    placeholder="Escolha a categoria"
                    placeholderTextColor="#A1A1AA"
                    className=" rounded-lg pl-5 w-80 h-14 text-white"
                    editable={false}
                  />
                </View>

                <FontAwesome
                  name="angle-right"
                  size={28}
                  color="#E2E8F0"
                  className="ml-auto"
                />
              </View>
            </View>
          </TouchableOpacity>

          <View className="mb-2 border-b border-gray-500 ">
            <View className="flex-row items-center ">
              <MaterialCommunityIcons
                name="note-outline"
                size={20}
                color="#E2E8F0"
                className="mr-2"
              />
              <TextInput
                value={observation}
                onChangeText={setObservation}
                placeholder="Adicione uma observação"
                placeholderTextColor="#A1A1AA"
                className="bg-card-dark rounded-lg pl-5  h-14 text-text-light"
              />
            </View>
          </View>

          <View className="mb-2 border-b border-gray-500">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <AntDesign
                  name="pushpino"
                  size={20}
                  color="#E2E8F0"
                  className="mr-2"
                />
                <Text className="text-text-light text-base ml-5">
                  Despesa Fixa
                </Text>
              </View>

              <Switch
                value={isFixedExpense}
                onValueChange={setIsFixedExpense}
                thumbColor={isFixedExpense ? buttonColor : "#A1A1AA"}
                trackColor={{ true: buttonColor, false: "#4B5563" }}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={handleSave}
            style={{ backgroundColor: buttonColor }}
            className="bg-blue-500 p-3 rounded-lg mt-6"
          >
            <Text className="text-white text-center font-medium">Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>

 
     <DeleteTransactionModal
        isVisible={isDeleteModalVisible}
        onCancel={handleCancelDelete}
        onDelete={handleDeleteTransaction}
      />


      <CategorySelector
        categories={categories}
        onSelectCategory={handleSelectCategory}
        onCreateCategory={handleCreateCategory}
        isVisible={isCategoryModalVisible}
        onClose={() => setIsCategoryModalVisible(false)}
        selectedCategory={category} 
        type={type === "expense" || type === "income" ? type : "expense"}
      />
    </View>
  );
}
