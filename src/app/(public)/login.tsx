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
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/src/Validators/schemas";
import { Auth, LoginData } from "@/src/types";
import { login } from "@/src/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "@/src/components/loading";
import { SaveUser } from "@/src/storage/storage_user";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Auth>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleLogin(data: LoginData) {
    try {
      setIsLoading(true);
      setErrorMessage("");
  
      const response = await login(data.email, data.password);
  
      setTimeout(async () => {
        if (response?.token) {
          await AsyncStorage.setItem("token", response.token);
          await SaveUser({ ...response.user });
  
          router.push("/(tabs)/home");
        }
        setIsLoading(false);
      }, 2000);
    } catch (error: any) {
      setErrorMessage("E-mail ou senha incorretos. Tente novamente.");
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-background-dark">
      <Loading visible={isLoading} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="min-h-full justify-center items-center px-6 py-8">
            <View className="items-center mb-6 ">
              <Image
                source={require("../../../assets/images/logo.png")}
                className="w-36 h-36"
                resizeMode="cover"
              />
              <Text className="text-2xl font-bold text-text-light mt-2">
                FinanceApp
              </Text>
              <Text className="text-sm text-text-light mt-1">
                Acesse sua conta
              </Text>
            </View>

            {errorMessage && (
              <Text className="text-red-500 text-sm mt-2 mb-2 text-center">
                {errorMessage}
              </Text>
            )}

            <View className="w-full max-w-md p-2">
              <View className="mb-6">
                <TextInput
                  className="w-full bg-card-dark border h-14 rounded-xl border-gray-500 text-text-light pl-3"
                  placeholder="E-mail"
                  placeholderTextColor="#A1A1AA"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={(text) => setValue("email", text)}
                />
                {errors.email && (
                  <Text className="text-red-500 text-sm mt-1 pl-1">
                    {errors.email.message}
                  </Text>
                )}
              </View>

              <View className="mb-6">
                <View className="relative">
                  <TextInput
                    className="w-full bg-card-dark border h-14 rounded-xl border-gray-500 text-text-light pl-3 pr-12"
                    placeholder="Senha"
                    placeholderTextColor="#A1A1AA"
                    secureTextEntry={!showPassword}
                    onChangeText={(text) => setValue("password", text)}
                  />
                  <TouchableOpacity
                    className="absolute right-3 h-full justify-center"
                    onPress={() => setShowPassword((prev) => !prev)}
                  >
                    <Ionicons
                      name={showPassword ? "eye" : "eye-off"}
                      size={22}
                      color="#9CA3AF"
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text className="text-red-500 text-sm mt-1 pl-1">
                    {errors.password.message}
                  </Text>
                )}
              </View>

              <TouchableOpacity
                onPress={handleSubmit(handleLogin)}
                className="bg-[#6200ee] p-3 rounded-xl shadow-sm mb-4"
              >
                <Text className="text-white text-center text-lg font-semibold">
                  Entrar
                </Text>
              </TouchableOpacity>

              <Link href="/register" asChild>
                <Pressable>
                  <Text className="text-center text-gray-500">
                    Não tem uma conta?{" "}
                    <Text className="font-bold">Cadastre-se</Text>
                  </Text>
                </Pressable>
              </Link>
            </View>

            <Text className="text-gray-500 text-xs text-center mt-8 px-6">
              Seus dados financeiros estão protegidos com criptografia de ponta
              a ponta
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
