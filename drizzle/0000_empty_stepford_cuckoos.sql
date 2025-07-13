CREATE TABLE "films" (
	"id_film" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"platform" text NOT NULL,
	"duration" time NOT NULL,
	"created_at" date,
	"fk_id_state" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "places" (
	"id_place" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"desc" text NOT NULL,
	"created_at" date,
	"fk_id_state" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ressources" (
	"id_ressource" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"desc" text NOT NULL,
	"url" text NOT NULL,
	"created_at" date,
	"type" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "state" (
	"id_state" serial PRIMARY KEY NOT NULL,
	"state_enum" "state_enum" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id_user" serial PRIMARY KEY NOT NULL,
	"pseudo" text NOT NULL,
	"password" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "films" ADD CONSTRAINT "films_fk_id_state_state_id_state_fk" FOREIGN KEY ("fk_id_state") REFERENCES "public"."state"("id_state") ON DELETE no action ON UPDATE no action;