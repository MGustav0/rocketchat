import { injectable } from 'tsyringe';

import { User } from '../schemas/User';

@injectable()
class GetAllUsersService {
  async execute() {
    const users = await User.find({}).exec();
    return users;
  }
}

export { GetAllUsersService };
