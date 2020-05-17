import socketIOClient from 'socket.io-client';

const PORT = process.env.PORT || 8080;
const ENDPOINT = `http://127.0.0.1:${PORT}`;

const socket = socketIOClient(ENDPOINT);

export default socket;
