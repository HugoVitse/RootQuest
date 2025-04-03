import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";

export async function POST(req: NextRequest) {
    try {
        const { dockerImage } = await req.json();
        if (!dockerImage) {
            return NextResponse.json({ message: "Nom de l'image Docker requis" }, { status: 400 });
        }

        const command = `docker run -d -p 8080:80 ${dockerImage}`;

        return new Promise((resolve) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Erreur : ${stderr}`);
                    resolve(NextResponse.json({ message: "Erreur lors du lancement", error: stderr }, { status: 500 }));
                } else {
                    // Retourner l'ID du conteneur démarré
                    resolve(NextResponse.json({ message: "Challenge démarré !", containerId: stdout.trim() }));
                }
            });
        });

    } catch (error) {
        return NextResponse.json({ message: "Erreur serveur", error }, { status: 500 });
    }
}
