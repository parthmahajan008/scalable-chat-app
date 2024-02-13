import http from "http";
import SocketService from "./services/socket";

async function initServer() {
  const socketService = new SocketService();
  const httpServer = http.createServer();
  const PORT = process.env.PORT ? process.env.PORT : 4000;

  socketService.io.attach(httpServer);

  httpServer.listen(PORT, () => {
    console.log(`Web Server started at ${PORT}`);
  });
}

initServer();
