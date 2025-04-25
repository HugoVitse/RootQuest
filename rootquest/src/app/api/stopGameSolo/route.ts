import { NextRequest, NextResponse } from "next/server";
import { DockerData, DockerResponse } from "@/types/docker";
import { startContainer, stopContainer } from "@/lib/docker";
import { decrypt } from "@/lib/session";
import { SessionPayload } from "@/types/auth";
import { getImageFromUser } from "@/lib/gameSession";
import { getSession, setSession } from "@/lib/sessionStore";

export async function POST(req: NextRequest) {


    try {
        const { image } = await req.json();
        const token = req.cookies.get("session")?.value

        if (token === undefined) {
            throw new Error("Unauthorized");
        }
        const decrypted : SessionPayload | string = await decrypt(token);
        if (typeof decrypted === 'string') {
            throw new Error("Unauthorized");
        }
        const username  = decrypted.username;
        const rep : DockerResponse = await stopContainer(image, username);
        return NextResponse.json({ success: rep.success }, { status: 200 });




    } catch (error: unknown) {
        console.error("Error starting container:", error);
        if (error instanceof Error) {
            return NextResponse.json({ success: false, message: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ success: false, message: "Error" }, { status: 500 });
        }
    }


}