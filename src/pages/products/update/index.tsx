import { Component, createMemo, createResource } from 'solid-js';

import AuthRepository from '../../../features/auth/repositories/AuthRepository';
import CategoryRepository from '../../../features/category/repositories/CategoryRepository';
import PrivateLayout from '../../../features/shared/layout/PrivateLayout/PrivateLayout';
import ProductRepository from '../../../features/product/repositories/ProductRepository';
import ProductUpdate from '../../../features/product/templates/ProductUpdate/ProductUpdate';
import { updateAction } from './handlers';
import { useApplicationContext } from '../../../context/context';
import { useParams } from 'solid-app-router';
import usePermission from '../../../features/shared/hooks/usePermission';

const IndexPage: Component = () =>
{
    const { id } = useParams<{ id: string }>();
    const [ user ]: any = useApplicationContext();
    const authRepository = new AuthRepository();
    const productRepository = new ProductRepository();
    const categoryRepository = new CategoryRepository();

    const [ productSelected ] = createResource(
        { id, user: user() },
        productRepository.getOne
    );
    const [ categories ] = createResource(
        { user: user() },
        categoryRepository.getCategories
    );
    const [ permissions ] = createResource(
        { user: user() },
        authRepository.getAllPermissions
    );
    usePermission( user, [ categories, permissions, productSelected ] );

    const isLoading = createMemo(
        () => productSelected.loading || permissions.loading || categories.loading
    );

    return (
        <PrivateLayout>
            <ProductUpdate
                onUpdate={updateAction( { productRepository, id, user: user() } )}
                productSelected={productSelected()?.data}
                permissionsList={permissions()?.data}
                categories={categories()?.data}
                loading={isLoading()}
            />
        </PrivateLayout>
    );
};

export default IndexPage;
