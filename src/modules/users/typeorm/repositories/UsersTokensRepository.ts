import { EntityRepository, Repository } from 'typeorm';
import UserToken from '../entities/UserToken';

@EntityRepository(UserToken)
export class UserTokensRepository extends Repository<UserToken> {
  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.findOne({
      where: {
        token,
      },
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken | undefined> {
    const userToken = this.create({
      user_id,
    });
    try {
      console.log('generate', user_id);
      console.log('generate', userToken);
      await this.save(userToken);
    } catch (error) {
      console.log(error);
    }

    console.log('generate', userToken);

    return userToken;
  }
}
