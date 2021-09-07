import { Request, Response } from 'express';
import CreateSessionsService from '../../../services/CreateSessionsService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createUser = container.resolve(CreateSessionsService);

    const user = await createUser.execute({ email, password });

    return response.json(classToClass(user));
  }
}
