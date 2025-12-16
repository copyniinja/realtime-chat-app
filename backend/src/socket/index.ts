import http from "http";
import { Server } from "socket.io";

let io: Server;

export function initSocket(server: http.Server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  return io;
}

export function getIO() {
  if (!io) {
    throw new Error("SocketIO not initialized.");
  }
  return io;
}
