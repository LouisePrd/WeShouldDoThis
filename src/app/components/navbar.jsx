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
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/ideas">Places to go</Link>
        </li>
        <li
          className={styles.resources}
          onMouseEnter={() => setShowResources(true)}
          onMouseLeave={() => setShowResources(false)}
        >
          <Link href="/resources">Resources</Link>

          {isMounted && (
            <ul className={`${styles.dropdown} ${showResources ? styles.visible : styles.hidden}`}>
              <li>
                <Link href="/resources/podcasts">Podcasts</Link>
              </li>
              <li>
                <Link href="/resources/films">Films</Link>
              </li>
              <li>
                <Link href="/resources/articles">Articles</Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}