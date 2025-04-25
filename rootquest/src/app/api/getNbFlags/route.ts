import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import { SessionPayload } from "@/types/auth";
import { getNbFlags } from "@/lib/getImages";

export async function POST(req: NextRequest) {


    try {
        const body = await req.json();
        if (!body.sessionId) {
            throw new Error("Missing sessionId");
        }
        const sessionId  = body.sessionId;

        const token = req.cookies.get("session")?.value
        if (token === undefined) {
            throw new Error("Unauthorized");
        }

        const decrypted : SessionPayload = await decrypt(token);
        const username  = decrypted.username;
        const rep : number = await getNbFlags(sessionId, username)

        return NextResponse.json(rep, { status: 200 });
        
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 401 });
        } else {
            return NextResponse.json({ message: "Error" }, { status: 500 });
        }
    }
 


}