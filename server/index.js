var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const {
  CREATE_GAME,
  SYNC_GAME,
  SYNC_PLAYER,
  JOIN_GAME,
  WAITING_FOR_OPPONENT,
  GAME_READY,
  CREATE_PLAYER,
  START_GAME,
  GAME_IN_PROGRESS,
  PLAY,
  GAME_OVER,
} = require('./constants');

const {
  addGame,
  getGameById,
  updateGame,
  pickRandomElement,
  getGameResult,
} = require('./utils');

const port = process.env.PORT || 8080;

function createGame(player) {
  const id = Math.random().toString(36).substr(2, 5);

  return {
    id,
    players: [player],
    status: WAITING_FOR_OPPONENT,
    hostId: player.id,
    winner: null,
  };
}

io.on('connection', (socket) => {
  console.log(`user connected, socket id: ${socket.id}`);
  socket.on(CREATE_PLAYER, (playerName) => {
    const player = { id: socket.id, name: playerName };
    socket.emit(SYNC_PLAYER, player);
  });

  socket.on(CREATE_GAME, (player) => {
    const updatedPlayer = { ...player, symbol: 'X' };
    const newGame = createGame(updatedPlayer);
    addGame(newGame);
    socket.emit(SYNC_PLAYER, updatedPlayer);
    socket.join(newGame.id);
    io.in(newGame.id).emit(SYNC_GAME, newGame);
  });

  socket.on(JOIN_GAME, ({ player, gameId }) => {
    const game = getGameById(gameId);

    if (game.status === WAITING_FOR_OPPONENT) {
      const updatedPlayer = { ...player, symbol: 'O' };
      data = {
        players: [...game.players, updatedPlayer],
        status: GAME_READY,
      };
      const updatedGame = updateGame(game.id, data);
      socket.emit(SYNC_PLAYER, updatedPlayer);
      socket.join(game.id);
      io.in(game.id).emit(SYNC_GAME, updatedGame);
    }
  });

  socket.on(START_GAME, ({ gameId }) => {
    const game = getGameById(gameId);

    if ([GAME_READY, GAME_OVER].includes(game.status)) {
      data = {
        board: Array(9).fill(null),
        status: GAME_IN_PROGRESS,
        currentTurn: pickRandomElement(game.players).id,
      };
      const updatedGame = updateGame(game.id, data);
      io.in(game.id).emit(SYNC_GAME, updatedGame);
    }
  });

  socket.on(PLAY, ({ gameId, playerId, index }) => {
    const game = getGameById(gameId);
    let board = game.board;
    const player = game.players.find((player) => player.id === playerId);

    if (
      game.status === GAME_IN_PROGRESS &&
      !board[index] &&
      game.currentTurn === player.id
    ) {
      board[index] = player.symbol;
      let data = { board };
      const { gameOver, currentPlayerWon } = getGameResult({
        board,
        player,
      });
      const winner = currentPlayerWon ? player.id : null;
      if (gameOver) {
        data = { ...data, winner, status: GAME_OVER };
      } else {
        otherPlayer = game.players.filter((p) => p.id !== player.id)[0];
        data = { ...data, currentTurn: otherPlayer.id };
      }
      const updatedGame = updateGame(game.id, data);
      io.in(game.id).emit(SYNC_GAME, updatedGame);
    }
  });
});

http.listen(port, () => {
  console.log(`listening on port ${port}`);
});
