"use client";

import { useState } from "react";
import styles from "./authPage.module.css";

export default function AuthPage() {
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("...");

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pseudo, password, mode }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage(
        `${mode === "login" ? "Connecté·e" : "Inscription réussie"} en tant que ${data.user.pseudo}`
      );
    } else {
      setMessage("Erreur : " + (data.error || "Une erreur est survenue"));
    }
  };

  return (
    <div className={styles.authContainer}>
      <h1>{mode === "login" ? "Connexion" : "Inscription"}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Pseudo"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className={styles.buttonWrapper}>
          <button type="submit">
            {mode === "login" ? "Se connecter" : "S’inscrire"}
          </button>
        </div>
      </form>
      <div className={styles.buttonWrapper}>
        <button
          onClick={() => {
            setMode(mode === "login" ? "signup" : "login");
            setMessage("");
          }}
        >
          {mode === "login" ? "Créer un compte" : "J’ai déjà un compte"}
        </button>
      </div>

      {message && <p className={styles.authMessage}>{message}</p>}
    </div>
  );
}
