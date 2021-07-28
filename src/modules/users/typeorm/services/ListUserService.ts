import { UsersRepository } from './../repositories/UsersRepository';
import { getCustomRepository } from 'typeorm';
import User from '../entities/User';

class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    return await usersRepository.find();
  }
}

export default ListUserService;
