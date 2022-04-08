import { injectable } from 'tsyringe';

import { ChatRoom } from '../schemas/ChatRoom';

@injectable()
class GetChatRoomByIdService {
  async execute(idChatroom: string) {
    const room = await ChatRoom.findOne({
      idChatroom,
    })
      .populate('idUsers')
      .exec();

    return room;
  }
}

export { GetChatRoomByIdService };
