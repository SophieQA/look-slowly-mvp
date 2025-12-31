import type { Artwork, ArtworkId } from "@/src/types/artwork";

/**
 * Local mock dataset.
 *
 * Goals:
 * - No API keys required.
 * - Image URLs are public and directly usable by RN <Image />.
 * - Each artwork has an official page URL.
 */

export const MOCK_ARTWORKS: readonly Artwork[] = [
  {
    id: "met-436524",
    title: "Wheat Field with Cypresses",
    year: "1889",
    artist: "Vincent van Gogh",
    medium: "Oil on canvas",
    dimensions: "72.1 × 90.9 cm (28 3/8 × 35 3/4 in.)",
    museumName: "The Metropolitan Museum of Art",
    imageUrl:
      "https://images.metmuseum.org/CRDImages/ep/original/DP130155.jpg",
    artworkUrl:
      "https://www.metmuseum.org/art/collection/search/436524",
  },
  {
    id: "met-436121",
    title: "The Japanese Footbridge",
    year: "c. 1899",
    artist: "Claude Monet",
    medium: "Oil on canvas",
    dimensions: "89.2 × 92.1 cm (35 1/8 × 36 1/4 in.)",
    museumName: "The Metropolitan Museum of Art",
    imageUrl:
      "https://images.metmuseum.org/CRDImages/ep/original/DP-14124-001.jpg",
    artworkUrl:
      "https://www.metmuseum.org/art/collection/search/436121",
  },
  {
    id: "met-436535",
    title: "Irises",
    year: "1890",
    artist: "Vincent van Gogh",
    medium: "Oil on canvas",
    dimensions: "71.1 × 93 cm (28 × 36 5/8 in.)",
    museumName: "The Metropolitan Museum of Art",
    imageUrl:
      "https://images.metmuseum.org/CRDImages/ep/original/DP229743.jpg",
    artworkUrl:
      "https://www.metmuseum.org/art/collection/search/436535",
  },
  {
    id: "met-459123",
    title: "The Starry Night",
    year: "1889",
    artist: "Vincent van Gogh",
    medium: "Oil on canvas",
    dimensions: "73.7 × 92.1 cm (29 × 36 1/4 in.)",
    museumName: "The Museum of Modern Art (MoMA)",
    imageUrl:
      "https://www.moma.org/media/W1siZiIsIjM5ODQxOCJdLFsicCIsImNvbnZlcnQiLCItcmVzaXplIDIwMDB4MjAwMFx1MDAzZSJdXQ.jpg?sha=4d8c4a5a3d33c95a",
    artworkUrl:
      "https://www.moma.org/collection/works/79802",
  },
  {
    id: "rijks-1642",
    title: "The Night Watch",
    year: "1642",
    artist: "Rembrandt van Rijn",
    medium: "Oil on canvas",
    dimensions: "379.5 × 453.5 cm",
    museumName: "Rijksmuseum",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/2/20/The_Nightwatch_by_Rembrandt.jpg",
    artworkUrl:
      "https://www.rijksmuseum.nl/en/collection/SK-C-5",
  },
];

export function getMockArtworks(): readonly Artwork[] {
  return MOCK_ARTWORKS;
}

export function getMockArtworkById(id: ArtworkId): Artwork | undefined {
  return MOCK_ARTWORKS.find((a) => a.id === id);
}
