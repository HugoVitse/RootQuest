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
        const username = decrypted.username;
        
        const session : Session | undefined  = await getSession(sessionId)
        const team = session?.team1.includes(username) ? 1 : session?.team2.includes(username) ? 2 : undefined;
        const image = session ? `${session.image}${team}` : "";
        return NextResponse.json({ image: image }, { status: 200 });

    } catch (error: unknown) {   
        console.log(error);
        return NextResponse.json({ image: false }, { status: 500 });
       
    }


}