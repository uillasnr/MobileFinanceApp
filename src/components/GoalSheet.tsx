import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Alert,
} from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import DateCalendar from "./DateCalendar";

import {
  createGoalTracking,
  updateGoalTracking,
  deleteGoalTracking,
} from "../services/api";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { goalSchema } from "../Validators/schemas";
import { GoalTrackingProps } from "../types/goalTracking";

const screenHeight = Dimensions.get("window").height;
const {  height } = Dimensions.get("window");

type GoalSheetProps = {
  isVisible: boolean;
  goal: GoalTrackingProps | null;
  onClose: () => void;
  onSave: (goal: GoalTrackingProps) => void;
  onDelete: (goalId: string) => void;
};

export default function GoalSheet({
  isVisible,
  goal,
  onClose,
  onSave,
  onDelete,
}: GoalSheetProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["85%", "85%"], [height]);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<GoalTrackingProps>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      name: "",
      currentAmount: 0,
      targetAmount: 0,
      deadline: "",
    },
  });

  useEffect(() => {
    if (goal?._id) {
      setIsEditing(true);
      setValue("name", goal.name || "");
      setValue("currentAmount", goal.currentAmount || 0);
      setValue("targetAmount", goal.targetAmount || 0);
      setValue("deadline", goal.deadline || "");
      if (goal._id) {
        setValue("_id", goal._id);
      }
    } else {
      setIsEditing(false);
    
      reset({
        name: "",
        currentAmount: 0,
        targetAmount: 0,
        deadline: "",
      });
    }
  }, [goal, setValue, reset]);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  const handleBackgroundPress = useCallback(() => {
    if (isVisible) {
      handleClose();
    }
  }, [isVisible, handleClose]);

  const onSubmit = async (data: GoalTrackingProps) => {
    try {
      setLoading(true);

      if (goal?._id) {
        // Update existing goal
        await updateGoalTracking(goal._id, data);
      } else {
        // Create new goal
        await createGoalTracking(data);
      }

      onSave(data);
      handleClose();
    } catch (error) {
      console.error("Erro ao salvar meta:", error);
      Alert.alert("Erro", "Não foi possível salvar a meta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGoal = async () => {
    if (!goal?._id) {
      console.log("Goal ID is undefined.");
      return;
    }

    await deleteGoalTracking(goal._id);

    onDelete(goal._id);
    handleClose();
  };

  const getErrorMessage = (fieldName: keyof GoalTrackingProps) => {
    return errors[fieldName]?.message ? (
      <Text className="text-red-500 text-xs mt-1 ml-8">
        {errors[fieldName]?.message as string}
      </Text>
    ) : null;
  };

  return isVisible ? (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
        <TouchableWithoutFeedback onPress={handleBackgroundPress}>
          <View style={{ flex: 1 }} />
        </TouchableWithoutFeedback>

        <BottomSheet
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
            <Text className="text-lg font-bold text-text-light mb-4 text-center">
              {goal?._id ? "Editar Meta" : "Nova Meta"}
            </Text>

            <View className="p-4">
              {/* Nome da Meta */}
              <View className="border-b border-gray-500">
                <View className="flex-row items-center">
                  <MaterialCommunityIcons
                    name="file-document-outline"
                    size={25}
                    color="#E2E8F0"
                  />
                  <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        className="w-full p-3 text-base pl-4 text-text-light"
                        placeholder="Nome da Meta"
                        placeholderTextColor="#E2E8F0"
                        value={value}
                        onChangeText={onChange}
                      />
                    )}
                  />
                </View>
              </View>
              {getErrorMessage("name")}

              {/* Valor Meta */}
              <View className="border-b border-gray-500">
                <View className="flex-row items-center">
                  <FontAwesome name="money" size={20} color="#E2E8F0" />
                  <Controller
                    control={control}
                    name="targetAmount"
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        className="w-full p-3 text-base pl-5 text-text-light"
                        placeholder="Valor da meta"
                        keyboardType="numeric"
                        placeholderTextColor="#E2E8F0"
                        value={value && value > 0 ? value.toString() : ""}
                        onChangeText={(text) =>
                          onChange(text ? Number(text) : 0)
                        }
                      />
                    )}
                  />
                </View>
              </View>
              {getErrorMessage("targetAmount")}

              <View className="border-b border-gray-500">
                <View className="flex-row items-center">
                  <FontAwesome name="money" size={20} color="#E2E8F0" />
                  <Controller
                    control={control}
                    name="currentAmount"
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        className="w-full p-3 text-base pl-5 text-text-light"
                        placeholder="Valor do Aporte"
                        keyboardType="numeric"
                        placeholderTextColor="#E2E8F0"
                        value={value && value > 0 ? value.toString() : ""}
                        onChangeText={(text) =>
                          onChange(text ? Number(text) : 0)
                        }
                      />
                    )}
                  />
                </View>
              </View>
              {getErrorMessage("currentAmount")}

              <View className="border-b border-gray-500">
                <View className="flex-row items-center">
                  <FontAwesome name="calendar" size={20} color="#E2E8F0" />
                  <Controller
                    control={control}
                    name="deadline"
                    render={({ field: { onChange, value } }) => (
                      <DateCalendar
                        selectedDate={value}
                        onDateSelect={onChange}
                      />
                    )}
                  />
                </View>
              </View>
              {getErrorMessage("deadline")}

              {/* Botões */}
              <View className="gap-4 pt-5">
                <TouchableOpacity
                  className={`flex justify-center items-center ${
                    loading ? "bg-secondary opacity-80" : "bg-secondary"
                  } rounded-lg p-4`}
                  onPress={handleSubmit(onSubmit)}
                  disabled={loading}
                >
                  <Text className="text-center text-white font-bold">
                    {loading ? "Salvando..." : "Salvar"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex justify-center items-center bg-gray-500 rounded-lg p-4"
                  onPress={handleClose}
                  disabled={loading}
                >
                  <Text className="text-center text-white font-bold">
                    Cancelar
                  </Text>
                </TouchableOpacity>

                {isEditing && (
                  <TouchableOpacity
                    className="bg-red-500 p-4 rounded-lg items-center mt-3"
                    onPress={handleDeleteGoal}
                    disabled={loading}
                  >
                    <Text className="text-white font-bold">
                      {loading ? "Excluindo..." : "Excluir Meta"}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </TouchableWithoutFeedback>
  ) : null;
}
