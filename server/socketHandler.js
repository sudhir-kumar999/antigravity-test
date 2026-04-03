const roomManager = require('./RoomManager');

const setupSocketHandlers = (io) => {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    let currentRoom = null;

    const emitRoomData = (roomId) => {
      const sanitized = roomManager.getSanitizedRoom(roomId);
      if (sanitized) {
        io.to(roomId).emit('room_data', sanitized);
      }
    };

    socket.on('join_room', ({ roomId, username }) => {
      socket.join(roomId);
      currentRoom = roomId;
      
      const newPlayer = {
        socketId: socket.id,
        username: username || 'Guest',
        score: 0
      };
      
      roomManager.addPlayer(roomId, newPlayer);
      
      emitRoomData(roomId);
      io.to(roomId).emit('system_message', `${newPlayer.username} joined the room.`);
      
      const room = roomManager.getRoom(roomId);
      if (room) {
        socket.emit('canvas_state', room.canvasState);
      }
    });

    socket.on('start_game', () => {
      if (currentRoom) {
        const success = roomManager.startGame(currentRoom, io);
        if (success) {
          emitRoomData(currentRoom);
          io.to(currentRoom).emit('system_message', 'Game started!');
        } else {
          socket.emit('system_message', 'Need at least 2 players to start.');
        }
      }
    });

    socket.on('draw_line', (data) => {
      if (currentRoom) {
        const room = roomManager.getRoom(currentRoom);
        if (room && room.currentDrawer === socket.id) {
          room.canvasState.push(data);
          socket.to(currentRoom).emit('draw_line', data);
        }
      }
    });

    socket.on('clear_canvas', () => {
      if (currentRoom) {
        const room = roomManager.getRoom(currentRoom);
        if (room && room.currentDrawer === socket.id) {
          room.canvasState = [];
          io.to(currentRoom).emit('clear_canvas');
        }
      }
    });

    socket.on('send_message', (message) => {
      if (!currentRoom) return;
      
      const room = roomManager.getRoom(currentRoom);
      const player = room?.players.find(p => p.socketId === socket.id);
      const username = player ? player.username : 'Unknown';

      const isCorrect = roomManager.verifyGuess(currentRoom, socket.id, message);
      
      if (isCorrect) {
        io.to(currentRoom).emit('system_message', `${username} HAS GUESSED THE WORD!`);
        emitRoomData(currentRoom);
        roomManager.endRound(currentRoom, io);
      } else {
        io.to(currentRoom).emit('chat_message', {
          socketId: socket.id,
          username,
          message
        });
      }
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
      if (currentRoom) {
        const room = roomManager.getRoom(currentRoom);
        const player = room?.players.find(p => p.socketId === socket.id);
        
        roomManager.removePlayer(currentRoom, socket.id);
        emitRoomData(currentRoom);
        
        if (player) {
          io.to(currentRoom).emit('system_message', `${player.username} left the room.`);
        }
      }
    });
  });
};

module.exports = setupSocketHandlers;
