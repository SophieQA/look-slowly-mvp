import type { Artwork } from "@/src/types/artwork";
import * as Linking from "expo-linking";
import React, { useRef } from "react";
import {
    Animated,
    Dimensions,
    PanResponder,
    Pressable,
    StyleSheet,
    Text
} from "react-native";

const { height: screenHeight } = Dimensions.get("window");
const SHEET_HEIGHT = screenHeight / 6;

interface ArtworkInfoSheetProps {
  artwork: Artwork;
}

/**
 * Swipe-up panel displaying artwork metadata.
 * - Hidden by default (translateY = sheet height)
 * - Drag up/down to show or hide
 * - Tapping title opens artwork.artworkUrl
 */
export default function ArtworkInfoSheet({ artwork }: ArtworkInfoSheetProps) {
  const translateY = useRef(new Animated.Value(SHEET_HEIGHT)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        const offset = Math.min(
          Math.max(gesture.dy, -SHEET_HEIGHT),
          0
        );
        translateY.setValue(SHEET_HEIGHT + offset);
      },
      onPanResponderRelease: (_, { dy, vy }) => {
        const shouldOpen = dy < -SHEET_HEIGHT / 3 || vy < -0.5;
        Animated.spring(translateY, {
          toValue: shouldOpen ? 0 : SHEET_HEIGHT,
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  const openArtworkUrl = () => {
    Linking.openURL(artwork.artworkUrl).catch(() => {});
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { height: SHEET_HEIGHT, transform: [{ translateY }] },
      ]}
      {...panResponder.panHandlers}
    >
      <Pressable onPress={openArtworkUrl}>
        <Text style={[styles.text, styles.title]} numberOfLines={1}>
          {artwork.title}
        </Text>
      </Pressable>
      <Text style={styles.text}>
        {artwork.year} — {artwork.artist}
      </Text>
      <Text style={styles.text}>{artwork.medium}</Text>
      <Text style={styles.text}>{artwork.dimensions}</Text>
      <Text style={styles.text}>{artwork.museumName}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(128,128,128,0.8)",
    padding: 12,
  },
  text: {
    color: "#fff",
    fontSize: 14,
  },
  title: {
    fontWeight: "600",
    marginBottom: 6,
    textDecorationLine: "underline",
  },
});
