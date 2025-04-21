import { RowDataPacket } from "mysql2";

export type Image = {
    image: string;
    name: string;
    flags: string[]; 
    duo: boolean;
}


export type ImageClient = { 
    image: string;
    name: string;
    difficulty: string;
}

export type ImageResponse = {
    images?: ImageClient[],
    message: string;
}

export interface ImageRow extends RowDataPacket {
    image: string;
    name: string;
    flags: string[]; // assure-toi que c'est bien stocké en JSON ou tableau dans la DB
    duo: boolean;
}

export interface FlagRow extends RowDataPacket {
    flag: string;
    image_id: number;
}

export interface UserRow extends RowDataPacket {
    username: string;
    password: string;
    email: string;
    flags_validated: string[];
}