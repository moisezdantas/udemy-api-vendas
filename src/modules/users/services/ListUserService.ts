import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';
import { getCustomRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';

class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    return await usersRepository.find();
  }
}

export default ListUserService;
