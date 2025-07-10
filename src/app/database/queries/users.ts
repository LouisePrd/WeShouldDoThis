import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "../schema";
import bcrypt from "bcrypt";

export async function createUser(pseudo: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await db.insert(users).values({ pseudo, password: hashedPassword }).returning();
  return result[0];
}

export async function connectUser(pseudo: string, password: string) {
  const result = await db.select().from(users).where(eq(users.pseudo, pseudo));
  const user = result[0];

  if (!user) return null;

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) return null;

  return user;
}
