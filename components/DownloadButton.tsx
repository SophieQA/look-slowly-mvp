import { downloadImageAsync } from '@/src/services/downloadService';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';

type DownloadButtonProps = {
  uri: string;
  style?: ViewStyle;
};

export default function DownloadButton({ uri, style }: DownloadButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await downloadImageAsync(uri);
      Alert.alert('Download complete', 'Image saved to your photo library.');
    } catch (error: any) {
      Alert.alert('Download failed', error.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={handlePress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>Download Image</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
});
