import React from "react";
import { Modal, View, Text, TouchableOpacity, Dimensions } from "react-native";

interface DeleteTransactionModalProps {
  isVisible: boolean;
  onCancel: () => void;
  onDelete: () => void;
}

export default function DeleteTransactionModal({
  isVisible,
  onCancel,
  onDelete,
}: DeleteTransactionModalProps) {
  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#334155",
            borderRadius: 12,
            padding: 15,
            width: Dimensions.get("window").width - 40,
          }}
        >
          <Text className="text-lg font-semibold text-text-light mb-4 text-center">
            Confirmar Exclusão
          </Text>
          <Text className="text-text-light mb-6 text-center font-body">
            Tem certeza de que deseja excluir esta transação? Essa ação não pode
            ser desfeita.
          </Text>

          <View className="flex-row w-full justify-between">
            <TouchableOpacity
              onPress={onCancel}
              className="px-4 py-2 rounded-lg bg-shadowGray flex-1 mr-2"
            >
              <Text className="text-text-light text-center font-subtitle">
                Cancelar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onDelete}
              className="px-4 py-2 rounded-lg bg-secondary flex-1"
            >
              <Text className="text-text-light text-center font-subtitle">
                Excluir
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
