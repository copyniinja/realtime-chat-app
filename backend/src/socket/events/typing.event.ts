import { Server, Socket } from "socket.io";

export default function typingEvents(io: Server, socket: Socket) {
  socket.on("typing:start", (payload) => {
    socket.to(payload.roomId).emit("typing:start", payload.username);
  });

  socket.on("typing:stop", (payload) => {
    socket.to(payload.roomId).emit("typing:stop", payload.username);
  });
}
