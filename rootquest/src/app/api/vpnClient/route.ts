import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import path from "path";
import fs from 'fs/promises';
import { vpnResponse } from "@/types/vpn";
import { createVpnClient } from "@/lib/vpnClient";

export async function GET(req: NextRequest) {


    try {
        const token = req.cookies.get("session")?.value
        const PATH = process.env.APP_PATH  || '';
        console.log(PATH);

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
            const filePath = path.join(PATH, 'userProfiles', `${username}.ovpn`);
            const fileBuffer = await fs.readFile(filePath);

            const response = new NextResponse(fileBuffer, {
                headers: {
                    'Content-Type': 'application/octet-stream',
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