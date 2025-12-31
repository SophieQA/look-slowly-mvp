// Augment expo-file-system with missing exports
declare module 'expo-file-system' {
  /**
   * Directory where cached files are stored.
   * May be null if unavailable.
   */
  export const cacheDirectory: string | null;

  /**
   * Directory where permanent documents are stored.
   * May be null if unavailable.
   */
  export const documentDirectory: string | null;

  /**
   * Download a file from the given URI to a local file.
   * Returns an object containing the final URI and HTTP status.
   */
  export function downloadAsync(
    uri: string,
    fileUri: string,
    options?: any
  ): Promise<{ uri: string; status: number }>;
}
