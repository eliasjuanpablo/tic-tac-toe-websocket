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
} = require('../common');

const port = 8080;

let games = [];

function createGame(player) {
  const id = Math.random().toString(36).substr(2, 5);

  return {
    id,
    players: [player],
    status: WAITING_FOR_OPPONENT,
  };
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log(`user connected, socket id: ${socket.id}`);
  socket.on(CREATE_PLAYER, (playerName) => {
    const player = { id: socket.id, name: playerName };
    socket.emit(ASSIGN_PLAYER_DATA, player);
  });

  socket.on(CREATE_GAME, (player) => {
    const newGame = createGame(player);
    games = [...games, newGame];
    socket.join(newGame.id);
    io.in(newGame.id).emit(SYNC_GAME, newGame);
  });

  socket.on(JOIN_GAME, ({ player, gameId }) => {
    let game = games.find((game) => game.id === gameId) || {};

    if (game.status === WAITING_FOR_OPPONENT) {
      game = {
        ...game,
        players: [...game.players, player],
        status: GAME_READY,
      };
      socket.join(game.id);
      io.in(game.id).emit(SYNC_GAME, game);
    }
  });
});

http.listen(port, () => {
  console.log(`listening on port ${port}`);
});
