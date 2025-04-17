import { Socket } from "socket.io";
import { addPlayerToSession, setSession , getAllSessions, getSession} from "./sessionStore.ts";

export async function handleSocket(socket : Socket<any>) {
    socket.on('join', async (sessionId:any, username: string) => {
        console.log(`user joined session ${sessionId}`);
        const hasBeenAdded = await addPlayerToSession(sessionId, username);
        if(hasBeenAdded) {
            socket.broadcast.emit('joiners', username);
        }
    });

    socket.on('playerRequest', async (sessionId:string) => {
        const session = await getSession(sessionId);
        if(session) {
            socket.emit('playerList', session.players);
        }
    })

    socket.on('teamsRequest', async (sessionId:string) => {
        const session = await getSession(sessionId);
        if(session) {
            socket.emit('updateTeam', sessionId, session.team1, session.team2);
        }
    })

    socket.on('disconnect', () => {

        
    });

    socket.on('updateTeam', async (sessionId: string ,team1:string[], team2:string[]) => {
        const session = await getSession(sessionId);   
        if (session && session.launched === false) {
            session.team1 = team1;
            session.team2 = team2;
            await setSession(sessionId, session);
        }
        socket.broadcast.emit('updateTeam', sessionId, team1, team2);   
    });

    socket.on('message', async (sessionId: string, message: string, sender: string) => {
        const session = await getSession(sessionId);
        console.log("ok", session)
        if (session) {
            session.messages.push({message, sender});
            await setSession(sessionId, session);
        }
        socket.broadcast.emit('message', session?.messages);   
        }
    );

    socket.on('messageRequest', async (sessionId:string) => {
        const session = await getSession(sessionId);
        if (session) {
            socket.emit('message', session.messages);
        }
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
    setSession(sessionId, { host:username, image, players: [username] , team1: [username], team2: [], messages: [], launched: false });
    return sessionId;
}

export async function isGameLaunched(sessionId: string) {
    const session = await getSession(sessionId);
    if (session) {
        return session.launched;
    }
    return false;
}

export async function isGameExists(sessionId: string) {
    const session = await getSession(sessionId);
    console.log(session)
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
    
