import { Component, Show } from 'solid-js';
import { ProductApi, ProductPayload, ProductResponse } from '../../interfaces';
import { Text, useI18n } from 'solid-i18n';

import { CategoryApi } from '../../../category/interfaces';
import GeneralLoader from '../../../shared/templates/GeneralLoader';
import { PermissionApi } from '../../../auth/interfaces/permission';
import ProductForm from '../../organisms/ProductForm/ProductForm';
import createAlert from '../../../shared/hooks/createAlert';
import { notificationService } from '@hope-ui/solid';
import { permissions } from '../../../../config/permissions';
import { useNavigate } from 'solid-app-router';

interface ProductUpdateTemplateProps {
    permissionsList?: PermissionApi[];
    categories?: CategoryApi[];
    onUpdate: ( data: ProductPayload ) => Promise<ProductResponse>;
    loading: boolean;
    productSelected?: ProductApi | undefined;
}

const ProductUpdate: Component<ProductUpdateTemplateProps> = ( props ) =>
{
    const { t } = useI18n();
    const navigate = useNavigate();
    const errorAlert = createAlert();
    const { setError } = errorAlert;

    const handleSuccess = () => () =>
    {
        notificationService.show( {
            status: 'success',
            title: t( 'p_updated' ) as string,
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
            <header
                class="section_header_container"
                data-parent={permissions.PRODUCTS.UPDATE}
            >
                <div class="has-permission">
                    <h1 class="section_title">
                        <Text message="p_update" />
                    </h1>
                </div>
                <div class="fallback">
                    <h1 class="section_title">
                        <Text message="Product" />
                    </h1>
                </div>
            </header>

            <Show when={!props.loading} fallback={() => <GeneralLoader />}>
                <ProductForm
                    onError={handleError()}
                    onSubmit={props.onUpdate}
                    onSuccess={handleSuccess()}
                    permissionsList={props.permissionsList}
                    requiredPermission={{ submit: permissions.USERS.UPDATE }}
                    categories={props.categories}
                    productSelected={props.productSelected}
                />
            </Show>
        </section>
    );
};

export default ProductUpdate;
