# Real-Time Chat App

A real-time chat application built entirely with **TypeScript** on both frontend and backend. Users can join rooms, chat instantly, see who is typing, and get notified when users join or leave a room.

---

## Features

- **Instant messaging** – messages are sent and received in real-time.
- **Typing indicators** – shows who is typing instantly.
- **Join/Leave notifications** – system messages appear when users join or leave.
- **Unique usernames** – avoids conflicts if multiple users pick the same name.
- **Responsive design** – works on both desktop and mobile.

---

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Socket.IO client
- **Backend:** Node.js, TypeScript, Express, Socket.IO
- **Realtime communication:** WebSockets via Socket.IO

---

## Project Structure

```
realtime-chat-app/
├─ backend/
│  ├─ .env
│  ├─ .gitignore
│  ├─ nodemon.json
│  ├─ package.json
│  ├─ tsconfig.json
│  └─ src/
│     ├─ app.ts
│     ├─ index.ts
│     ├─ config/
│     │  └─ index.ts
│     └─ socket/
│        ├─ index.ts
│        ├─ Socket.md
│        └─ events/
│           ├─ chat.event.ts
│           ├─ connection.ts
│           ├─ index.ts
│           ├─ room.event.ts
│           └─ typing.event.ts
├─ frontend/
│  ├─ .gitignore
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package.json
│  ├─ README.md
│  ├─ tsconfig.app.json
│  ├─ tsconfig.json
│  ├─ tsconfig.node.json
│  ├─ vite.config.ts
│  ├─ public/
│  └─ src/
│     ├─ App.tsx
│     ├─ index.css
│     ├─ main.tsx
│     ├─ assets/
│     ├─ pages/
│     │  ├─ ChatPage.tsx
│     │  └─ Homepage.tsx
│     └─ utils/
│        ├─ formatTime.ts
│        └─ generateUsername.ts
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/copyniinja/realtime-chat-app.git
cd realtime-chat-app
```

### 2. Install dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 3. Run the app

```bash
# Backend (development)
npm run start:dev

# Frontend (development)
cd ../frontend
npm run dev
```

- Backend runs on `http://localhost:3000`
- Frontend runs on `http://localhost:5173`

---

## Usage

1. Open the app in your browser.
2. Enter a **username** and **room ID**.
3. Click **Join Room**.
4. Start chatting instantly!
5. See typing indicators and system messages when users join or leave.
6. Use the **Leave Room** button to exit the chat safely.
