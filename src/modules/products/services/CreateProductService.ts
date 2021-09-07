import redisCache from '@shared/cache/RedisCache';
import { ProductRepository } from '../infra/typeorm/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import Product from '../infra/typeorm/entities/Product';
import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const productExists = await productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    await redisCache.invalidade('api-vendas-PRODUCT_LIST');

    return await productsRepository.save(product);
  }
}

export default CreateProductService;
