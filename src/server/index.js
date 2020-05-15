var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const { CREATE_GAME, SYNC_GAME, ASSIGN_PLAYER_ID } = require('../common');

const port = 8080;

let games = [];

function createGame(hostId) {
  return {
    id: Math.random().toString(36).substr(2, 5),
    players: [
      {
        id: hostId,
      },
    ],
  };
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log(`user connected, socket id: ${socket.id}`);
  socket.emit(ASSIGN_PLAYER_ID, socket.id);

  socket.on(CREATE_GAME, () => {
    const newGame = createGame(socket.id);
    games = [...games, newGame];
    socket.emit(SYNC_GAME, newGame);
  });
});

http.listen(port, () => {
  console.log(`listening on port ${port}`);
});
