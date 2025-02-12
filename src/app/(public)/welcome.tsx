import { useAuth } from "@/src/Context/AuthContext";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link, Redirect, useRouter } from "expo-router";
import React from "react";
import { Image } from "react-native";
import { View, Text, TouchableOpacity } from "react-native";



export default function welcome() {
  const { isAuthenticated } = useAuth();
  const router = useRouter(); // Hook para navegação

  // Se o usuário estiver autenticado, redireciona automaticamente para a tela Home
  if (isAuthenticated) {
    return <Redirect href="/home" />;
  }
  return (
    <View className=" flex-1 bg-background-dark justify-center items-center px-4">

       <Image
        source={require("../../../assets/images/Login.png")}
        className=" w-82 h-80 "
        resizeMode="contain"
      /> 

      <Text className=" text-3xl font-extrabold text-[#6200ee] mb-4 text-center">
        Controle suas Finanças
      </Text>

      <Text className=" text-sm text-text-light text-center px-6 leading-6">
        Organize seus gastos e tome o controle do seu futuro financeiro de forma
        prática e simples.
      </Text>

      <TouchableOpacity
        activeOpacity={0.7}
        className="mt-8 flex-row items-center justify-center bg-[#6200ee] px-6 py-3 rounded-2xl shadow-lg shadow-[#6200ee]"
        onPress={() => router.push("/login")}
      >

      <View className="flex-row">
      <Text className="text-text-light text-lg font-bold mr-2">Começar</Text>
      <MaterialIcons name="keyboard-arrow-right" size={26} color="#E2E8F0" style={{marginTop:3}} />
      </View>
    
      </TouchableOpacity>

    </View>
  );
}
