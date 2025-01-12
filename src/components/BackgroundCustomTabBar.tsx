import React, { useMemo } from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

interface BackgroundCustomTabBarProps {
  onClose: () => void;
  isVisible: boolean;
}

export default function BackgroundCustomTabBar({ onClose, isVisible }: BackgroundCustomTabBarProps) {
  const snapPoints = useMemo(() => ["100%"], []);

  return (
    <TouchableWithoutFeedback onPress={onClose} accessible={false}>
      <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        <BottomSheet
          containerStyle={{ flex: 1 }}
          snapPoints={snapPoints}
          index={isVisible ? 1 : -1} // Esconde o BottomSheet se não estiver visível
          enableOverDrag
          onClose={() => {
            onClose();
          }}
          backgroundStyle={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
          handleIndicatorStyle={{
            backgroundColor: "transparent",
          }}
        >
          <BottomSheetView>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            ></View>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </TouchableWithoutFeedback>
  );
}

