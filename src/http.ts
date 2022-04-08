import 'reflect-metadata';
import express from 'express';
import { createServer } from 'http';
import mongoose from 'mongoose';
import path from 'path';
import { Server } from 'socket.io';

const app = express();

const server = createServer(app);

// Passe o mesmo nome da imagem na URL
mongoose.connect('mongodb://mongo:27017/rocketsocket');

app.use(express.static(path.join(__dirname, '..', 'public')));

const io = new Server(server);

io.on('connection', socket => {
  console.log('New client connected: ', socket.id);
});

export { server, io };
