import React, { useMemo, useRef } from "react";
import { Dimensions, Text, TouchableWithoutFeedback, View } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import {
  MaterialCommunityIcons,
  Feather,
  FontAwesome5,
  FontAwesome,
  Fontisto,
  AntDesign,
} from "@expo/vector-icons";
import { TransactionProps } from "../types/transaction";
import formatDate from "../utils/formatDate";
const screenHeight = Dimensions.get("window").height;
import { Link } from "expo-router";
import { formatCurrency } from "../utils/format-currency";

interface DetailsTransactionProps {
  selectedTransaction: TransactionProps | null;
  onClose: () => void;
  onEdit: () => void;
}

export default function DetailsTransaction({
  selectedTransaction,
  onClose,
  onEdit,
}: DetailsTransactionProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["75%", "75%"], []);

  const buttonColor =
    selectedTransaction?.type === "expense" ? "#F87171" : "#34D399";

/*   console.log("dethales da transção", selectedTransaction); */
  return (
    <TouchableWithoutFeedback onPress={onClose} accessible={false}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          height: screenHeight,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <BottomSheet
          containerStyle={{
            flex: 1,
            backgroundColor: "transparent",
          }}
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          index={1}
          enableOverDrag
          onClose={onClose}
          backgroundStyle={{
            backgroundColor: "#334155",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
          handleIndicatorStyle={{
            backgroundColor: "#E2E8F0",
            width: 40,
          }}
          enablePanDownToClose
        >
          <BottomSheetView>
            {selectedTransaction ? (
              <View className="p-4 space-y-6">
                {/* ✅ Ícones de Status */}
                <View className="flex-row justify-around ">
                  {/* Recebido */}
                  <View className="items-center">
                    <View
                      style={{ backgroundColor: buttonColor }}
                      className="w-12 h-12 rounded-full items-center justify-center mb-1"
                    >
                      <MaterialCommunityIcons
                        name="check"
                        size={24}
                        color="white"
                      />
                    </View>
                    <Text className="text-text-light">Recebido</Text>
                  </View>

                  {/* Receita */}
                  <View className="items-center">
                    <View
                      style={{ backgroundColor: buttonColor }}
                      className="w-12 h-12 rounded-full items-center justify-center mb-1"
                    >
                      {selectedTransaction.type === "income" ? (
                        <Feather name="trending-up" size={24} color="white" />
                      ) : (
                        <Feather name="trending-down" size={24} color="white" />
                      )}
                    </View>
                    <Text className="text-text-light">
                      {selectedTransaction.type === "expense"
                        ? "Despesa"
                        : "Receita"}
                    </Text>
                  </View>

                  {/* Anexo */}
                  <View className="items-center">
                    <View className="w-12 h-12 bg-gray-600 rounded-full items-center justify-center mb-1">
                      <FontAwesome5 name="paperclip" size={24} color="white" />
                    </View>
                    <Text className="text-text-light">Anexo</Text>
                  </View>

                  {/* Favorita */}
                  <View className="items-center">
                    <View
                      style={
                        selectedTransaction?.isFixed
                          ? { backgroundColor: buttonColor }
                          : {}
                      }
                      className="w-12 h-12 bg-gray-600 rounded-full items-center justify-center mb-1"
                    >
                      <MaterialCommunityIcons
                        name="heart-outline"
                        size={24}
                        color="white"
                      />
                    </View>
                    <Text className="text-text-light">Despesa Fixa</Text>
                  </View>
                </View>

                <View className="h-px bg-gray-300 w-full" />

                <View className="space-y-4 ">
                  {/* 📋 Detalhes da Transação */}
                  <View className="flex-row flex-wrap justify-between mt-3 mb-6">
                    {/* Coluna 1 */}
                    <View className="w-1/2 ">
                      {/* Descrição */}
                      <View className="flex-row gap-2 mb-2  items-center">
                        <AntDesign
                          name="filetext1"
                          size={20}
                          color="#E2E8F0"
                          className="mr-2"
                        />
                        <View>
                          <Text className="text-text-light text-xs">
                            Descrição:
                          </Text>
                          <Text
                            numberOfLines={1}
                            className="text-text-light text-base truncate max-w-[200px]"
                          >
                            {selectedTransaction.title}
                          </Text>
                        </View>
                      </View>

                      {/* Valor */}
                      <View className="flex-row gap-2 mb-2  items-center">
                        <FontAwesome
                          name="money"
                          size={20}
                          color="#E2E8F0"
                          className="mr-2"
                        />
                        <View>
                          <Text className="text-text-light text-xs">
                            Valor:
                          </Text>
                          <Text className="text-text-light text-base">
                            {formatCurrency(selectedTransaction.amount)}
                          </Text>
                        </View>
                      </View>

                      {/* Data */}
                      <View className="flex-row gap-2 mb-2  items-center">
                        <Fontisto
                          name="date"
                          size={20}
                          color="#E2E8F0"
                          className="mr-2"
                        />
                        <View>
                          <Text className="text-text-light text-xs">Data:</Text>
                          <Text className="text-text-light text-base">
                            {formatDate(selectedTransaction.date)}
                          </Text>
                        </View>
                      </View>

                      {/* Observação */}
                      <View className="flex-row gap-2 mb-2  items-center">
                        <MaterialCommunityIcons
                          name="note-outline"
                          size={20}
                          color="#E2E8F0"
                          className="mr-2"
                        />
                        <View>
                          <Text className="text-text-light text-xs">
                            Observação:
                          </Text>
                          <Text
                            numberOfLines={2}
                            className="text-text-light text-base truncate "
                          >
                            {selectedTransaction.observation || "Nenhuma"}
                          </Text>
                        </View>
                      </View>
                    </View>

                    {/* Coluna 2 */}
                    <View className="w-1/2 ">
                      {/* Tags */}
                      <View className="flex-row gap-2 mb-2  items-center">
                        <MaterialCommunityIcons
                          name="tag"
                          size={20}
                          color="#E2E8F0"
                          className="mr-2"
                        />
                        <View>
                          <Text className="text-text-light text-xs">Tags:</Text>
                          <Text className="text-text-light text-base">
                            Nenhuma tag
                          </Text>
                        </View>
                      </View>

                      {/* Categoria */}
                      <View className="flex-row gap-2 mb-2  items-center">
                        <MaterialCommunityIcons
                          name="tag-outline"
                          size={20}
                          color="#E2E8F0"
                          className="mr-2"
                        />
                        <View>
                          <Text className="text-text-light text-xs">
                            Categoria:
                          </Text>
                          <Text className="text-text-light text-base">
                            {selectedTransaction.category.title}
                          </Text>
                        </View>
                      </View>

                      {/* Lembrete */}
                      <View className="flex-row gap-2 mb-2  items-center">
                        <MaterialCommunityIcons
                          name="bell-outline"
                          size={20}
                          color="#E2E8F0"
                          className="mr-2"
                        />
                        <View>
                          <Text className="text-text-light text-xs">
                            Lembrete:
                          </Text>
                          <Text className="text-text-light text-base">
                            Nenhum
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

                {/* ✏️ Botão de Edição */}
                <Link
                  href={`/edit-transaction?transactionId=${selectedTransaction._id}`}
                >
                  <View
                    style={{ backgroundColor: buttonColor }}
                    className="mt-6 p-3 w-full h-12 rounded-lg items-center shadow-2xl"
                  >
                    <Text className="text-white text-base font-medium">
                      EDITAR RECEITA
                    </Text>
                  </View>
                </Link>
              </View>
            ) : (
              <Text className="text-center text-white">
                Nenhuma transação selecionada
              </Text>
            )}
          </BottomSheetView>
        </BottomSheet>
      </View>
    </TouchableWithoutFeedback>
  );
}
