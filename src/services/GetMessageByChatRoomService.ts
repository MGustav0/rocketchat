import { injectable } from 'tsyringe';

import { Message } from '../schemas/Message';

@injectable()
class GetMessageByChatRoomService {
  async execute(roomId: string) {
    const room = await Message.find({
      roomId,
    })
      .populate('to')
      .exec();

    return room;
  }
}

export { GetMessageByChatRoomService };
