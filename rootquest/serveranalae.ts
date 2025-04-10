import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { addPlayerToSession } from "./src/lib/gameSession";


const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on('join', (sessionId) => {
        console.log(`user joined session ${sessionId}`);
        addPlayerToSession(sessionId, socket.id);
        socket.broadcast.emit('ok');
    })

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
  });


  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});