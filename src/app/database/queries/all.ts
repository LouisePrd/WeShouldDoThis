import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { films, places, ressources } from "../schema";

export async function getLastItems() {
  try {
    const lastFilms = await db
      .select({ 
        id: films.id_film, 
        name: films.name, 
        createdAt: films.createdAt, 
        type: sql`'film'`.as("type")
      })
      .from(films);

    const lastPlaces = await db
      .select({ 
        id: places.id_place, 
        name: places.name, 
        createdAt: places.createdAt, 
        type: sql`'place'`.as("type")
      })
      .from(places);

    const lastRessources = await db
      .select({ 
        id: ressources.id_ressource, 
        name: ressources.name, 
        createdAt: ressources.createdAt, 
        type: sql`'ressource'`.as("type")
      })
      .from(ressources);

    // Fusionner tous les éléments
    const allItems = [...lastFilms, ...lastPlaces, ...lastRessources];

    // Trier par date (en string), puis prendre les 5 plus récents
    const sorted = allItems
      .filter((item) => item.createdAt !== null)
      .sort(
        (a, b) =>
          new Date(b.createdAt as string).getTime() -
          new Date(a.createdAt as string).getTime()
      )
      .slice(0, 5);

    // ✅ Sérialisation : convertir les dates en string ISO
    const serialized = sorted.map((item) => ({
      ...item,
      createdAt: item.createdAt ? new Date(item.createdAt).toISOString() : null,
    }));

    return serialized;
  } catch (error) {
    console.error("Failed to get last items:", error);
    throw error;
  }
}
