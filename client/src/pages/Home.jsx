import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Palette } from 'lucide-react';

const Home = ({ username, setUsername }) => {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const handleJoin = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      alert("Please enter a username!");
      return;
    }
    // Generate a random 6-character room ID if not provided
    const targetRoom = roomId.trim() || Math.random().toString(36).substring(2, 8).toUpperCase();
    navigate(`/room/${targetRoom}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-indigo-100 p-8 transform transition-all">
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-600 p-4 rounded-full shadow-lg shadow-indigo-600/30">
            <Palette className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-2 tracking-tight">Skribbl Clone</h1>
        <p className="text-center text-gray-500 mb-8 font-medium">Draw, guess, and win!</p>
        
        <form onSubmit={handleJoin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-indigo-100 focus:border-indigo-500 focus:ring-0 transition-colors text-lg font-medium"
              placeholder="Enter your name..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Room ID <span className="text-gray-400 font-normal">(Leave blank to create a new room)</span></label>
            <input 
              type="text" 
              value={roomId}
              onChange={(e) => setRoomId(e.target.value.toUpperCase())}
              className="w-full px-4 py-3 rounded-lg border-2 border-indigo-100 focus:border-indigo-500 focus:ring-0 transition-colors text-lg font-medium uppercase placeholder:normal-case placeholder:font-normal"
              placeholder="Enter Room ID to join a friend..."
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-1 transition-all text-lg"
          >
            Play Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
