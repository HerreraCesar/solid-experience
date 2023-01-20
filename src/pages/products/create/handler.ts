import { LoginApi } from '../../../features/auth/interfaces/login';
import { ProductPayload } from './../../../features/product/interfaces/index';
import ProductRepository from '../../../features/product/repositories/ProductRepository';

type params = {
    productRepository: ProductRepository;
    user: LoginApi;
};

export const createAction =
  ( { productRepository, user }: params ) =>
      async ( data: ProductPayload ) =>
      {
          return productRepository.createProduct( { data, user } );
      };
