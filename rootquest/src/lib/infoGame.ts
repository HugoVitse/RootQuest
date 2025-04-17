import axios from "axios";

export async function isGameExists(sessionId: string) {    try {
        const response = await axios.post("/api/gameExists", { sessionId });
        console.log(response.data);
        return response.data.exists;
    } catch (error) {
        console.error("Error checking game existence:", error);
        return false;
    }
}

export async function isGameLaunched(sessionId: string) {    
    try {
        const response = await axios.post("/api/gameLaunched", { sessionId });
        console.log(response.data);
        return response.data.launched;
    } catch (error) {
        console.error("Error checking game existence:", error);
        return false;
    }
}
