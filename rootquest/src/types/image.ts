import { RowDataPacket } from "mysql2";

export type Image = {
    image: string;
    name: string;
}

export type ImageResponse = {
    images?: Image[],
    message: string;
}

export interface ImageRow extends RowDataPacket {
    image: string;
    name: string;
    flags: string[]; // assure-toi que c'est bien stocké en JSON ou tableau dans la DB
}