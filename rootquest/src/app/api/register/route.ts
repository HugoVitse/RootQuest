import { NextRequest, NextResponse } from "next/server";
import signUp  from '../../../lib/signUp';
import { AuthResponse, SignUpData } from "@/types/auth";
import { createSession } from "@/lib/session";


export async function POST(req: NextRequest) {
    try {
        const { username, password, email } : SignUpData = await req.json();
        const rep : AuthResponse = await signUp(username, password, email);
        
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