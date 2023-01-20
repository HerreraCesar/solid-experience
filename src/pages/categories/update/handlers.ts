import { CategoryPayload } from './../../../features/category/interfaces/index';
import CategoryRepository from '../../../features/category/repositories/CategoryRepository';
import { LoginApi } from '../../../features/auth/interfaces/login';

type params = {
    categoryRepository: CategoryRepository;
    id: string;
    user: LoginApi;
};

export const updateAction =
  ( { categoryRepository, id, user }: params ) =>
      async ( data: CategoryPayload ) =>
      {
          return categoryRepository.updateCategory( { id, data, user } );
      };
