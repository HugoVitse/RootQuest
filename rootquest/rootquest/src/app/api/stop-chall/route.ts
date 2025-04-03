import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";

export async function POST(req: NextRequest) {
    try {
        const { containerId } = await req.json();
        if (!containerId) {
            return NextResponse.json({ message: "ID du conteneur requis" }, { status: 400 });
        }

        // Commandes pour arrêter et supprimer le conteneur Docker
        const stopCommand = `docker stop ${containerId}`;
        const removeCommand = `docker rm ${containerId}`;

        return new Promise((resolve, reject) => {
            // Arrêter le conteneur
            exec(stopCommand, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Erreur lors de l'arrêt du conteneur : ${stderr}`);
                    return resolve(NextResponse.json({ message: "Erreur lors de l'arrêt du conteneur", error: stderr }, { status: 500 }));
                }

                // Supprimer le conteneur
                exec(removeCommand, (removeError, removeStdout, removeStderr) => {
                    if (removeError) {
                        console.error(`Erreur lors de la suppression du conteneur : ${removeStderr}`);
                        return resolve(NextResponse.json({ message: "Erreur lors de la suppression du conteneur", error: removeStderr }, { status: 500 }));
                    }

                    resolve(NextResponse.json({ message: "Conteneur arrêté et supprimé avec succès." }));
                });
            });
        });

    } catch (error) {
        return NextResponse.json({ message: "Erreur serveur", error }, { status: 500 });
    }
}
