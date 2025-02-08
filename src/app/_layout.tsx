import React from "react";

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { Slot } from "expo-router";
import { StatusBar} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { AuthProvider } from "../Context/AuthContext";
import Loading from "../components/loading";


export default function Layout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return <Loading visible />;
  }

  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#1E293B" }}>
        <StatusBar barStyle="light-content" />
        <Slot /> 
      </GestureHandlerRootView>
    </AuthProvider>
  );
}

