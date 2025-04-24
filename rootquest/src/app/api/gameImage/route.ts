import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import { Session } from "@/types/gameSession";
import { getSession } from "@/lib/sessionStore";
import { getImageFromUser } from "@/lib/gameSession";

export async function POST(req: NextRequest) {

    try {
        const { sessionId } = await req.json();

        const token = req.cookies.get("session")?.value
        if (token === undefined) {
            throw new Error("Unauthorized");
        }

        const decrypted = await decrypt(token);
        const username = decrypted.username;
        
        const image = getImageFromUser(sessionId, username);
        return NextResponse.json({ success:true,  image: image }, { status: 200 });

    } catch (error: unknown) {   
        if (error instanceof Error) {
            return NextResponse.json({ success: false, message: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ success: false, message: "Unknown error" }, { status: 500 });
        }         
    }


}