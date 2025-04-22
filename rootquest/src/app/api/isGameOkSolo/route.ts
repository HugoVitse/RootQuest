import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import { Session } from "@/types/gameSession";
import { getSession } from "@/lib/sessionStore";
import { startContainer } from "@/lib/docker";

export async function POST(req: NextRequest) {

    try {
        const token = req.cookies.get("session")?.value
        const { image } = await req.json();
        if (token === undefined) {
            throw new Error("Unauthorized");
        }
        const decrypted = await decrypt(token);
        if (typeof decrypted === 'string') {
            throw new Error("Unauthorized");
        }
        const username = decrypted.username;
        const ok = await startContainer(image, username);
        return NextResponse.json({ ok: ok.success, ip: ok.ip , nbflags: ok.nbflags}, { status: 200 });

    } catch (error: unknown) {   
        console.log(error);
        return NextResponse.json({ exists: false }, { status: 500 });
       
    }


}