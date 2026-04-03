import React from 'react';

const Leaderboard = ({ players, currentDrawer }) => {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-indigo-100 h-full flex flex-col overflow-hidden">
      <div className="bg-indigo-600 px-4 py-3 border-b flex justify-between items-center">
        <h3 className="font-bold text-lg text-white">Leaderboard</h3>
        <span className="bg-indigo-500 text-white text-xs font-bold px-2 py-1 rounded-full">{players.length} Players</span>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
        {sortedPlayers.map((player, index) => (
          <div 
            key={player.socketId} 
            className={`flex items-center justify-between p-3 rounded-lg border transition-all ${player.socketId === currentDrawer ? 'bg-yellow-100 border-yellow-300 shadow-sm' : 'bg-white border-gray-200 hover:border-indigo-200'}`}
          >
            <div className="flex items-center gap-3">
              <span className={`font-bold w-7 h-7 flex items-center justify-center rounded-full text-xs shadow-sm ${index === 0 && player.score > 0 ? 'bg-yellow-400 text-yellow-900 border border-yellow-500' : 'bg-gray-100 text-gray-500 border border-gray-200'}`}>
                #{index + 1}
              </span>
              <div className="flex flex-col">
                 <span className="font-bold text-gray-800 text-sm leading-tight max-w-[120px] truncate" title={player.username}>{player.username}</span>
                 {player.socketId === currentDrawer && <span className="text-[10px] uppercase font-bold text-yellow-700 tracking-wider">Drawing</span>}
              </div>
            </div>
            <div className="font-black text-indigo-600 text-lg">{player.score} <span className="text-[10px] text-gray-400 font-semibold uppercase">pts</span></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
