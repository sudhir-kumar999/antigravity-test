import React, { useState, useEffect, useRef } from 'react';

const Chat = ({ socket, messages, gameState, isDrawer }) => {
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    socket.emit('send_message', input);
    setInput('');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-indigo-100 h-full flex flex-col overflow-hidden max-h-[800px]">
      <div className="bg-indigo-600 px-4 py-3 border-b">
        <h3 className="font-bold text-lg text-white">Chat & Guesses</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 flex flex-col">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 italic text-sm my-auto">
            No messages yet. Be the first to say hi!
          </div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className={`p-3 rounded-lg text-sm w-max max-w-full break-words ${msg.system ? 'bg-indigo-100 text-indigo-800 font-bold border border-indigo-200' : 'bg-white shadow-sm border border-gray-100'}`}>
            {!msg.system && <span className="font-bold text-indigo-600 mr-2">{msg.username}</span>}
            <span className={!msg.system ? 'text-gray-800 font-medium' : ''}>{msg.message}</span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={sendMessage} className="p-3 bg-white border-t border-gray-200">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isDrawer ? "You're drawing! You can't guess." : (gameState === 'PLAYING' ? "Type your guess here..." : "Chat with the room...")}
          disabled={isDrawer && gameState === 'PLAYING'}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed font-medium"
        />
      </form>
    </div>
  );
};

export default Chat;
