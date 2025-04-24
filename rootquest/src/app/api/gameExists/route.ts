import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import { isGameExists } from "@/lib/gameSession";

export async function POST(req: NextRequest) {

    try {
        const body = await req.json();

        const sessionId = body?.sessionId;
        if (!sessionId) {
            throw new Error("Session ID is required" );
        }

        const token = req.cookies.get("session")?.value
        if (token === undefined) {
            throw new Error("Unauthorized");
        }
        await decrypt(token);

        const exists = await isGameExists(sessionId);

        return NextResponse.json({ exists: exists }, { status: 200 });

    } catch (error: unknown) {  
        if (error instanceof Error) {
            return NextResponse.json({ success: false, message: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ success: false, message: "Unknown error" }, { status: 500 });
        }       
    }


}