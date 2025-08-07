import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/app/database/queries/users";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { pseudo, password } = body;

  if (!pseudo || !password) {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  try {
    const user = await createUser(pseudo, password);
    return NextResponse.json({ message: "Utilisateur créé", user }, { status: 201 });
  } catch (err) {
    console.error("Erreur register :", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
