import { Component, createResource } from 'solid-js';

import AuthRepository from '../../../features/auth/repositories/AuthRepository';
import CategoryCreate from '../../../features/category/templates/CategoryCreate/CategoryCreate';
import CategoryRepository from '../../../features/category/repositories/CategoryRepository';
import PrivateLayout from '../../../features/shared/layout/PrivateLayout/PrivateLayout';
import { createAction } from './handlers';
import { useApplicationContext } from '../../../context/context';
import usePermission from '../../../features/shared/hooks/usePermission';

const IndexPage: Component = () =>
{
    const [ user ]: any = useApplicationContext();
    const categoryRepository = new CategoryRepository();
    const authRepository = new AuthRepository();
    const [ permissions ] = createResource(
        { user: user() },
        authRepository.getAllPermissions
    );

    usePermission( user, [ permissions ] );

    return (
        <PrivateLayout>
            <CategoryCreate
                onCreate={createAction( { categoryRepository, user: user() } )}
                permissionsList={permissions()?.data}
                loading={permissions.loading}
            />
        </PrivateLayout>
    );
};

export default IndexPage;
