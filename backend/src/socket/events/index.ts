import { Server } from "socket.io";
import { onConnection } from "./connection";
export function registerEvents(io: Server) {
  io.on("connection", (socket) => {
    onConnection(io, socket);
  });
}
