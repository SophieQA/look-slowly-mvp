/**
 * Unveil domain types.
 *
 * This app is designed to work without any external API keys by default.
 * Keep this type minimal and UI-friendly; persistence/backends can extend it
 * later via additional optional fields.
 */

export type ArtworkId = string;

/**
 * Minimal artwork metadata required by the app.
 *
 * Note: `year` is a string to support values like "c. 1889".
 */
export interface Artwork {
  id: ArtworkId;
  title: string;
  year: string;
  artist: string;
  medium: string;
  dimensions: string;
  museumName: string;

  /** Direct image URL usable by <Image source={{ uri }} /> */
  imageUrl: string;
  /** Official artwork page on museum/collection site */
  artworkUrl: string;

  /** Optional extra metadata */
  description?: string;
}
