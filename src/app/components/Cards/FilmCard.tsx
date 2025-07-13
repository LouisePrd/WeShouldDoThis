import styles from "./FilmCard.module.css";

export function FilmCard({
  film,
}: {
  film: { name: string; platform: string; duration: string; createdAt: string };
}) {
  return (
    <div className={styles["film-card"]}>
      <h2>{film.name}</h2>
      <p>Plateforme: {film.platform}</p>
      <p>Durée: {film.duration}</p>
      <p>Ajouté le: {film.createdAt ? film.createdAt.slice(0,10) : "Inconnu"}</p>

    </div>
  );
}
