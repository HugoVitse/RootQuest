import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import { fetchUserData } from "@/lib/infoClientServer";

export async function POST(req: NextRequest) {


    try {
        const token = req.cookies.get("session")?.value
        const PATH = process.env.PATH;

        if (token === undefined) {
            throw new Error("Unauthorized");
        }
        const decrypted = await decrypt(token);
        if (typeof decrypted === 'string') {
            throw new Error("Unauthorized");
        }
        const username : string  = decrypted.username;
        const data = await fetchUserData(username);
        console.log(data)
        return NextResponse.json({ username: username, points: data.points, nb_flags : data.nb_flags, rank: data.rank  }, { status: 200 });

    } catch (error: unknown) {   
        console.log(error);
        return NextResponse.json({ running: false }, { status: 500 });
       
    }


}