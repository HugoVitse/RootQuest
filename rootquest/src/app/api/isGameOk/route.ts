import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import { Session } from "@/types/gameSession";
import { getSession } from "@/lib/sessionStore";

export async function POST(req: NextRequest) {

    try {
        const token = req.cookies.get("session")?.value
        const { id } = await req.json();
        if (token === undefined) {
            throw new Error("Unauthorized");
        }
        const decrypted = await decrypt(token);
        if (typeof decrypted === 'string') {
            throw new Error("Unauthorized");
        }
        const username = decrypted.username;
        const session : Session | undefined  = await getSession(id)
        const ok = session !== undefined && (session.players.includes(username));
        const team = session?.team1.includes(username) ? 1 : 2;
        const launched = session?.launched;
        return NextResponse.json({ ok: ok, team:team, launched:launched }, { status: 200 });

    } catch (error: unknown) {   
        console.log(error);
        return NextResponse.json({ exists: false }, { status: 500 });
       
    }


}