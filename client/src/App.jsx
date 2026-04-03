import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { io } from 'socket.io-client';
import Home from './pages/Home';
import GameRoom from './pages/GameRoom';

// Connect to the backend socket
const socket = io('http://localhost:3001');

function App() {
  const [username, setUsername] = useState('');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home setUsername={setUsername} username={username} />} />
        <Route path="/room/:roomId" element={<GameRoom socket={socket} username={username} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
