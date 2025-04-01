import { NextRequest, NextResponse } from "next/server";
import { DockerData, DockerResponse } from "@/app/types/docker";
import { containerExists, startContainer } from "@/app/lib/docker";
import { decrypt } from "@/app/lib/session";
import { SessionPayload } from "@/app/types/auth";

export async function POST(req: NextRequest) {


    try {
        const { image } : DockerData = await req.json();
        const token = req.cookies.get("session")?.value

        if (token === undefined) {
            throw new Error("Unauthorized");
        }
        const decrypted : SessionPayload | string = await decrypt(token);
        if (typeof decrypted === 'string') {
            throw new Error("Unauthorized");
        }
        const username  = decrypted.username;
        const image_name = `${image}_${username}`
        const rep : boolean = await containerExists(image_name);
        
        if( rep) {
            return NextResponse.json({ running: true}, { status: 200 });
        }
        else {
            throw new Error("Container already running");
        }

    } catch (error: unknown) {   
        return NextResponse.json({ running: false }, { status: 500 });
       
    }


}