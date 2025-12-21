import { Server, Socket } from "socket.io";
import { emitUserCount } from "../emitUserCount";

export default function roomEvents(io: Server, socket: Socket) {
  // Join room
  socket.on("room:join", (payload) => {
    // Save the data
    socket.data.roomId = payload.roomId;
    socket.data.username = payload.username;

    //
    socket.join(payload.roomId);

    // Emit total users count
    emitUserCount(io, payload.roomId);
    const room = io.sockets.adapter.rooms.get(payload.roomId);
    socket.emit("room:userCount", room ? room.size : 1);

    // Emit an event to added user
    socket.emit("room:joined", payload.roomId);
    // Emit an event to all group users except the joining user
    socket
      .to(payload.roomId)
      .emit("user:joined", { username: payload.username });
  });

  // Leave room
  socket.on("room:leave", ({ roomId, username }) => {
    socket.leave(roomId);

    socket.to(roomId).emit("user:left", { username });

    emitUserCount(io, roomId);
  });
}
