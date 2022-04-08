import { container } from 'tsyringe';
/* eslint-disable no-underscore-dangle */

import { io } from '../http';
import { CreateChatRoomService } from '../services/CreateChatRoomService';
import { CreateMessageService } from '../services/CreateMessageService';
import { CreateUserService } from '../services/CreateUserService';
import { GetAllUsersService } from '../services/GetAllUsersService';
import { GetChatRoomByIdService } from '../services/GetChatRoomByIdService';
import { GetChatRoomByUsersService } from '../services/GetChatRoomByUsersService';
import { GetMessageByChatRoomService } from '../services/GetMessageByChatRoomService';
import { GetUserBySocketIdService } from '../services/GetUserBySocketIdService';

io.on('connect', socket => {
  socket.on('start', async data => {
    const { email, avatar, name } = data;
    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      email,
      avatar,
      name,
      socket_id: socket.id,
    });

    socket.broadcast.emit('new_users', user);
  });

  socket.on('get_users', async callback => {
    const getAllUsersService = container.resolve(GetAllUsersService);
    const users = await getAllUsersService.execute();

    callback({ users });
  });

  socket.on('start_chat', async (data, callback) => {
    const createChatRoomService = container.resolve(CreateChatRoomService);
    const getChatRoomByUsersService = container.resolve(
      GetChatRoomByUsersService,
    );
    const getUserBySocketIdService = container.resolve(
      GetUserBySocketIdService,
    );
    const getMessageByChatRoomService = container.resolve(
      GetMessageByChatRoomService,
    );

    const userLogged = await getUserBySocketIdService.execute(socket.id);

    let room = await getChatRoomByUsersService.execute([
      data.idUser,
      userLogged._id,
    ]);

    if (!room) {
      room = await createChatRoomService.execute([userLogged._id, data.id]);
    }

    socket.join(room.idChatRoom);

    const messages = await getMessageByChatRoomService.execute(room.idChatRoom);

    callback({ room, messages });
  });

  socket.on('message', async data => {
    const getUserBySocketIdService = container.resolve(
      GetUserBySocketIdService,
    );
    const createMessageService = container.resolve(CreateMessageService);
    const getChatRoomByIdService = container.resolve(GetChatRoomByIdService);

    const user = await getUserBySocketIdService.execute(socket.id);

    const message = await createMessageService.execute({
      to: user._id,
      text: data.message,
      roomId: data.idChatRoom,
    });

    io.to(data.idChatRoom).emit('message', { message, user });

    const room = await getChatRoomByIdService.execute(data.idChatRoom);

    const userFrom = room.idUsers.find(
      // eslint-disable-next-line eqeqeq
      response => String(response._id) != String(user._id),
    );

    io.to(userFrom.socket_id).emit('notification', {
      newMessage: true,
      roomId: data.idChatRoom,
      from: user,
    });
  });
});
