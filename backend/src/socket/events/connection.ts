import { Server, Socket } from "socket.io";
import chatEvents from "./chat.event";
import roomEvents from "./room.event";
import typingEvents from "./typing.event";

export function onConnection(io: Server, socket: Socket) {
  console.log(`Client connected: ${socket.id}`);

  //events
  roomEvents(io, socket);
  chatEvents(io, socket);
  typingEvents(io, socket);

  socket.on("disconnecting", () => {
    const { roomId, username } = socket.data;
    console.log(roomId, username);

    if (roomId && username) {
      socket.to(roomId).emit("user:left", { username });
    }
    const room = io.sockets.adapter.rooms.get(roomId);
    const count = room ? room.size - 1 : 0;

    io.to(roomId).emit("room:userCount", count);

    console.log(`Client disconnected: ${socket.id}`);
  });
}
