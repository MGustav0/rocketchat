import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { Server } from 'socket.io';

const app = express();

const server = createServer(app);

app.use(express.static(path.join(__dirname, '..', 'public')));

const io = new Server(server);

io.on('connection', socket => {
  console.log('New client connected: ', socket.id);
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
