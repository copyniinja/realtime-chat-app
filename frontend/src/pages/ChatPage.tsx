import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { formatTime } from "../utils/formatTime";

type Message = {
  id: string;
  text: string;
  time: string;
  type: "chat" | "system";
  user?: string;
  isMe?: boolean;
};

const socket = io("http://localhost:3000");

export default function ChatPage({
  roomId,
  username,
}: {
  roomId: string;
  username: string;
}) {
  const messageRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const typingTimeout = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    socket.emit("room:join", { roomId, username });

    // someone joined
    socket.on("user:joined", ({ username: joinedUser }) => {
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          text: `${joinedUser} joined the room`,
          time: formatTime(),
          type: "system",
        },
      ]);
    });

    // receive chat message
    socket.on("chat:receive", (payload: Message) => {
      setMessages((m) => [
        ...m,
        {
          ...payload,
          isMe: false,
          type: "chat",
        },
      ]);
    });

    // typing start
    socket.on("typing:start", (user: string) => {
      if (user === username) return;

      setTypingUsers((users) => {
        const newUsers = new Set(users);
        newUsers.add(user);
        return newUsers;
      });
    });

    // typing stop
    socket.on("typing:stop", (user: string) => {
      setTypingUsers((users) => {
        const newUsers = new Set(users);
        newUsers.delete(user);
        return newUsers;
      });
    });

    // user left
    socket.on("user:left", ({ username: leftUser }) => {
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          text: `${leftUser} left the room`,
          time: formatTime(),
          type: "system",
        },
      ]);

      //remove from typing list
      setTypingUsers((users) => {
        const updated = new Set(users);
        updated.delete(leftUser);
        return updated;
      });
    });

    return () => {
      socket.emit("room:leave", { roomId, username });
      socket.off("user:joined");
      socket.off("user:left");
      socket.off("chat:receive");
      socket.off("typing:start");
      socket.off("typing:stop");
    };
  }, [roomId, username]);

  const handleSend = () => {
    const text = messageRef.current?.value;
    if (!text) return;

    messageRef.current!.value = "";

    const newMessage: Message = {
      id: crypto.randomUUID(),
      text,
      time: formatTime(),
      user: username,
      isMe: true,
      type: "chat",
    };

    socket.emit("chat:send", { roomId, newMessage });
    setMessages((m) => [...m, newMessage]);
  };

  const handleTyping = () => {
    socket.emit("typing:start", { roomId, username });
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }
    typingTimeout.current = setTimeout(() => {
      socket.emit("typing:stop", { roomId, username });
    }, 1000);
  };

  const handleLeaveRoom = () => {
    socket.emit("room:leave", { roomId, username });

    setMessages([]);
    setTypingUsers(new Set());

    window.location.href = "/";
  };

  return (
    <div className="min-h-screen p-1 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="w-full max-w-3xl h-[85vh] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-300 bg-gray-50">
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              Room: <span className="text-indigo-600">{roomId}</span>
            </h2>
            <button
              onClick={handleLeaveRoom}
              className="bg-red-500 text-white px-3 py-1  text-xs rounded-xl hover:bg-red-600"
            >
              Leave
            </button>
          </div>
          {typingUsers.size > 0 && (
            <div className="  text-xs text-gray-500 italic">
              {[...typingUsers].join(", ")}{" "}
              {typingUsers.size === 1 ? "is" : "are"} typing...
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gray-100">
          {messages.map((msg) =>
            msg.type === "system" ? (
              <div key={msg.id} className="flex justify-center">
                <span className="text-xs text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
                  {msg.text}
                </span>
              </div>
            ) : (
              <div
                key={msg.id}
                className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2 shadow
                      ${
                        msg.isMe
                          ? "bg-indigo-600 text-white rounded-br-none"
                          : "bg-white text-gray-800 rounded-bl-none"
                      }`}
                >
                  <div className="text-xs font-semibold mb-1 opacity-80">
                    {msg.isMe ? "You" : msg.user}
                  </div>
                  <div className="text-sm">{msg.text}</div>
                  <div className="text-[10px] mt-1 text-right opacity-70">
                    {msg.time}
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-300 bg-white flex gap-3">
          <input
            ref={messageRef}
            type="text"
            placeholder="Type a message..."
            className="flex-1 rounded-full border border-gray-300 px-4 py-2
                        focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onInput={handleTyping}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-indigo-600 text-white px-6 py-2 rounded-full
                        hover:bg-indigo-700 transition font-medium"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
