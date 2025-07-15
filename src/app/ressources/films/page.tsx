

import { getFilms } from "@/app/database/queries/films";
import styleFilm from "@/app/ressources/films/films.module.css";
import FilmPageClient from "./filmPageClient";

export default async function FilmsPage() {
  const allFilmsRaw = await getFilms();

  const allFilms = allFilmsRaw.map(film => ({
    id: film.id_film,
    name: film.name,
    platform: film.platform,
    duration: film.duration,
    fk_id_state: film.fk_id_state,
    created_at: film.createdAt ? film.createdAt : null, // formatage pour le client
  }));

  return (
    <div>
      <h1 className={styleFilm.h1}>Films</h1>
      <FilmPageClient initialFilms={allFilms} />

    </div>
  );
}