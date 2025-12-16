|                              |                                  |
| ---------------------------- | -------------------------------- |
| `socket.emit(...)`           | Only me                          |
| `socket.to(room).emit(...)`  | Everyone in room except me       |
| `io.to(room).emit(...)`      | Everyone in room including me    |
| `socket.broadcast.emit(...)` | Everyone except me (all sockets) |
