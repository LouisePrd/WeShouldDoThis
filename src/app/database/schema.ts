import { pgTable, serial, text, time, pgEnum, integer } from "drizzle-orm/pg-core";

const stateEnum = pgEnum("states", ["active", "inactive", "pending"]);

export const states = pgTable("states", {
  id_state: serial("id_state").primaryKey(),
  state: stateEnum("states").notNull(),
});

export const users = pgTable("Users", {
  id_user: serial("id_user").primaryKey(),
  pseudo: text("pseudo").notNull().unique(),
  password: text("password").notNull(),
});

export const films = pgTable("Films", {
  id_film: serial("id_film").primaryKey(),
  name: text("name").notNull(),
  platform: text("platform").notNull(),
  duration: time("duration").notNull(),
  fk_id_state: integer("fk_id_state").notNull(),
});

export const places = pgTable("Places", {
  id_place: serial("id_place").primaryKey(),
  name: text("name").notNull(),
  desc: text("desc").notNull(),
  fk_id_state: integer("fk_id_state").notNull(),
});

export const ressources = pgTable("Ressources", {
  id_ressource: serial("id_ressource").primaryKey(),
  name: text("name").notNull(),
  desc: text("desc").notNull(),
  type: text("type").notNull(),
});