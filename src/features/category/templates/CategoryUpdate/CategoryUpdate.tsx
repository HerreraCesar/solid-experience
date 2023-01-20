import {
    CategoryApi,
    CategoryPayload,
    CategoryResponse
} from '../../interfaces';
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

interface CategoryUpdateTemplateProps {
    permissionsList?: PermissionApi[];
    onUpdate: ( data: CategoryPayload ) => Promise<CategoryResponse>;
    categorySelected: CategoryApi | undefined;
    loading: boolean;
}

const CategoryUpdate: Component<CategoryUpdateTemplateProps> = ( props ) =>
{
    const { t } = useI18n();
    const navigate = useNavigate();
    const errorAlert = createAlert();
    const { setError } = errorAlert;

    const handleSuccess = () => () =>
    {
        notificationService.show( {
            status: 'success',
            title: t( 'c_updated' ) as string,
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

            <header
                class="section_header_container"
                data-parent={permissions.CATEGORIES.UPDATE}
            >
                <div class="has-permission">
                    <h1 class="section_title">
                        <Text message="c_update" />
                    </h1>
                </div>
                <div class="fallback">
                    <h1 class="section_title">
                        <Text message="Category" />
                    </h1>
                </div>
            </header>

            <Show when={!props.loading} fallback={() => <GeneralLoader />}>
                <CategoryForm
                    onError={handleError()}
                    onSubmit={props.onUpdate}
                    onSuccess={handleSuccess()}
                    permissionsList={props.permissionsList}
                    categorySelected={props.categorySelected}
                    requiredPermission={{ submit: permissions.CATEGORIES.UPDATE }}
                />
            </Show>
        </section>
    );
};
export default CategoryUpdate;
