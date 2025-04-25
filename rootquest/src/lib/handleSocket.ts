import { Socket } from "socket.io";
import { addPlayerToSession, getSession, setSession } from "./sessionStore.ts";

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

    socket.on('go', async (sessionId:string) => {
        socket.broadcast.emit('go', sessionId);
    });

    socket.on('flagsFound', async (sessionId:string, team:number) => {
        const session = await getSession(sessionId);
        console.log("session", team)
        if (session) {
            team === 1 ? session.team1Success = true : session.team2Success = true;
            await setSession(sessionId, session);
        }
        socket.broadcast.emit('flagsFound', sessionId, team);   
    }
    );
}