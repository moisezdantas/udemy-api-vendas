import AppError from '@shared/errors/AppError';
import { isAfter, addHours } from 'date-fns';
import { UserTokensRepository } from '../infra/typeorm/repositories/UsersTokensRepository';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';

interface IRequest {
  token: string;
  password: string;
}

export default class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokensRepository);

    const userToken = await userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User Token does not exists.');
    }

    const user = await usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const tokenCreateAt = userToken.created_at;
    const compareDate = addHours(tokenCreateAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.');
    }

    user.password = await hash(password, 8);

    await usersRepository.save(user);
  }
}
