import { NextRequest, NextResponse } from "next/server";
import { createUser, connectUser } from "@/app/database/queries/users";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { pseudo, password, mode } = body;

  if (!pseudo || !password || !["signup", "login"].includes(mode)) {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  try {
    if (mode === "signup") {
      const user = await createUser(pseudo, password);
      return NextResponse.json(
        { message: "Utilisateur créé", user },
        { status: 201 }
      );
    } else {
      const user = await connectUser(pseudo, password);
      if (!user) {
        return NextResponse.json(
          { error: "Pseudo ou mot de passe incorrect" },
          { status: 401 }
        );
      }
      return NextResponse.json({ message: "Connecté.e", user }, { status: 200 });
    }
  } catch (err) {
    console.error("Erreur API /api/auth :", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
