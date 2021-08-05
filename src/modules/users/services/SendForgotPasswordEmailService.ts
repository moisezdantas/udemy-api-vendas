import AppError from '@shared/errors/AppError';
import { UserTokensRepository } from './../typeorm/repositories/UsersTokensRepository';
import path from 'path';
import { UsersRepository } from './../typeorm/repositories/UsersRepository';
import { getCustomRepository } from 'typeorm';
import EtherealMail from '@config/mail/EtherealMail';

interface IRequest {
  email: string;
}
export default class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokensRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const { token } = await userTokenRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API Vendas] Recuperação de Senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost::3000/reset_password?token=${token}`,
        },
      },
    });
  }
}
