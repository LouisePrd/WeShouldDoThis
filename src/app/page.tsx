"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const items = ["1", "2", "3", "4"];
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => Math.max(i - 1, 0));
  const next = () => setIndex((i) => Math.min(i + 1, items.length - 1));

  return (
    <div className={styles.page}>
      <h1>Bienvenue sur WeShouldDoThis</h1>

      <h2>Les derniers ajouts</h2>

      <div className={styles.carouselContainer}>
        <button onClick={prev} disabled={index === 0} className={styles.navButton}>←</button>

        <div className={styles.carousel}>
          <div
            className={styles.carouselInner}
            style={{ transform: `translateX(-${index * 400}px)` }}
          >
            {items.map((item, i) => (
              <div key={i} className={styles.card}>
                {item}
              </div>
            ))}
          </div>
        </div>

        <button onClick={next} disabled={index === items.length - 1} className={styles.navButton}>→</button>
      </div>
    </div>
  );
}
