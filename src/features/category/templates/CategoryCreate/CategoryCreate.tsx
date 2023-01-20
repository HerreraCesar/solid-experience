import { CategoryPayload, CategoryResponse } from '../../interfaces';
import { Component, Show } from 'solid-js';
import { Text, useI18n } from 'solid-i18n';

import AlertErrors from '../../../shared/molecules/AlertErrors/AlertErrors';
import CategoryForm from '../../organisms/CategoryForm/CategoryForm';
import GeneralLoader from '../../../shared/templates/GeneralLoader';
import { PermissionApi } from '../../../auth/interfaces/permission';
import createAlert from '../../../shared/hooks/createAlert';
import { notificationService } from '@hope-ui/solid';
import { permissions } from '../../../../config/permissions';
import { useNavigate } from 'solid-app-router';

interface CategoryCreateTemplateProps {
    permissionsList?: PermissionApi[];
    onCreate: ( data: CategoryPayload ) => Promise<CategoryResponse>;
    loading: boolean;
}

const CategoryCreate: Component<CategoryCreateTemplateProps> = ( props ) =>
{
    const { t } = useI18n();
    const navigate = useNavigate();
    const errorAlert = createAlert();
    const { setError } = errorAlert;

    const handleSuccess = () => () =>
    {
        notificationService.show( {
            status: 'success',
            title: t( 'c_created' ) as string,
        } );
        navigate( '/categories', { replace: true } );
    };

    const handleError = () => ( error: unknown ) =>
    {
        const errorMessage = setError( error );
        notificationService.show( {
            status: 'danger',
            title: t( 'err_save_category' ) as string,
            description: t( errorMessage ) as string,
        } );
    };

    return (
        <section class="section_container">
            <AlertErrors
                errorData={errorAlert.errorData()}
                title="err_save"
                description="err_save_category"
            />

            <header class="section_header_container">
                <h1 class="section_title">
                    <Text message="c_create" />
                </h1>
            </header>

            <Show when={!props.loading} fallback={() => <GeneralLoader />}>
                <CategoryForm
                    onError={handleError()}
                    onSubmit={props.onCreate}
                    onSuccess={handleSuccess()}
                    permissionsList={props.permissionsList}
                    requiredPermission={{ submit: permissions.CATEGORIES.SAVE }}
                />
            </Show>
        </section>
    );
};

export default CategoryCreate;
