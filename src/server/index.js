var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const port = 8080

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log(`user connected, socket id: ${socket.id}`);
});

http.listen(port, () => {
  console.log(`listening on port ${port}`);
});