import { Component, createEffect, createResource } from 'solid-js';
import {
    ProductApi,
    ProductListResponse
} from '../../features/product/interfaces';

import AlertErrors from '../../features/shared/molecules/AlertErrors/AlertErrors';
import { INIT_STATE } from '../../features/shared/constants';
import PrivateLayout from '../../features/shared/layout/PrivateLayout/PrivateLayout';
import ProductList from '../../features/product/templates/ProductList/ProductList';
import ProductRepository from '../../features/product/repositories/ProductRepository';
import createAlert from '../../features/shared/hooks/createAlert';
import { removeProductAction } from './delete/handlers';
import { useApplicationContext } from '../../context/context';
import { useI18n } from 'solid-i18n';
import usePaginatedState from '../../features/shared/hooks/usePaginatedState';
import usePermission from '../../features/shared/hooks/usePermission';
import useQuery from '../../features/shared/hooks/useQuery';

const IndexPage: Component = () =>
{
    const { t } = useI18n();
    const { errorData, setError } = createAlert();
    const [ user ]: any = useApplicationContext();
    const productRepository = new ProductRepository();

    const { goToPage, getURLSearchParams } = useQuery(
        INIT_STATE.nextPaginationParams
    );

    const [ products, { refetch } ] = createResource(
        { queryParams: getURLSearchParams(), user: user() },
        productRepository.getProducts
    );
    const {
        resourceList: productList,
        setViewMore,
        paginationData,
    } = usePaginatedState<ProductApi, ProductListResponse>( products );

    usePermission( user, [ products ] );

    createEffect( () => products.error && setError( products.error ) );

    const viewMoreAction = () => () =>
    {
        goToPage( products()?.pagination?.nextUrl );
        setViewMore();
    };

    return (
        <PrivateLayout>
            <AlertErrors
                errorData={errorData}
                title="err"
                description="err_process_product"
            />
            <ProductList
                productList={productList()}
                removeAction={removeProductAction( {
                    productRepository,
                    user: user(),
                    setError,
                    refetch,
                    t,
                } )}
                loading={products.loading}
                viewMoreAction={viewMoreAction}
                nextPage={paginationData()?.nextUrl}
            />
        </PrivateLayout>
    );
};

export default IndexPage;
