import { NextRequest, NextResponse } from "next/server";
import login  from '../../lib/login';
import { AuthResponse, LoginData } from "@/app/types/auth";
import { createSession } from "@/app/lib/session";


export async function POST(req: NextRequest) {
    try {
        const { username, password } : LoginData = await req.json();
        const rep : AuthResponse = await login(username, password);
        
        if( rep.success) {
            await createSession(username)
            return NextResponse.json({ success: true }, { status: 200 });
        }
        else {
            throw new Error(rep.message);
        }

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ success: false, message: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ success: false, message: "Error" }, { status: 500 });
        }
    }
}