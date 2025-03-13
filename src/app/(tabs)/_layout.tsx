import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { Entypo, Ionicons, Fontisto } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { CustomTabBar } from "@/src/components/CustomTabBar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BackgroundCustomTabBar from "@/src/components/BackgroundCustomTabBar";

export default function TabsLayout() {
  const [isBackgroundCustomTabBarVisible, setIsBackgroundCustomTabBarVisible] =
    useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Função unificada para controlar ambos os estados
  const handleToggle = (state: boolean) => {
    setIsBackgroundCustomTabBarVisible(state);
    setIsExpanded(state);
  };

  const disableAll = () => {
    setIsBackgroundCustomTabBarVisible(false);
    setIsExpanded(false);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      
      {isBackgroundCustomTabBarVisible && (
        <View style={styles.BackgroundCustomTabBar}>
          <BackgroundCustomTabBar
            onClose={disableAll} 
            isVisible={isBackgroundCustomTabBarVisible}
          />
        </View>
      )}

      <SafeAreaView style={[styles.container]}>
        <View style={styles.tabContainer}>
          <Tabs
            screenOptions={{
              tabBarStyle: styles.tabBar,
              tabBarShowLabel: false,
            }}
          >
            <Tabs.Screen
              name="home"
              options={{
                headerShown: false,

                tabBarIcon: ({ focused }) => (
                  <Entypo
                    name="home"
                    color={focused ? "#f1f5f9" : "#9CA3AF"}
                    size={24}
                    style={{ marginLeft: -12 }}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="transactions"
              options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <Fontisto
                    name="arrow-swap"
                    color={focused ? "#f1f5f9" : "#9CA3AF"}
                    size={24}
                    style={{ marginLeft: -60 }}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="goalTracking"
              options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <AntDesign
                    name="flag"
                    color={focused ? "#f1f5f9" : "#9CA3AF"}
                    size={24}
                    style={{ marginEnd: -60 }}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="profile"
              options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <Ionicons
                    name="person-outline"
                    color={focused ? "#f1f5f9" : "#9CA3AF"}
                    size={24}
                    style={{ marginRight: -12 }}
                  />
                ),
              }}
            />
          </Tabs>

          <CustomTabBar isExpanded={isExpanded} onToggle={(state) => handleToggle(state)} />

        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flex: 1,
    position: "relative",
  },
  tabBar: {
    position: "absolute",
    bottom: 15,
    left: 0,
    right: 0,
    height: 55,
    backgroundColor: "#2a3953",
    zIndex: 3000,
    borderRadius: 20,
    marginHorizontal: 10,
    paddingTop: 5,
    borderTopWidth: 0,
    justifyContent: "space-between",

   
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 4, height: 4 }, // Position of the shadow
    shadowOpacity: 0.1, // Shadow transparency
    shadowRadius: 10, // Shadow spread
    elevation: 10, // Android shadow effect
  },
  BackgroundCustomTabBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "100%",

    zIndex: 2000,
  },
});
