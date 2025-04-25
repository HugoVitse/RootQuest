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

        await decrypt(token);

        const rep : ImageResponse = await getImages(true, false);
        
        if( rep.images === undefined) {
            throw new Error("No images found");
        }
        return NextResponse.json({success:true, ...rep}, { status: 200 });
        
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ success: false, message: error.message }, { status: 401 });
        } else {
            return NextResponse.json({ success: false, message: "Error" }, { status: 500 });
        }
    }
 


}