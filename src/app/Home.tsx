"use client";

import { useState } from "react";
import styles from "./page.module.css";

type Item = {
  id: number;
  name: string;
  createdAt: string;
  type: "film" | "place" | "ressource";
};

export default function Home({ items }: { items: Item[] }) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => Math.max(i - 1, 0));
  const next = () => setIndex((i) => Math.min(i + 1, items.length - 1));

  const renderItemContent = (item: Item) => {
    switch (item.type) {
      case "film":
        // date + clean
        return (
          <div className={styles.filmCard}>
            <h3>{item.name}</h3>
            <p>Film ajouté le : {new Date(item.createdAt).toLocaleDateString("fr-FR")}</p>
          </div>
        );
      case "place":
        return (
          <div className={styles.placeCard}>
            <h3>{item.name}</h3>
            <p>Lieu ajouté le : {new Date(item.createdAt).toLocaleDateString("fr-FR")}</p>
          </div>
        );
      case "ressource":
        return (
          <div className={styles.ressourceCard}>
            <h3>{item.name}</h3>
            <p>Ressource ajoutée le : {new Date(item.createdAt).toLocaleDateString("fr-FR")}</p>
          </div>
        );
      default:
        return <h3>{item.name}</h3>;
    }
  };

  return (
    <div className={styles.page}>
      <h1>Bienvenue sur WeShouldDoThis</h1>
      <h2>Les derniers ajouts</h2>

      <div className={styles.carouselContainer}>
        <button onClick={prev} disabled={index === 0} className={styles.navButton}>
          ←
        </button>

        <div className={styles.carousel}>
          <div
            className={styles.carouselInner}
            style={{ transform: `translateX(-${index * 400}px)` }}
          >
            {items.map((item, i) => (
              <div key={item.id} className={styles.card}>
                {renderItemContent(item)}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={next}
          disabled={index === items.length - 1}
          className={styles.navButton}
        >
          →
        </button>
      </div>
    </div>
  );
}
