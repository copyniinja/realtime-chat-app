import { Server, Socket } from "socket.io";

export default function roomEvents(io: Server, socket: Socket) {
  // Join room
  socket.on("room:join", (payload) => {
    // Verify that user belongs to this room

    //
    socket.join(payload.roomId);

    // Emit an event to added user
    socket.emit("room:joined", payload.roomId);
    // Emit an event to all group users except the joining user
    socket
      .to(payload.roomId)
      .emit("user:joined", { username: payload.username });
  });

  // Leave room
  socket.on("room:leave", (payload) => {
    socket.leave(payload.roomId);

    // Emit an event to left user
    socket.emit("room:left", payload.roomId);

    // Emit an event to all other group users excepts left user
    socket.to(payload.roomId).emit("user:left", {
      userId: socket.data.user.id,
    });
  });
}
