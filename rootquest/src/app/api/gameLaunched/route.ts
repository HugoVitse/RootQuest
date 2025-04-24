import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import { Session } from "@/types/gameSession";
import { getSession } from "@/lib/sessionStore";

import { exec } from "child_process";
import util from "util";

const execPromise = util.promisify(exec);

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


        const session : Session | undefined  = await getSession(sessionId)
        if (!session) {
            throw new Error("Session not found");
        }
        
        const launched = session ? session.launched : false;

        if (launched) {
            const team = session.team1.includes(username) ? 1 : session.team2.includes(username) ? 2 : undefined;
            const image = `${session.image}${team}_${username}`;
            const commandInfo  = `docker exec ${image} ip -4 addr show eth0 | grep -oP 'inet \\K[\\d.]+'`;
            const { stdout: stdout1, stderr: stderr1 } = await execPromise(commandInfo);

            if (stderr1) {
                throw new Error(stderr1);
            }
            const ip = stdout1.trim();
            return NextResponse.json({ launched: launched, ip : ip, host:session.host }, { status: 200 });
        }
        return NextResponse.json({ launched: launched, host : session.host }, { status: 200 });

    } catch (error: unknown) {   
        console.log(error);
        return NextResponse.json({ launched: false }, { status: 500 });
       
    }


}