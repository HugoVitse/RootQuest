import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import { Session } from "@/types/gameSession";
import { getSession } from "@/lib/sessionStore";

export async function POST(req: NextRequest) {

    try {
        const token = req.cookies.get("session")?.value
        const { sessionId } = await req.json();
        if (token === undefined) {
            throw new Error("Unauthorized");
        }
        const decrypted = await decrypt(token);
        if (typeof decrypted === 'string') {
            throw new Error("Unauthorized");
        }
        const session : Session | undefined  = await getSession(sessionId)
        console.log(session,sessionId)
        const launched = session ? session.launched : false;
        return NextResponse.json({ launched: launched }, { status: 200 });

    } catch (error: unknown) {   
        console.log(error);
        return NextResponse.json({ launched: false }, { status: 500 });
       
    }


}