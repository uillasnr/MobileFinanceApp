import React, { useState, useEffect } from 'react';
import { Modal, View, Text, Animated, Easing } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export  default function Loading({ visible }: { visible: boolean }) {
  const [show, setShow] = useState(visible);
  const spinValue = new Animated.Value(0);

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear, 
          useNativeDriver: true,
        })
      ).start();
    };

    if (show) {
      startAnimation();
    }
  }, [show]);

  useEffect(() => {
    setShow(visible);
  }, [visible]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], 
  });

  const scale = spinValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.2, 1], 
  });

  return (
    <Modal visible={show} transparent animationType="fade">
      <View className="flex-1 items-center justify-center bg-black/60 backdrop-blur-sm">
        <View className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-lg">
          <View className="items-center">
            <Animated.View
              style={{
                transform: [{ rotate: spin }, { scale }],
              }}
            >
              <View className="bg-[#6200ee] p-4 rounded-full shadow-lg shadow-[#6200ee]/50">
                <MaterialIcons name="attach-money" size={32} color="white"  />
              </View>
            </Animated.View>
            <Text className="text-white font-medium mt-4 text-base">Carregando...</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}


