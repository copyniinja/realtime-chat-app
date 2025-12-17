import { useState } from "react";
import ChatPage from "./pages/ChatPage";
import Homepage from "./pages/Homepage";

function App() {
  const [joined, isJoined] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleRoomIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(e.target.value);
  };

  const handleJoin = () => {
    if (roomId === "" || username === "") {
      alert("RoomId or Username can not be empty");
      return;
    }

    console.log({ roomId, username });
    isJoined(true);
  };

  return (
    <>
      <div className="">
        {/*  Page */}
        {joined || (
          <Homepage
            roomId={roomId}
            username={username}
            onUsernameChange={handleUsernameChange}
            onRoomIdChange={handleRoomIdChange}
            onJoin={handleJoin}
          />
        )}
        {joined && <ChatPage roomId={roomId} username={username} />}
      </div>
    </>
  );
}

export default App;
