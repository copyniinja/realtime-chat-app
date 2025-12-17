import { useRef } from "react";

type Message = {
  id: number;
  user: string;
  text: string;
  time: string;
  isMe: boolean;
};

export default function ChatPage({
  roomId,
  username,
}: {
  roomId: string;
  username: string;
}) {
  console.log(roomId, username);
  const messageRef = useRef<HTMLInputElement>(null);

  const messages: Message[] = [
    {
      id: 1,
      user: "Rahim",
      text: "Hey",
      time: "10:01 AM",
      isMe: false,
    },
    {
      id: 2,
      user: "You",
      text: "Wassupp? :V",
      time: "10:03 AM",
      isMe: true,
    },
    {
      id: 3,
      user: "Rahim",
      text: "hehe... :>",
      time: "10:03 AM",
      isMe: false,
    },
  ];

  const handleSend = () => {
    const text = messageRef.current?.value;
    if (!text) return;

    console.log(text);
    messageRef.current!.value = "";
  };

  return (
    <div className="min-h-screen  p-1 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="w-full max-w-3xl h-[85vh] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-b-gray-300 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800">
            Room: <span className="text-indigo-600">{roomId}</span>
          </h2>
          <p className="text-sm text-gray-500">Rahim is typing...</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gray-100">
          {messages.map((msg) => (
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
                  {msg.user}
                </div>
                <div className="text-sm">{msg.text}</div>
                <div className="text-[10px] mt-1 text-right opacity-70">
                  {msg.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-t-gray-300 bg-white flex gap-3">
          <input
            ref={messageRef}
            type="text"
            placeholder="Type a message..."
            className="flex-1 rounded-full border border-gray-300 px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
