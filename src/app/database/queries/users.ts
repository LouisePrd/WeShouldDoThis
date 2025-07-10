import { users } from "../schema";
import { eq } from "drizzle-orm";
import { db } from "../../../db";

export async function getAllUsers() {
  return await db.select().from(users);
}

export async function getUserById(id: number) {
  return await db.select().from(users).where(eq(users.id_user, id));
}
