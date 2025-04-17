import {connection } from '@/db';
import { ImageResponse, ImageRow, Image } from "@/types/image";
import { getSession } from './sessionStore';
import { getImageFromUser } from './gameSession';


export async function getImages() : Promise<ImageResponse> {

    const querySelectImages : string = `SELECT * FROM images`;


    try {
        const [rows] = await connection.query<ImageRow[]>(querySelectImages);

        const images: Image[] = rows.map(row => ({
            image: row.image,
            name: row.name,
        }));

               
        return {
            images: images,
            message: "Images retrieved successfully"
        };

    } catch (error: unknown) {
        if (error instanceof Error) {
            return { message: error.message };
        } else {
            return { message: "Error" };
        }
    }

}

export async function getNbFlags(id:string, username:string) : Promise<number> {

    const session = await getSession(id);
    if (session === undefined) {
        throw new Error("Session not found");
    }
    const image = await getImageFromUser(id, username);
    console.log(image)

    const querySelectImages : string = `SELECT * FROM images WHERE image = '${image}'`;
    console.log(querySelectImages)
    try {
        const [rows] = await connection.query<ImageRow[]>(querySelectImages);

        if (rows.length === 0) {
            throw new Error("Image not found");
        }

        const flags = rows[0].flags;
        return flags.length;

    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("Error");
        }
    }
}