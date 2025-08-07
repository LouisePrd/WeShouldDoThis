"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./authPage.module.css";

export default function AuthPage() {
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("...");

    if (mode === "signup") {
      // Appel vers ton API custom d'inscription
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pseudo, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(`Inscription réussie. Vous pouvez vous connecter.`);
        setMode("login");
      } else {
        setMessage("Erreur : " + (data.error || "Une erreur est survenue"));
      }
    } else {
      // Connexion via next-auth
      const res = await signIn("credentials", {
        redirect: false,
        pseudo,
        password,
      });

      if (res?.ok) {
        router.push("/");
      } else {
        setMessage("Erreur de connexion : pseudo ou mot de passe incorrect");
      }
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

        <div className={styles.buttonsContainer}>
          <div className={styles.buttonWrapper}>
            <button type="submit">
              {mode === "login" ? "Se connecter" : "S’inscrire"}
            </button>
          </div>
          <div className={styles.buttonWrapper}>
            <button
              type="button"
              onClick={() => {
                setMode(mode === "login" ? "signup" : "login");
                setMessage("");
              }}
            >
              {mode === "login" ? "Créer un compte" : "J’ai déjà un compte"}
            </button>
          </div>
        </div>
      </form>

      {message && <p className={styles.authMessage}>{message}</p>}
    </div>
  );
}
