// api/upload/route.ts
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

// Fonction d'upload du fichier
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("photo") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Aucun fichier fourni." },
        { status: 400 }
      );
    }

    // Créer un nom de fichier unique en utilisant le nom d'utilisateur
    const username = formData.get("username") as string;
    const filename = `${username}.jpg`;

    // Créer un dossier pour stocker l'image si nécessaire
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    const filePath = path.join(uploadDir, filename);

    // Convertir l'image en buffer et sauvegarder sur le serveur
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    fs.writeFileSync(filePath, buffer);

    console.log("Fichier sauvegardé à:", filePath);

    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (error) {
    console.error("Erreur d'upload:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'upload du fichier." },
      { status: 500 }
    );
  }
}
