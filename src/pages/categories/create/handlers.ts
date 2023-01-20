import { CategoryPayload } from './../../../features/category/interfaces/index';
import CategoryRepository from '../../../features/category/repositories/CategoryRepository';
import { LoginApi } from '../../../features/auth/interfaces/login';

type params = {
    categoryRepository: CategoryRepository;
    user: LoginApi;
};

export const createAction =
  ( { categoryRepository, user }: params ) =>
      async ( data: CategoryPayload ) =>
      {
          return categoryRepository.createCategory( { data, user } );
      };
