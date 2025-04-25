import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import { SessionPayload } from "@/types/auth";
import { createGameSession } from "@/lib/gameSession";

export async function POST(req: NextRequest) {

    try {
        const body = await req.json();
        const image = body?.image;

        if (!image) {
            throw new Error("Image is required");
        }

        const token = req.cookies.get("session")?.value

        if (token === undefined) {
            throw new Error("Unauthorized");
        }

        const decrypted : SessionPayload = await decrypt(token);
        const username  = decrypted.username;
        const sessionId = await createGameSession(image, username);

        return NextResponse.json({ success: true, sessionId :sessionId  }, { status: 200 });
      

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ success: false, message: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ success: false, message: "Unknown error" }, { status: 500 });
        }
    }


}