import { getCustomRepository } from 'typeorm';
import { CustomersRepository } from './../repositories/CustomersRepository';
import Customer from '../entities/Customer';

export default class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    const customersRepository = getCustomRepository(CustomersRepository);

    return await customersRepository.find();
  }
}
