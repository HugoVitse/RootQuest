import { NextRequest, NextResponse } from "next/server";
import { DockerData, DockerResponse } from "@/types/docker";
import { startContainer } from "@/lib/docker";
import { decrypt } from "@/lib/session";
import { SessionPayload } from "@/types/auth";

export async function POST(req: NextRequest) {


    try {

        const { image } : DockerData = await req.json();
        const token = req.cookies.get("session")?.value

        if (token === undefined) {
            throw new Error("Unauthorized");
        }
        const decrypted : SessionPayload | string = await decrypt(token);
        const username  = decrypted.username;

        const rep : DockerResponse = await startContainer(image, username);
        
        if( rep.success) {
            return NextResponse.json({ success: true, ip : rep.ip }, { status: 200 });
        }
        else {
            throw new Error(rep.message);
        }

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ success: false, message: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ success: false, message: "Error" }, { status: 500 });
        }
    }


}