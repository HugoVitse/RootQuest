import { NextRequest, NextResponse } from "next/server";
import { DockerData, DockerResponse } from "@/types/docker";
import { decrypt } from "@/lib/session";
import { SessionPayload } from "@/types/auth";
import { createGameSession } from "@/lib/gameSession";

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
        const sessionId = await createGameSession(image, username);

        return NextResponse.json({ success: true, sessionId :sessionId  }, { status: 200 });
      

    } catch (error: unknown) {
        console.error("Error creating session:", error);
        if (error instanceof Error) {
            return NextResponse.json({ success: false, message: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ success: false, message: "Error" }, { status: 500 });
        }
    }


}