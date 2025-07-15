"use client";

export default async function CreateFilmPage() {
  return (
    <div>
      <h1>Créer un film</h1>
      <form>
        <div>
          <label htmlFor="name">Nom:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="platform">Plateforme:</label>
          <input type="text" id="platform" name="platform" required />
        </div>
        <div>
          <label htmlFor="duration">Durée:</label>
          <input type="text" id="duration" name="duration" required />
        </div>
        <button type="submit">Créer</button>
      </form>
    </div>
  );
}
