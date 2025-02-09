import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema } from "@/src/Validators/schemas";
import { createUser } from "@/src/services/api";
import Loading from "@/src/components/loading";
import { CreateUser } from "@/src/types";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter(); 

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateUser>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function handleSignUp(data: CreateUser) {
    try {
      setIsLoading(true);
      setErrorMessage(""); 

      await createUser(data.name, data.email, data.password, data.confirmPassword);
      console.log("Form data:", data);

      router.push("/login");
    } catch (error: any) {
      if (error.message === "User already exists.") {
        setErrorMessage("Usuário já existe. Tente outro e-mail.");
      } else {
        setErrorMessage("Erro ao criar o usuário. Tente novamente.");
      }
      setIsLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-background-dark"
    >
      <Loading visible={isLoading} />
      <View className="flex-1 justify-center items-center px-6">

        <View className="items-center mb-8">
          <Image
            source={require("../../../assets/images/logo.png")}
            className="w-32 h-32"
            resizeMode="contain"
          />
          <Text className="text-3xl font-bold text-text-light mt-4">
            Finance
          </Text>
          <Text className="text-sm text-text-light mt-2">
            Crie sua conta para começar
          </Text>
        </View>

        <View className="w-full max-w-md p-2">

          {errorMessage && (
            <Text
              className={`text-center ${
                errorMessage.includes("sucesso") ? "text-green-500" : "text-red-500"
              } mb-4`}
            >
              {errorMessage}
            </Text>
          )}

          <View>
            <View className="mb-5">
              <TextInput
                className="w-full bg-card-dark border h-14 rounded-xl border-gray-500 text-text-light pl-3"
                placeholder="Nome completo"
                placeholderTextColor="#A1A1AA"
                autoCapitalize="words"
                onChangeText={(text) => setValue("name", text)}
              />
              {errors.name && (
                <Text className="text-red-500 text-sm pl-1">
                  {errors.name.message}
                </Text>
              )}
            </View>

            <View className="mb-5">
              <TextInput
                className="w-full bg-card-dark border h-14 rounded-xl border-gray-500 text-text-light pl-3"
                placeholder="E-mail"
                placeholderTextColor="#A1A1AA"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(text) => setValue("email", text)}
              />
              {errors.email && (
                <Text className="text-red-500 text-sm pl-1">
                  {errors.email.message}
                </Text>
              )}
            </View>

            <View className="mb-5 relative">
              <TextInput
                className="w-full bg-card-dark border h-14 rounded-xl border-gray-500 text-text-light pl-3"
                placeholder="Senha"
                placeholderTextColor="#A1A1AA"
                secureTextEntry={!showPassword}
                onChangeText={(text) => setValue("password", text)}
              />
              <TouchableOpacity
                className="absolute right-3 top-4 transform -translate-y-1/2"
                onPress={() => setShowPassword((prev) => !prev)}
              >
                <Ionicons
                  name={showPassword ? "eye" : "eye-off"}
                  size={22}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
              {errors.password && (
                <Text className="text-red-500 text-sm pl-1">
                  {errors.password.message}
                </Text>
              )}
            </View>

            <View className="mb-6 relative">
              <TextInput
                className="w-full bg-card-dark border h-14 rounded-xl border-gray-500 text-text-light pl-3"
                placeholder="Confirmar senha"
                placeholderTextColor="#A1A1AA"
                secureTextEntry={!showConfirmPassword}
                onChangeText={(text) => setValue("confirmPassword", text)}
              />
              <TouchableOpacity
                className="absolute right-3 top-4 transform -translate-y-1/2"
                onPress={() => setShowConfirmPassword((prev) => !prev)}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye" : "eye-off"}
                  size={22}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
              {errors.confirmPassword && (
                <Text className="text-red-500 text-sm pl-1">
                  {errors.confirmPassword.message}
                </Text>
              )}
            </View>

            <TouchableOpacity
              onPress={handleSubmit(handleSignUp)}
              className="bg-[#6200ee] p-3 rounded-xl shadow-sm mb-6"
            >
              <Text className="text-white text-center text-lg font-semibold">
                Criar conta
              </Text>
            </TouchableOpacity>

            <Link href="/login" asChild>
              <Pressable>
                <Text className="text-center text-gray-500">
                  Já possui uma conta?{" "}
                  <Text className="font-bold">Faça login</Text>
                </Text>
              </Pressable>
            </Link>
          </View>
        </View>

        <Text className="text-gray-500 text-xs text-center mt-8 px-6">
          Seus dados financeiros estão protegidos com criptografia de ponta a
          ponta
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}
