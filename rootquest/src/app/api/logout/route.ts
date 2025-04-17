import { NextRequest, NextResponse } from "next/server";
import { deleteSession } from "@/lib/session";

<<<<<<< HEAD
export async function POST(req: NextRequest) {
    try {
        await deleteSession(); 
=======
export async function GET(req: NextRequest) {
    try {
        await deleteSession(); // Suppression de la session côté serveur
>>>>>>> origin/development-hugo

        return NextResponse.json({ success: true, message: "Logged out successfully" }, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ success: false, message: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ success: false, message: "Error logging out" }, { status: 500 });
        }
    }
}