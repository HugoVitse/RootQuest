import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { handleSocket } from "./src/lib/handleSocket.ts";

import path from 'path';
import dotenv from 'dotenv'
import { initStore } from './src/lib/sessionStore.ts';
const dev = process.env.NODE_ENV !== "production";
const hostname = "0.0.0.0";
const port = parseInt(process.env.PORT || "3000", 10);
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();
//test

const projectDir =  path.resolve(process.cwd(), '../')
dotenv.config({ path: `${projectDir}/.env` })

initStore(); 
//clearStore();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", handleSocket)

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});