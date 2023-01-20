import { Component, createResource } from 'solid-js';

import AuthRepository from '../../../features/auth/repositories/AuthRepository';
import CategoryRepository from '../../../features/category/repositories/CategoryRepository';
import CategoryUpdate from '../../../features/category/templates/CategoryUpdate/CategoryUpdate';
import PrivateLayout from '../../../features/shared/layout/PrivateLayout/PrivateLayout';
import { updateAction } from './handlers';
import { useApplicationContext } from '../../../context/context';
import { useParams } from 'solid-app-router';
import usePermission from '../../../features/shared/hooks/usePermission';

const IndexPage: Component = () =>
{
    const { id } = useParams<{ id: string }>();
    const [ user ]: any = useApplicationContext();
    const categoryRepository = new CategoryRepository();
    const authRepository = new AuthRepository();
    const [ category ] = createResource(
        { id, user: user() },
        categoryRepository.getOne
    );
    const [ permissions ] = createResource(
        { user: user() },
        authRepository.getAllPermissions
    );
    usePermission( user, [ category, permissions ] );

    return (
        <PrivateLayout>
            <CategoryUpdate
                categorySelected={category()?.data}
                permissionsList={permissions()?.data}
                onUpdate={updateAction( { categoryRepository, id, user: user() } )}
                loading={category.loading || permissions.loading}
            />
        </PrivateLayout>
    );
};

export default IndexPage;
