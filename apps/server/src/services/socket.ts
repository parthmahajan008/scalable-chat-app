import { Server } from "socket.io";

class SocketService {
  private _io: Server;
  constructor() {
    console.log("initialising Socket Service ...");
    this._io = new Server();
  }

  get io(): Server {
    return this._io;
  }

  public initialiseListeners() {
    const io: Server = this.io;
    console.log("initialise socket listeners....");
    io.on("connect", (socket: any) => {
      console.log("New Socket Connected", socket.id);

      socket.on("event:message", async ({ message }: { message: String }) => {
        console.log("New Message Rec", { message });
      });
    });
  }
}

export default SocketService;
