export default function Homepage({
  roomId,
  username,
  onUsernameChange,
  onRoomIdChange,
  onJoin,
}: {
  roomId: string;
  username: string;
  onUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRoomIdChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onJoin: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Join a Chat Room
        </h1>
        <p className="text-center text-gray-500 mt-2">
          Enter your name and room ID
        </p>

        {/* Form */}
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Username
            </label>
            <input
              value={username}
              onChange={onUsernameChange}
              type="text"
              placeholder="Enter your name"
              className="w-full rounded-lg border border-gray-300 px-4 py-2
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Room ID
            </label>
            <input
              value={roomId}
              onChange={onRoomIdChange}
              type="text"
              placeholder="e.g. room-123"
              className="w-full rounded-lg border border-gray-300 px-4 py-2
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Button */}
          <button
            onClick={onJoin}
            className="w-full mt-4 bg-indigo-600 text-white font-semibold
                       py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}
