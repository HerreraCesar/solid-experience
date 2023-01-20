import {
    CategoryApi,
    CategoryListResponse
} from '../../features/category/interfaces';
import { Component, createEffect, createResource } from 'solid-js';

import AlertErrors from '../../features/shared/molecules/AlertErrors/AlertErrors';
import CategoryList from '../../features/category/templates/CategoryList/CategoryList';
import CategoryRepository from '../../features/category/repositories/CategoryRepository';
import { INIT_STATE } from '../../features/shared/constants';
import PrivateLayout from '../../features/shared/layout/PrivateLayout/PrivateLayout';
import createAlert from '../../features/shared/hooks/createAlert';
import { notificationService } from '@hope-ui/solid';
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
    const categoryRepository = new CategoryRepository();

    const { page, goToPage, goFirstPage, getURLSearchParams } = useQuery(
        INIT_STATE.nextPaginationParams
    );

    const [ categories, { refetch } ] = createResource(
        { user: user(), queryParams: getURLSearchParams() },
        categoryRepository.getCategories
    );
    const {
        resourceList: categoryList,
        setViewMore,
        paginationData,
    } = usePaginatedState<CategoryApi, CategoryListResponse>( categories );

    usePermission( user, [ categories ] );

    const viewMoreAction = () => () =>
    {
        goToPage( categories()?.pagination?.nextUrl );
        setViewMore();
    };

    createEffect( () => categories.error && setError( categories.error ) );

    const removeAction = async ( id: string ) =>
    {
        try
        {
            void ( await categoryRepository.removeCategory( { id, user: user() } ) );

            notificationService.show( {
                status: 'success',
                title: t( 'c_removed' ) as string,
            } );

            if ( page()?.offset === INIT_STATE.nextPaginationParams.offset )
            {
                return refetch();
            }

            goFirstPage();
        }
        catch ( error )
        {
            const errorMessage = setError( error );
            notificationService.show( {
                status: 'danger',
                title: t( 'err_remove_category' ) as string,
                description: t( errorMessage ) as string,
            } );
        }
    };

    return (
        <PrivateLayout>
            <AlertErrors
                errorData={errorData()}
                title="err"
                description="err_process_category"
            />
            <CategoryList
                categoryList={categoryList()}
                removeAction={removeAction}
                loading={categories.loading}
                viewMoreAction={viewMoreAction}
                nextPage={paginationData()?.nextUrl}
            />
        </PrivateLayout>
    );
};

export default IndexPage;
