import React, { useEffect, useState } from "react";
import { View, StyleSheet, Animated, TouchableOpacity, Easing } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Vibration } from "react-native";

interface CustomTabBarProps {
  isExpanded: boolean;
  onToggle: (state: boolean) => void;
}

export function CustomTabBar({ isExpanded, onToggle }: CustomTabBarProps) {
  const [modeValue, setModeValue] = useState(0);
  const mode = new Animated.Value(modeValue);
  const buttonSize = new Animated.Value(1);
  const navigation: NavigationProp<any> = useNavigation();

  useEffect(() => {
    Animated.timing(mode, {
      toValue: isExpanded ? 1 : 0,
      duration: 500,
      easing: Easing.inOut(Easing.ease), 
      useNativeDriver: true,
    }).start();
  }, [isExpanded]);

  const resetButtons = () => {
    Animated.parallel([
      Animated.timing(buttonSize, {
        toValue: 1,
        duration: 500,
        easing: Easing.inOut(Easing.ease), 
        useNativeDriver: true,
      }),
      Animated.timing(mode, {
        toValue: 0,
        duration: 500,
        easing: Easing.inOut(Easing.ease), 
        useNativeDriver: true,
      }),
    ]).start(() => {
      setModeValue(0);
      onToggle(false);
    });
  };

  const handlePress = () => {
    Vibration.vibrate(50);
    const newState = !isExpanded;
  
    Animated.sequence([
      Animated.timing(buttonSize, {
        toValue: 0.9,
        duration: 700,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(buttonSize, {
        toValue: 1,
        duration: 700,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.spring(mode, {
        toValue: newState ? 1 : 0,
        stiffness: 80, // Ajuste de rigidez para suavidade
        damping: 15, // Reduz oscilação
        mass: 1, // Controla a massa do objeto animado
        useNativeDriver: true,
      }),
    ]).start();
  
    setModeValue(modeValue === 0 ? 1 : 0);
    onToggle(newState);
  };
  

  const navigateToExpense = () => {
    Vibration.vibrate(25);
    resetButtons();
    navigation.navigate("create-transaction", { type: "expense" });
  };

  const navigateToIncome = () => {
    Vibration.vibrate(25);
    resetButtons();
    navigation.navigate("create-transaction", { type: "income" });
  };

  const navigateToTransfer = () => {
    Vibration.vibrate(25);
    resetButtons();
    navigation.navigate("transactions", { type: "transfer" });
  };

  const rotation = mode.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"], // Apenas mapeamento de valores
    extrapolate: "clamp", // Garante que os valores fiquem dentro do intervalo
  });
  
  // Atualize o método de animação para incluir o easing
  Animated.timing(mode, {
    toValue: isExpanded ? 1 : 0,
    duration: 300,
    easing: Easing.inOut(Easing.exp), // Suavização adicionada aqui
    useNativeDriver: true, // Habilita animações nativas
  }).start();
  

  const sizeStyle = {
    transform: [{ scale: buttonSize }],
  };

  const expenseTransform = {
    transform: [
      {
        translateX: mode.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -80],
        }),
      },
      {
        translateY: mode.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -80],
        }),
      },
      {
        scale: mode.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5, 1],
        }),
      },
    ],
    opacity: mode.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  };
  
  const incomeTransform = {
    transform: [
      {
        translateX: mode.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 80],
        }),
      },
      {
        translateY: mode.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -80],
        }),
      },
      {
        scale: mode.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5, 1],
        }),
      },
    ],
    opacity: mode.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  };
  
  const transferTransform = {
    transform: [
      {
        translateX: mode.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0],
        }),
      },
      {
        translateY: mode.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -130],
        }),
      },
      {
        scale: mode.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5, 1],
        }),
      },
    ],
    opacity: mode.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  };

  const textStyle = {
    opacity: mode.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    transform: [
      {
        translateY: mode.interpolate({
          inputRange: [0, 1],
          outputRange: [10, 0],
        }),
      },
    ],
  };
  
  
  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.circle, transferTransform, { backgroundColor:  "#2196F3"}]}
      >
        <TouchableOpacity onPress={navigateToTransfer}>
          <AntDesign name="swap" size={25} color="#FFFFFF" />
        </TouchableOpacity>
        <Animated.Text style={[styles.label,textStyle, { bottom: -30 }]}>
          Transações
        </Animated.Text>
      </Animated.View>

      <Animated.View
        style={[styles.circle, incomeTransform, { backgroundColor: "#4CAF50" }]}
      >
        <TouchableOpacity onPress={navigateToIncome}>
          <AntDesign name="plus" size={25} color="#FFFFFF" />
        </TouchableOpacity>
        <Animated.Text style={[styles.label,textStyle, { bottom: -20 }]}>
          Receita
        </Animated.Text>
      </Animated.View>

      <Animated.View
        style={[styles.circle, expenseTransform, { backgroundColor: "#FF5722" }]}
      >
        <TouchableOpacity onPress={navigateToExpense}>
          <AntDesign name="minus" size={25} color="#FFFFFF" />
        </TouchableOpacity>
        <Animated.Text style={[styles.label,textStyle, { bottom: -20 }]}>
          Despesa
        </Animated.Text>
      </Animated.View>

      <TouchableOpacity
        style={[styles.circle]}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <Animated.View style={[sizeStyle]}>
          <View style={styles.hexagon}>
            <View style={styles.hexagonBefore} />
            <View style={styles.hexagonAfter} />
            <View style={styles.hexagonInner}>
              <Animated.View style={{ transform: [{ rotate: rotation }] }}>
                <AntDesign name="plus" size={25} color="#FFFFFF" />
              </Animated.View>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 40,
    left: "50%",
    marginLeft: -25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3000,
  },
  circle: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  hexagon: {
    width: 65,
    height: 36,
    backgroundColor: "#6200ee",
    position: "relative",
    shadowColor: "#f1f5f9",

    shadowOffset: { width: 5, height: 5 }, // Aumentado para dar mais profundidade
    shadowOpacity: 0.5, // Aumentado para mais intensidade
    shadowRadius: 5, // Aumentado para suavizar a sombra
    elevation: 10, // Aumentado para Android
    
  },
  hexagonInner: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  hexagonBefore: {
    position: "absolute",
    top: -18,
    left: 0,
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderLeftWidth: 33,
    borderLeftColor: "transparent",
    borderRightWidth: 33,
    borderRightColor: "transparent",
    borderBottomWidth: 18,
    borderBottomColor: "#6200ee",
  },
  hexagonAfter: {
    position: "absolute",
    bottom: -17,
    left: 0,
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderLeftWidth: 33,
    borderLeftColor: "transparent",
    borderRightWidth: 33,
    borderRightColor: "transparent",
    borderTopWidth: 18,
    borderTopColor: "#6200ee",
    
  },
  label: {
    position: "absolute",
    fontSize: 12,
    color: "#FFFFFF",
    textAlign: "center",
  },
});