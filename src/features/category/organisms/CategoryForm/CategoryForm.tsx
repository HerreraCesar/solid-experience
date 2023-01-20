import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Switch
} from '@hope-ui/solid';
import {
    CategoryApi,
    CategoryPayload,
    CategoryResponse
} from '../../interfaces';
import { Text, useI18n } from 'solid-i18n';

import { Component } from 'solid-js';
import { InferType } from 'yup';
import { Link } from 'solid-app-router';
import { PermissionApi } from '../../../auth/interfaces/permission';
import categorySchema from '../../validations/schemas/CategorySchema';
import { createForm } from '@felte/solid';
import { validator } from '@felte/validator-yup';

enum RequiredPermission {
    submit = 'submit',
}

interface CategoryUpdateTemplateProps {
    onError: ( error: unknown ) => void;
    onSubmit: ( data: CategoryPayload ) => Promise<CategoryResponse>;
    onSuccess: () => void;
    permissionsList?: PermissionApi[];
    categorySelected?: CategoryApi | undefined;
    requiredPermission: Record<RequiredPermission, string>;
}

const CategoryForm: Component<CategoryUpdateTemplateProps> = ( props ) =>
{
    const i18n = useI18n();
    const { t } = i18n;

    const {
        errors,
        form,
        isSubmitting,
        isValid,
    // @ts-ignore
    } = createForm<InferType<typeof categorySchema>>( {
        initialValues: {},
        extend: validator( { schema: categorySchema } ),
        onSuccess: props.onSuccess,
        onError: props.onError,
        onSubmit: ( values ) => props.onSubmit( values as CategoryPayload ),
    } );

    return (
        <form ref={form} class="form_flex">
            <div class="field_wrapper">
                <FormControl required invalid={!!errors( 'title' )}>
                    <FormLabel for="title">
                        <Text message="title" />
                    </FormLabel>
                    <Input
                        autofocus
                        name="title"
                        type="text"
                        placeholder={t( 'a_enter_title' ) as string}
                        value={props.categorySelected?.title}
                    />

                    <FormErrorMessage>
                        <Text message={errors( 'title' )![0]} />
                    </FormErrorMessage>
                </FormControl>
            </div>

            <div class="field_wrapper">
                <FormControl required invalid={!!errors( 'enable' )}>
                    <FormLabel>
                        <Text message="enable" />
                    </FormLabel>
                    <Switch
                        class="switch_position"
                        name="enable"
                        defaultChecked={
                            props.categorySelected?.id ? props.categorySelected?.enable : true
                        }
                    />
                    <FormErrorMessage>
                        <Text message={errors( 'enable' )![0]} />
                    </FormErrorMessage>
                </FormControl>
            </div>

            <div
                class="update_save_buttons_container"
                data-parent={props.requiredPermission.submit}
            >
                <div class="button_full has-permission">
                    <Button
                        class="button_full"
                        as={Link}
                        href="/categories"
                        colorScheme="neutral"
                    >
                        <Text message="a_close" />
                    </Button>
                </div>
                <div class="button_full has-permission ">
                    <Button
                        class="button_full"
                        type="submit"
                        disabled={!isValid()}
                        loading={isSubmitting()}
                        loadingText={( <Text message="a_submitting" /> ) as string}
                    >
                        <Text message="a_save" />
                    </Button>
                </div>
                <div class="button_full fallback">
                    <Button class="w-full" as={Link} href="/categories">
                        <Text message="a_close" />
                    </Button>
                </div>
            </div>
        </form>
    );
};
export default CategoryForm;
