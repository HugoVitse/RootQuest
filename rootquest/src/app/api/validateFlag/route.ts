import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import validateFlag from "@/lib/flag";

export async function POST(req: NextRequest) {


    try {
        const token = req.cookies.get("session")?.value
        const {flag, image, flag_number}  = await req.json();

        if (token === undefined) {
            throw new Error("Unauthorized");
        }
        const decrypted = await decrypt(token);
        if (typeof decrypted === 'string') {
            throw new Error("Unauthorized");
        }
        const username : string  = decrypted.username;
        const response = await validateFlag(username, flag, image, flag_number)
        return NextResponse.json(response, { status: 200 });

    } catch (error: unknown) {   
        console.log(error);
        return NextResponse.json({ running: false }, { status: 500 });
       
    }


}