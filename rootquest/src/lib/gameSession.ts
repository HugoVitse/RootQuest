import { setSession , getAllSessions, getSession} from "./sessionStore.ts";
import { getContainerIp } from "./docker.ts";
import { GameLaunchedResponse } from "@/types/docker.ts";


export async function createGameSession(image: string, username: string) {

    let sessions = await getAllSessions();

    const existingSession = Object.values(sessions).find(
        (session) => session.host === username && session.image === image
    );

    if (existingSession) {
        throw new Error("Session already exists");
    }

    const sessionId = Math.random().toString(36).substring(2, 15);
    setSession(sessionId, { host:username, image, players: [username] , team1: [username], team2: [], messages: [], launched: false , team1Success: false, team2Success: false });
    
    return sessionId;
}

export async function isGameLaunched(sessionId: string, username: string) : Promise<GameLaunchedResponse> {
    const session = await getSession(sessionId);

    if(!session) {
        throw new Error("Session not found");
    }

    const team = session.team1.includes(username) ? 1 : session.team2.includes(username) ? 2 : undefined;
    const image = `${session.image}${team}_${username}`;
    
    if (!session.launched) {
        return {
            ip: "",
            host: session.host,
            launched: session.launched
        }
    }

    const ipResp = await getContainerIp(image);

    return {
        ip: ipResp.ip,
        host: session.host,
        launched: session.launched
    }

}

export async function isGameExists(sessionId: string) : Promise<boolean> {
    const session = await getSession(sessionId);
    if (session) {
        return true;
    }
    return false;
}

export async function launchGame(sessionId: string) {
    const session = await getSession(sessionId);
    if (session) {
        session.launched = true;
        await setSession(sessionId, session);
    }
    
}


export async function getImageFromUser(sessionId : string, username: string) {
    const session = await getSession(sessionId);
    if (session) {
        const team = session.team1.includes(username) ? "1" : "2";
        return session.image + team;
    }
    return null;
}
    