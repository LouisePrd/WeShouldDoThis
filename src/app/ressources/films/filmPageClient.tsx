'use client';

import { useState, useMemo } from "react";
import { Filter } from "@/app/components/Filter/Filter";
import { FilmCard } from "@/app/components/Cards/FilmCard";

type Film = {
  id: number;
  name: string;
  platform: string;
  duration: string;
  fk_id_state: number;
  created_at?: string | null;
};

export default function FilmPageClient({ initialFilms }: { initialFilms: Film[] }) {
  const [selectedTag, setSelectedTag] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const tags = useMemo(() => {
    return Array.from(new Set(initialFilms.map(f => f.fk_id_state.toString())));
  }, [initialFilms]);

  const filteredFilms = useMemo(() => {
    return initialFilms
      .filter((film) => selectedTag === "" || film.fk_id_state.toString() === selectedTag)
      .sort((a, b) => 
        sortOrder === "asc" 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name)
      );
  }, [initialFilms, selectedTag, sortOrder]);

  return (
    <>
      <Filter
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        tags={tags}
      />
      {filteredFilms.length === 0 ? (
        <p>Aucun film ne correspond à ce filtre.</p>
      ) : (
        <ul className="film-list">
          {filteredFilms.map((film) => (
            <li key={film.id}>
              <FilmCard
                film={{
                  name: film.name,
                  platform: film.platform,
                  duration: film.duration,
                  createdAt: film.created_at || "",
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
