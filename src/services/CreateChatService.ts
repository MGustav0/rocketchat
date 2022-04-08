import { container } from 'tsyringe';

import { io } from '../http';
import { CreateUserService } from './CreateUserService';

io.on('connect', socket => {
  socket.on('start', async data => {
    const { email, socket_id, avatar, name } = data;
    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      email,
      avatar,
      name,
      socket_id: socket.id,
    });
  });
});
