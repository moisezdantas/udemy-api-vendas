import AppError from '@shared/errors/AppError';
import Customer from '../infra/typeorm/entities/Customer';

import { IShowCustomer } from '../domain/models/IShowCustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';
import { injectable, inject } from 'tsyringe';
@injectable()
export default class ShowCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ id }: IShowCustomer): Promise<Customer> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('User not found');
    }

    return customer;
  }
}
