"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./navbar.module.css";

export default function Navbar() {
  const [showResources, setShowResources] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <nav>
      <ul className={styles.navbar}>
        <li className={styles.logo}>
          <Link href="/">
            <img src="/logo.webp" alt="Logo" />
          </Link>
        </li>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/ideas">Lieux</Link>
        </li>
        <li
          className={styles.resources}
          onMouseEnter={() => setShowResources(true)}
          onMouseLeave={() => setShowResources(false)}
        >
          <Link href="/ressources">Ressources</Link>

          {isMounted && (
            <ul className={`${styles.dropdown} ${showResources ? styles.visible : styles.hidden}`}>
              <li>
                <Link href="/ressources/podcasts">Podcasts</Link>
              </li>
              <li>
                <Link href="/ressources/films">Films</Link>
              </li>
              <li>
                <Link href="/ressources/articles">Articles</Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/auth">Connect</Link>
        </li>
      </ul>
    </nav>
  );
}