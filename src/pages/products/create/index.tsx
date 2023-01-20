import { Component, createResource } from 'solid-js';

import AuthRepository from '../../../features/auth/repositories/AuthRepository';
import CategoryRepository from '../../../features/category/repositories/CategoryRepository';
import PrivateLayout from '../../../features/shared/layout/PrivateLayout/PrivateLayout';
import ProductCreate from '../../../features/product/templates/ProductCreate/ProductCreate';
import ProductRepository from '../../../features/product/repositories/ProductRepository';
import { createAction } from './handler';
import { useApplicationContext } from '../../../context/context';
import usePermission from '../../../features/shared/hooks/usePermission';

const IndexPage: Component = () =>
{
    const [ user ]: any = useApplicationContext();
    const authRepository = new AuthRepository();
    const productRepository = new ProductRepository();
    const categoryRepository = new CategoryRepository();

    const [ categories ] = createResource(
        { user: user() },
        categoryRepository.getCategories
    );
    const [ permissions ] = createResource(
        { user: user() },
        authRepository.getAllPermissions
    );
    usePermission( user, [ categories, permissions ] );

    return (
        <PrivateLayout>
            <ProductCreate
                onCreate={createAction( { productRepository, user: user() } )}
                permissionsList={permissions()?.data}
                categories={categories()?.data}
                loading={permissions.loading || categories.loading}
            />
        </PrivateLayout>
    );
};

export default IndexPage;
