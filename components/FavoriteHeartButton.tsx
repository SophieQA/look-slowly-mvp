import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    ActivityIndicator,
    Pressable,
    StyleProp,
    StyleSheet,
    ViewStyle,
} from "react-native";

interface FavoriteHeartButtonProps {
  isFavorite: boolean;
  isLoading?: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function FavoriteHeartButton(
  { isFavorite, isLoading, onPress, style }: FavoriteHeartButtonProps,
) {
  const iconName = isFavorite ? "heart" : "heart-outline";
  const iconColor = isFavorite ? "#ff4d67" : "#ffffff";

  const handlePress = () => {
    if (isLoading) return;
    onPress();
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={
        isFavorite ? "Remove from favorites" : "Add to favorites"
      }
      accessibilityState={{ selected: isFavorite, disabled: !!isLoading }}
      style={({ pressed }) => [
        styles.button,
        pressed && !isLoading && styles.buttonPressed,
        style,
      ]}
      onPress={handlePress}
    >
      {isLoading ? (
        <ActivityIndicator color="#ffffff" />
      ) : (
        <Ionicons name={iconName} size={24} color={iconColor} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    opacity: 0.7,
  },
});

