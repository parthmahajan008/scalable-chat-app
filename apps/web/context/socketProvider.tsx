"use client";
import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";

interface ISocketContext {
  sendMessage: (msg: string) => any;
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error(`state is undefined`);

  return state;
};

export const SocketProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const sendMessage: ISocketContext["sendMessage"] = useCallback(
    (message: string) => {
      console.log("sending Message from client ---> ", message);
      if (socket) {
        socket.emit("event:message", { message });
      }
    },
    [socket]
  );
  useEffect(() => {
    const _socket = io("http://localhost:4000");
    setSocket(_socket);
    return () => {
      setSocket(null);
      _socket.disconnect();
    };
  }, []);
  return (
    <SocketContext.Provider value={{ sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};
