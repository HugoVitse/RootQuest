import { Socket } from "socket.io";
import { addPlayerToSession, setSession , getAllSessions} from "./sessionStore.ts";

export async function handleSocket(socket : Socket<any>) {
    socket.on('join', (sessionId:any, username: string) => {
        console.log(`user joined session ${sessionId}`);
        addPlayerToSession(sessionId, username);
        console.log(getAllSessions())
        socket.broadcast.emit('joiners', username);
    });
}

export async function createGameSession(image: string, username: string) {

    let sessions = await getAllSessions();
    const existingSession = Object.values(sessions).find(
        (session) => session.host === username && session.image === image
    );

    if (existingSession) {
        throw new Error("Session already exists");
    }


    const sessionId = Math.random().toString(36).substring(2, 15);
    setSession(sessionId, { host:username, image, players: [] });
    return sessionId;
}




