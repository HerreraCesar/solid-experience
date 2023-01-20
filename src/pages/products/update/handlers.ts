import { LoginApi } from '../../../features/auth/interfaces/login';
import { ProductPayload } from './../../../features/product/interfaces/index';
import ProductRepository from '../../../features/product/repositories/ProductRepository';

type params = {
    productRepository: ProductRepository;
    id: string;
    user: LoginApi;
};

export const updateAction =
  ( { productRepository, user, id }: params ) =>
      async ( data: ProductPayload ) =>
      {
          return productRepository.updateProduct( { id, data, user } );
      };
