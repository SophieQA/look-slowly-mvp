import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Platform } from 'react-native';

/**
 * Downloads an image from a remote URI and saves it to the device’s photo library.
 * - On native (iOS/Android) it requests permissions and uses FileSystem + MediaLibrary.
 * - On web it falls back to creating a temporary anchor to trigger a download.
 *
 * @param uri Remote image URL
 */
export async function downloadImageAsync(uri: string): Promise<void> {
  if (Platform.OS === 'web') {
    const response = await fetch(uri);
    if (!response.ok) {
      throw new Error(`Failed to download (status ${response.status})`);
    }
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = uri.split('/').pop() ?? 'download';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    return;
  }

  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permission to access media library was denied.');
  }

  const filename = uri.split('/').pop() ?? 'download.jpg';
  const baseDir = FileSystem.cacheDirectory ?? FileSystem.documentDirectory ?? '';
  const localUri = baseDir + filename;

  const result = await FileSystem.downloadAsync(uri, localUri);
  if (result.status !== 200) {
    throw new Error(`Download failed with status ${result.status}`);
  }

  await MediaLibrary.saveToLibraryAsync(result.uri);
}
