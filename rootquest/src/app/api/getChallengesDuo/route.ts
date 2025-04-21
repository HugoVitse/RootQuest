import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import { SessionPayload } from "@/types/auth";
import { ImageResponse } from "@/types/image";
import { getImages } from "@/lib/getImages";

export async function GET(req: NextRequest) {


    try {
        const token = req.cookies.get("session")?.value

        if (token === undefined) {
            throw new Error("Unauthorized");
        }
        const decrypted : SessionPayload | string = await decrypt(token);
        if (typeof decrypted === 'string') {
            throw new Error("Unauthorized");
        }
        
        const rep : ImageResponse = await getImages(true, false);
        
        if( rep.images === undefined) {
            return NextResponse.json({ message: "No images found" }, { status: 404 });
        }
        return NextResponse.json(rep, { status: 200 });
        
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 401 });
        } else {
            return NextResponse.json({ message: "Error" }, { status: 500 });
        }
    }
 


}