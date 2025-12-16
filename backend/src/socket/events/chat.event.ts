import { Server, Socket } from "socket.io";

export default function chatEvents(io: Server, socket: Socket) {
  socket.on("chat:send", (payload) => {
    console.log(payload);
    // Emit the event with massage data
    socket.to(payload.roomId).emit("chat:receive", payload);
  });
}
