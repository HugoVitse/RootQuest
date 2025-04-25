import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import { isGameLaunched } from "@/lib/gameSession";

export async function POST(req: NextRequest) {

    try {
        const body = await req.json();

        const sessionId = body?.sessionId;
        if (!sessionId) {
            throw new Error("Session ID is required");
        }

        const token = req.cookies.get("session")?.value
        if (token === undefined) {
            throw new Error("Unauthorized");
        }
        
        const decrypted = await decrypt(token);
        const username = decrypted.username;


        const launched = await isGameLaunched(sessionId, username);
        return NextResponse.json({ success:true, launched: launched.launched, ip : launched.ip, host:launched.host }, { status: 200 });

    } catch (error: unknown) {  
        if (error instanceof Error) {
            return NextResponse.json({ success: false, message: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ success: false, message: "Unknown error" }, { status: 500 });
        }         
    }


}