import type { ArtworkId } from "@/src/types/artwork";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "@unveil:favorites";

async function readFavorites(): Promise<ArtworkId[]> {
  try {
    const raw = await AsyncStorage.getItem(FAVORITES_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((value): value is ArtworkId => typeof value === "string");
  } catch (error) {
    console.warn("[FavoritesService] Failed to read favorites", error);
    return [];
  }
}

async function writeFavorites(ids: ArtworkId[]): Promise<void> {
  try {
    const serialized = JSON.stringify(ids);
    await AsyncStorage.setItem(FAVORITES_KEY, serialized);
  } catch (error) {
    // Best-effort persistence; do not crash the app.
    console.warn("[FavoritesService] Failed to write favorites", error);
  }
}

export async function addFavorite(id: ArtworkId): Promise<void> {
  const current = await readFavorites();
  if (current.includes(id)) return;

  const updated = [...current, id];
  await writeFavorites(updated);
}

export async function removeFavorite(id: ArtworkId): Promise<void> {
  const current = await readFavorites();
  if (!current.includes(id)) return;

  const updated = current.filter((existingId) => existingId !== id);
  await writeFavorites(updated);
}

export async function isFavorited(id: ArtworkId): Promise<boolean> {
  const current = await readFavorites();
  return current.includes(id);
}

export async function listFavorites(): Promise<ArtworkId[]> {
  return readFavorites();
}

