import { LoginApi } from '../../../features/auth/interfaces/login';
import ProductRepository from '../../../features/product/repositories/ProductRepository';
import { notificationService } from '@hope-ui/solid';

type params = {
    productRepository: ProductRepository;
    user: LoginApi;
    setError: ( error: undefined ) => string;
    refetch: ( info?: unknown ) => void;
    t: any;
};

export const removeProductAction =
  ( { productRepository, user, setError, refetch, t }: params ) =>
      async ( id: string ) =>
      {
          try
          {
              void ( await productRepository.removeProduct( { id, user } ) );

              notificationService.show( {
                  status: 'success',
                  title: t( 'p_removed' ) as string,
              } );

              refetch();
          }
          catch ( error: any )
          {
              const errorMessage = setError( error );
              notificationService.show( {
                  status: 'danger',
                  title: t( 'err_remove_product' ) as string,
                  description: t( errorMessage ) as string,
              } );
          }
      };
