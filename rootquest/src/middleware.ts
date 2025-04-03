import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/session';
import { SessionPayload } from './types/auth';

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('session')?.value; // Récupère le token depuis les cookies
    console.log(token)

    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url)); // Redirection vers la page de login si pas de token
    }

    try {
        const payload: SessionPayload | string = await decrypt(token); // Vérifie la validité du token
        console.log(payload)
        if( typeof payload === 'string') {
            throw new Error("Invalid token");
        }
        return NextResponse.next(); // Autorise l'accès
    } catch (error) {
        return NextResponse.redirect(new URL('/login', req.url)); // Redirection si token invalide
    }
}

// Appliquer le middleware uniquement à certaines routes
export const config = {
    matcher: ['/duo', '/solo', '/'], // Applique le middleware aux pages sous /duo et /solo
};
