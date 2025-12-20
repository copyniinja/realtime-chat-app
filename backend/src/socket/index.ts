import http from "http";
import { Server } from "socket.io";
import { registerEvents } from "./events";

let io: Server;

export function initSocket(server: http.Server) {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST"],
    },
  });

  // Register socket event handlers
  registerEvents(io);

  return io;
}

export function getIO() {
  if (!io) {
    throw new Error("SocketIO not initialized.");
  }
  return io;
}
