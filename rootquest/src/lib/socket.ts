import io from "socket.io-client";


const API_URL = "https://rootquest-dev-app.azurewebsites.net";
export const socket = io(API_URL, { transports: ["websocket", "polling"]});