var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const {
  CREATE_GAME,
  SYNC_GAME,
  ASSIGN_PLAYER_DATA,
  JOIN_GAME,
  WAITING_FOR_OPPONENT,
  GAME_READY,
  CREATE_PLAYER,
  START_GAME,
  GAME_IN_PROGRESS,
} = require('./constants');

const port = process.env.PORT || 8080;

let games = [];

function createGame(player) {
  const id = Math.random().toString(36).substr(2, 5);

  return {
    id,
    players: [player],
    status: WAITING_FOR_OPPONENT,
    board: Array(9),
    hostId: player.id,
  };
}

io.on('connection', (socket) => {
  console.log(`user connected, socket id: ${socket.id}`);
  socket.on(CREATE_PLAYER, (playerName) => {
    const player = { id: socket.id, name: playerName };
    socket.emit(ASSIGN_PLAYER_DATA, player);
  });

  socket.on(CREATE_GAME, (player) => {
    const updatedPlayer = { ...player, symbol: 'X' };
    const newGame = createGame(updatedPlayer);
    games = [...games, newGame];
    socket.join(newGame.id);
    io.in(newGame.id).emit(SYNC_GAME, newGame);
  });

  socket.on(JOIN_GAME, ({ player, gameId }) => {
    const gameIndex = games.findIndex((game) => game.id === gameId);
    const game = games[gameIndex] || {};
    if (game.status === WAITING_FOR_OPPONENT) {
      updatedGame = {
        ...game,
        players: [...game.players, { ...player, symbol: 'O' }],
        status: GAME_READY,
      };
      games[gameIndex] = updatedGame;
      socket.join(game.id);
      io.in(game.id).emit(SYNC_GAME, updatedGame);
    }
  });

  socket.on(START_GAME, ({ gameId }) => {
    const gameIndex = games.findIndex((game) => game.id === gameId);
    const game = games[gameIndex] || {};
    if (game.status === GAME_READY) {
      updatedGame = {
        ...game,
        status: GAME_IN_PROGRESS,
      };
      games[gameIndex] = updatedGame;
      io.in(game.id).emit(SYNC_GAME, updatedGame);
    }
  });
});

http.listen(port, () => {
  console.log(`listening on port ${port}`);
});
