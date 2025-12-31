import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import ArtworkInfoSheet from "@/components/ArtworkInfoSheet";
import ArtworkViewer from "@/components/ArtworkViewer";
import { getMockArtworks } from "@/src/services/artworks/mockArtworks";

/**
 * Unveil · Daily
 * - Full-screen cover image
 * - Swipe up for info panel
 * - “Change Artwork” button for debug
 */
export default function TabOneScreen() {
  const artworks = useMemo(() => getMockArtworks(), []);
  const [artwork, setArtwork] = useState(() => {
    const i = Math.floor(Math.random() * artworks.length);
    return artworks[i];
  });

  const changeArtwork = () => {
    const i = Math.floor(Math.random() * artworks.length);
    setArtwork(artworks[i]);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {artwork && <ArtworkViewer artwork={artwork} />}
      {artwork && <ArtworkInfoSheet artwork={artwork} />}
      <Pressable style={styles.button} onPress={changeArtwork}>
        <Text style={styles.buttonText}>Change Artwork</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  button: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "rgba(255,255,255,0.8)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
  },
});
