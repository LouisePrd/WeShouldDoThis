import { pgTable, serial, text, time, pgEnum, integer, timestamp, date } from "drizzle-orm/pg-core";

const stateEnum = pgEnum("state_enum", ["in progress", "done", "to do"]);

export const state = pgTable("state", {
  id_state: serial("id_state").primaryKey(),
  state: stateEnum("state_enum").notNull(),
});

export const users = pgTable("users", {
  id_user: serial("id_user").primaryKey(),
  pseudo: text("pseudo").notNull().unique(),
  password: text("password").notNull(),
});

export const films = pgTable("films", {
  id_film: serial("id_film").primaryKey(),
  name: text("name").notNull(),
  platform: text("platform").notNull(),
  duration: text("duration").notNull(),
  createdAt: date("created_at"),
  fk_id_state: integer("fk_id_state").notNull().references(() => state.id_state), // <-- ajout relation
});

export const places = pgTable("places", {
  id_place: serial("id_place").primaryKey(),
  name: text("name").notNull(),
  desc: text("desc").notNull(),
  createdAt: date("created_at"),
  fk_id_state: integer("fk_id_state").notNull(),
});

export const ressources = pgTable("ressources", {
  id_ressource: serial("id_ressource").primaryKey(),
  name: text("name").notNull(),
  desc: text("desc").notNull(),
  url: text("url").notNull(),
  createdAt: date("created_at"),
  type: text("type").notNull(),
});