import { StatusBar } from "expo-status-bar";
import React, { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import ArtworkInfoSheet from "@/components/ArtworkInfoSheet";
import ArtworkViewer from "@/components/ArtworkViewer";
import FavoriteHeartButton from "@/components/FavoriteHeartButton";
import { getMockArtworks } from "@/src/services/artworks/mockArtworks";
import {
  addFavorite,
  isFavorited,
  removeFavorite,
} from "@/src/services/favorites/favoritesService";

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
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);

  const changeArtwork = () => {
    const i = Math.floor(Math.random() * artworks.length);
    setArtwork(artworks[i]);
  };

  useEffect(() => {
    let isMounted = true;

    const loadFavoriteStatus = async () => {
      if (!artwork) {
        if (isMounted) {
          setIsFavorite(false);
          setIsFavoriteLoading(false);
        }
        return;
      }

      setIsFavoriteLoading(true);
      try {
        const favorited = await isFavorited(artwork.id);
        if (isMounted) {
          setIsFavorite(favorited);
        }
      } catch (error) {
        console.warn("[Daily] Failed to load favorite status", error);
        if (isMounted) {
          setIsFavorite(false);
        }
      } finally {
        if (isMounted) {
          setIsFavoriteLoading(false);
        }
      }
    };

    loadFavoriteStatus();

    return () => {
      isMounted = false;
    };
  }, [artwork]);

  const toggleFavorite = async () => {
    if (!artwork || isFavoriteLoading) return;

    const nextValue = !isFavorite;

    // Optimistic UI update; persistence is best-effort.
    setIsFavorite(nextValue);
    setIsFavoriteLoading(true);

    try {
      if (nextValue) {
        await addFavorite(artwork.id);
      } else {
        await removeFavorite(artwork.id);
      }
    } catch (error) {
      console.warn("[Daily] Failed to update favorite status", error);
      // Roll back UI state if persistence fails.
      setIsFavorite(!nextValue);
    } finally {
      setIsFavoriteLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {artwork && <ArtworkViewer artwork={artwork} />}
      {artwork && <ArtworkInfoSheet artwork={artwork} />}
      {artwork && (
        <FavoriteHeartButton
          style={styles.favoriteButton}
          isFavorite={isFavorite}
          isLoading={isFavoriteLoading}
          onPress={toggleFavorite}
        />
      )}
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
  favoriteButton: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  button: {
    position: "absolute",
    top: 40,
    right: 70,
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
