import { Server } from "socket.io";

export function emitUserCount(io: Server, roomId: string) {
  const room = io.sockets.adapter.rooms.get(roomId);
  const count = room ? room.size : 0;

  io.to(roomId).emit("room:userCount", count);
}
