import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import { SessionPayload } from "@/types/auth";
import { getNbFlags } from "@/lib/getImages";
import { DockerData } from "@/types/docker";

export async function POST(req: NextRequest) {


    try {
        const token = req.cookies.get("session")?.value
        const { id } = await req.json();
        if (token === undefined) {
            throw new Error("Unauthorized");
        }
        const decrypted : SessionPayload | string = await decrypt(token);
        if (typeof decrypted === 'string') {
            throw new Error("Unauthorized");
        }
        
        const rep : number = await getNbFlags(id)
        
        if( rep === undefined) {
            return NextResponse.json({ message: "No images found" }, { status: 404 });
        }
        return NextResponse.json(rep, { status: 200 });
        
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error.message)
            return NextResponse.json({ message: error.message }, { status: 401 });
        } else {
            return NextResponse.json({ message: "Error" }, { status: 500 });
        }
    }
 


}