class RoomManager {
  constructor() {
    this.rooms = new Map();
    // A sample word list
    this.words = ['apple', 'banana', 'car', 'dog', 'elephant', 'flower', 'guitar', 'house', 'ice cream', 'jungle', 'mountain', 'ocean', 'pizza', 'robot', 'spaceship', 'tree'];
  }

  createRoom(roomId) {
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, {
        id: roomId,
        players: [],
        currentDrawer: null,
        currentWord: null,
        gameState: 'LOBBY', // LOBBY, PLAYING
        timer: 0,
        timerInterval: null,
        canvasState: []
      });
    }
    return this.rooms.get(roomId);
  }

  getRoom(roomId) {
    return this.rooms.get(roomId);
  }

  getSanitizedRoom(roomId) {
    const room = this.rooms.get(roomId);
    if (!room) return null;
    const sanitized = { ...room };
    delete sanitized.timerInterval;
    return sanitized;
  }

  addPlayer(roomId, player) {
    let room = this.getRoom(roomId);
    if (!room) room = this.createRoom(roomId);
    
    // Prevent duplicate entries
    const existing = room.players.find(p => p.socketId === player.socketId);
    if (!existing) {
      room.players.push(player);
    }
    return room;
  }

  removePlayer(roomId, socketId) {
    const room = this.getRoom(roomId);
    if (room) {
      room.players = room.players.filter(p => p.socketId !== socketId);
      if (room.players.length === 0) {
        if (room.timerInterval) clearInterval(room.timerInterval);
        this.rooms.delete(roomId);
        return null; // Room deleted
      }
      if (room.currentDrawer === socketId && room.gameState === 'PLAYING') {
        // Drawer left mid-game, prematurely end round
        this.endRound(roomId, null); 
      }
      return room;
    }
    return null;
  }

  startGame(roomId, io) {
    const room = this.getRoom(roomId);
    if (!room || room.players.length < 2) return false;
    
    room.gameState = 'PLAYING';
    room.canvasState = [];
    
    // Reset all scores when a new full game starts
    room.players.forEach(p => p.score = 0);
    
    this.startRound(roomId, io);
    return true;
  }

  startRound(roomId, io) {
    const room = this.getRoom(roomId);
    if (!room) return;

    // Pick random drawer and word
    const randomPlayerIdx = Math.floor(Math.random() * room.players.length);
    room.currentDrawer = room.players[randomPlayerIdx].socketId;
    room.currentWord = this.words[Math.floor(Math.random() * this.words.length)];
    room.timer = 60;
    room.canvasState = []; // clear canvas for new round

    // Notify room of round start (do not reveal the word to everyone)
    io.to(roomId).emit('round_start', {
      drawerId: room.currentDrawer,
      wordLength: room.currentWord.length,
      timer: room.timer
    });

    // Notify drawer of the word explicitly
    io.to(room.currentDrawer).emit('assigned_word', room.currentWord);

    // Timer loop
    if (room.timerInterval) clearInterval(room.timerInterval);
    room.timerInterval = setInterval(() => {
      room.timer--;
      io.to(roomId).emit('timer_update', room.timer);

      if (room.timer <= 0) {
        this.endRound(roomId, io);
      }
    }, 1000);
  }

  endRound(roomId, io) {
    const room = this.getRoom(roomId);
    if (!room) return;

    if (room.timerInterval) clearInterval(room.timerInterval);
    room.timerInterval = null;
    room.gameState = 'LOBBY';

    if (io) {
      // Reveal the word at the end of the round
      io.to(roomId).emit('round_end', {
        word: room.currentWord
      });
      // Optionally emit a system message
      io.to(roomId).emit('system_message', `The round ended! The word was: ${room.currentWord}`);
    }
    room.currentWord = null;
    room.currentDrawer = null;
  }

  verifyGuess(roomId, socketId, guess) {
    const room = this.getRoom(roomId);
    if (!room || room.gameState !== 'PLAYING' || !room.currentWord) return false;
    
    if (room.currentDrawer === socketId) return false; // drawer can't guess

    if (guess.toLowerCase() === room.currentWord.toLowerCase()) {
      // Correct guess!
      const player = room.players.find(p => p.socketId === socketId);
      if (player) {
        // Award points based on time left
        const points = Math.ceil((room.timer / 60) * 100);
        player.score += points;
      }
      return true;
    }
    return false;
  }
}

module.exports = new RoomManager();
