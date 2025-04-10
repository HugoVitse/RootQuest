import {connection } from '@/db';
import { ImageResponse, ImageRow, Image } from "@/types/image";


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