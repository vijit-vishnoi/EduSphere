import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

let socket: Socket | null = null;

export const connectSocket = (userId: number) => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("🟢 Socket connected:", socket?.id);
      socket?.emit("join", userId);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Socket disconnected");
    });
  }

  return socket;
};

export const getSocket = () => socket;
