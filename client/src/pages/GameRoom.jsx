import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Canvas from '../components/Canvas';
import Chat from '../components/Chat';
import Leaderboard from '../components/Leaderboard';
import Toolbar from '../components/Toolbar';

const GameRoom = ({ socket, username }) => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  
  const [roomData, setRoomData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [roundInfo, setRoundInfo] = useState({ wordLength: 0, timer: 0, word: null, isRoundOver: false });

  useEffect(() => {
    // Redirect if no username is set
    if (!username) {
      navigate('/');
      return;
    }

    // Join room
    socket.emit('join_room', { roomId, username });

    // Ensure socket listeners aren't stacked
    socket.off('room_data');
    socket.off('chat_message');
    socket.off('system_message');
    socket.off('round_start');
    socket.off('assigned_word');
    socket.off('timer_update');
    socket.off('round_end');

    // Attach Listeners
    socket.on('room_data', (data) => setRoomData(data));
    
    socket.on('chat_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on('system_message', (msg) => {
      setMessages((prev) => [...prev, { system: true, message: msg }]);
    });

    socket.on('round_start', ({ drawerId, wordLength, timer }) => {
      setRoundInfo({ wordLength, timer, word: null, isRoundOver: false });
    });

    socket.on('assigned_word', (word) => {
      setRoundInfo(prev => ({ ...prev, word }));
    });

    socket.on('timer_update', (time) => {
      setRoundInfo(prev => ({ ...prev, timer: time }));
    });

    socket.on('round_end', ({ word }) => {
      setRoundInfo(prev => ({ ...prev, word, isRoundOver: true }));
    });

    return () => {
      socket.off('room_data');
      socket.off('chat_message');
      socket.off('system_message');
      socket.off('round_start');
      socket.off('assigned_word');
      socket.off('timer_update');
      socket.off('round_end');
    };
  }, [roomId, username, navigate, socket]);

  const startGame = () => {
    socket.emit('start_game');
  };

  const handleClear = () => {
    socket.emit('clear_canvas');
  };

  if (!roomData) return <div className="min-h-screen flex items-center justify-center text-2xl font-bold bg-indigo-50">Loading Room...</div>;

  const isDrawer = roomData.currentDrawer === socket.id;
  const wordHint = Array(roundInfo.wordLength).fill('_ ').join('');

  return (
    <div className="min-h-screen flex flex-col p-4 font-sans gap-4">
      <div className="max-w-[1400px] mx-auto w-full flex-1 flex flex-col gap-4">
        
        {/* Top Header */}
        <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              Room: 
              <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg select-all border border-indigo-200">
                {roomId}
              </span>
            </h2>
            <p className="text-xs font-semibold text-indigo-500 mt-2 mb-1">Tell your friends to join with this Room ID!</p>
            <div className="mt-1">
              {roomData.gameState === 'LOBBY' ? (
                 <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full uppercase">Waiting to start</span>
              ) : (
                 <span className="text-sm font-bold text-red-600 bg-red-100 px-3 py-1 rounded-full uppercase animate-pulse inline-flex items-center gap-2">
                  <span className="text-lg">⏱️</span> {roundInfo.timer}s
                 </span>
              )}
            </div>
          </div>
          
          <div className="text-center flex-1">
            {roomData.gameState === 'PLAYING' && (
              <div className="text-3xl font-mono tracking-widest font-bold text-gray-800 bg-gray-100 py-2 rounded-lg inline-block px-8 border border-gray-200">
                {roundInfo.word ? roundInfo.word.toUpperCase() : wordHint}
              </div>
            )}
          </div>

          <div>
          {roomData.gameState === 'LOBBY' && roomData.players.length > 1 && (
            <button 
              onClick={startGame}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-transform transform hover:scale-105 active:scale-95"
            >
              Start Game
            </button>
          )}
          {roomData.gameState === 'LOBBY' && roomData.players.length <= 1 && (
            <div className="text-sm text-gray-500 font-medium italic px-4 py-2 bg-gray-50 rounded-lg">Waiting for players to join...</div>
          )}
          </div>
        </div>

        {/* Info Banner when round ends */}
        {roundInfo.isRoundOver && (
          <div className="bg-green-100 border border-green-300 text-green-800 rounded-xl p-4 text-center font-bold text-xl animate-bounce shadow-md">
            Round Over! The word was <span className="text-2xl uppercase tracking-wider">{roundInfo.word}</span>
          </div>
        )}

        {/* Main Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 flex-1">
          
          {/* Left: Leaderboard */}
          <div className="lg:col-span-1 min-h-[400px]">
            <Leaderboard players={roomData.players} currentDrawer={roomData.currentDrawer} />
          </div>

          {/* Center: Canvas & Tools */}
          <div className="lg:col-span-2 flex flex-col items-center">
            <Canvas 
              socket={socket} 
              isDrawer={isDrawer} 
              currentDrawer={roomData.players.find(p => p.socketId === roomData.currentDrawer)?.username}
              color={color}
              brushSize={brushSize}
            />
            {isDrawer && (
              <div className="mt-4 w-full flex justify-center">
                 <Toolbar 
                    color={color} 
                    setColor={setColor} 
                    brushSize={brushSize} 
                    setBrushSize={setBrushSize} 
                    onClear={handleClear} 
                 />
              </div>
            )}
          </div>

          {/* Right: Chat */}
          <div className="lg:col-span-1 min-h-[400px]">
            <Chat socket={socket} messages={messages} gameState={roomData.gameState} isDrawer={isDrawer} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default GameRoom;
