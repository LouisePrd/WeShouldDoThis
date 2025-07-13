import { eq } from "drizzle-orm";
import { db } from "@/db";
import { films } from "../schema";

export async function createFilm(
  name: string,
  platform: string,
  duration: string,
  fk_id_state: number
) {
  try {
    const [createdFilm] = await db.insert(films)
      .values({ name, platform, duration, fk_id_state })
      .returning();
    return createdFilm;
  } catch (error) {
    console.error("Failed to create film:", error);
    throw error;
  }
}

export async function getFilms() {
  try {
    return await db.select().from(films);
  } catch (error) {
    console.error("Failed to get films:", error);
    throw error;
  }
}

export async function getFilmsByPlatform(platform: string) {
  try {
    return await db.select().from(films).where(eq(films.platform, platform));
  } catch (error) {
    console.error("Failed to get films by platform:", error);
    throw error;
  }
}
