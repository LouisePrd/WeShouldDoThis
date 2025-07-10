import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id_user: serial("id_user").primaryKey(),
  pseudo: text("pseudo").notNull().unique(),
  password: text("password").notNull(),
});
