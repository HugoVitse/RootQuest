import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/app/lib/session";
import path from "path";
import fs from 'fs/promises';
import { vpnResponse } from "@/app/types/vpn";
import { createVpnClient } from "@/app/lib/vpnClient";

export async function POST(req: NextRequest) {


    try {
        const token = req.cookies.get("session")?.value

        if (token === undefined) {
            throw new Error("Unauthorized");
        }
        const decrypted = await decrypt(token);
        console.log(decrypted);
        if (typeof decrypted === 'string') {
            throw new Error("Unauthorized");
        }
        const username : string  = decrypted.username;
        const rep : vpnResponse = await createVpnClient(username);
        
        if( rep) {
            const filePath = path.join("/home/hugo/RootQuest", 'userProfiles', `${username}.ovpn`);
            const fileBuffer = await fs.readFile(filePath);

            const response = new NextResponse(fileBuffer, {
                headers: {
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': `attachment; filename="${username}.ovpn"`,
                },
            });

            return response;
        }
        else {
            throw new Error("Error");
        }

    } catch (error: unknown) {   
        console.log(error);
        return NextResponse.json({ running: false }, { status: 500 });
       
    }


}