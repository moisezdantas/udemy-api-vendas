import AppError from '@shared/errors/AppError';
import { ProductRepository } from '../infra/typeorm/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import Product from '../infra/typeorm/entities/Product';

interface IRequest {
  id: string;
}

class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    return await product;
  }
}

export default ShowProductService;
