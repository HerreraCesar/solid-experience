import { Component, Show } from 'solid-js';
import { ProductPayload, ProductResponse } from '../../interfaces';
import { Text, useI18n } from 'solid-i18n';

import { CategoryApi } from '../../../category/interfaces';
import GeneralLoader from '../../../shared/templates/GeneralLoader';
import { PermissionApi } from '../../../auth/interfaces/permission';
import ProductForm from '../../organisms/ProductForm/ProductForm';
import createAlert from '../../../shared/hooks/createAlert';
import { notificationService } from '@hope-ui/solid';
import { permissions } from '../../../../config/permissions';
import { useNavigate } from 'solid-app-router';

interface ProductCreateTemplateProps {
    permissionsList?: PermissionApi[];
    categories?: CategoryApi[];
    onCreate: ( data: ProductPayload ) => Promise<ProductResponse>;
    loading: boolean;
}

const ProductCreate: Component<ProductCreateTemplateProps> = ( props ) =>
{
    const { t } = useI18n();
    const navigate = useNavigate();
    const errorAlert = createAlert();
    const { setError } = errorAlert;

    const handleSuccess = () => () =>
    {
        notificationService.show( {
            status: 'success',
            title: t( 'p_created' ) as string,
        } );
        navigate( '/products', { replace: true } );
    };

    const handleError = () => ( error: unknown ) =>
    {
        const errorMessage = setError( error );
        notificationService.show( {
            status: 'danger',
            title: t( 'err_save_product' ) as string,
            description: t( errorMessage ) as string,
        } );
    };

    return (
        <section class="section_container">
            <header class="section_header_container">
                <h1 class="section_title">
                    <Text message="p_create" />
                </h1>
            </header>

            <Show when={!props.loading} fallback={() => <GeneralLoader />}>
                <ProductForm
                    onError={handleError()}
                    onSubmit={props.onCreate}
                    onSuccess={handleSuccess()}
                    permissionsList={props.permissionsList}
                    requiredPermission={{ submit: permissions.PRODUCTS.SAVE }}
                    categories={props.categories}
                />
            </Show>
        </section>
    );
};

export default ProductCreate;
