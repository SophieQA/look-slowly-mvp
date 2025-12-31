import type { Artwork } from '@/src/types/artwork';
import React from 'react';
import { Image, StyleSheet, useWindowDimensions, View } from 'react-native';

interface ArtworkViewerProps {
  artwork: Artwork;
}

/**
 * Full‐screen artwork cover image.
 * - Covers screen without distortion (resizeMode="cover")
 * - Adapts to any device dimensions
 */
export default function ArtworkViewer({ artwork }: ArtworkViewerProps) {
  const { width, height } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: artwork.imageUrl }}
        accessibilityLabel={`${artwork.title} — ${artwork.artist}`}
        style={[styles.image, { width, height }]}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  image: {
    // width/height set dynamically
  },
});
