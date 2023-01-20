import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Select,
    SelectContent,
    SelectIcon,
    SelectListbox,
    SelectOptGroup,
    SelectOption,
    SelectOptionIndicator,
    SelectOptionText,
    SelectPlaceholder,
    SelectTrigger,
    SelectValue,
    Switch
} from '@hope-ui/solid';
import { Component, For } from 'solid-js';
import { ProductApi, ProductPayload, ProductResponse } from '../../interfaces';
import { Text, useI18n } from 'solid-i18n';

import { CategoryApi } from '../../../category/interfaces';
import { InferType } from 'yup';
import { Link } from 'solid-app-router';
import { PermissionApi } from '../../../auth/interfaces/permission';
import { createForm } from '@felte/solid';
import productSchema from '../../validations/schemas/productSchema';
import { validator } from '@felte/validator-yup';

enum RequiredPermission {
    submit = 'submit',
}

interface ProductUpdateTemplateProps {
    onError: ( error: unknown ) => void;
    onSubmit: ( data: ProductPayload ) => Promise<ProductResponse>;
    onSuccess: () => void;
    permissionsList?: PermissionApi[];
    productSelected?: ProductApi | undefined;
    requiredPermission: Record<RequiredPermission, string>;
    categories?: CategoryApi[];
}

const ProductForm: Component<ProductUpdateTemplateProps> = ( props ) =>
{
    const i18n = useI18n();
    const { t } = i18n;

    const {
        errors,
        form,
        isSubmitting,
        isValid,
        setFields,
        setTouched,
    // @ts-ignore
    } = createForm<InferType<typeof productSchema>>( {
        initialValues: {},
        extend: validator( { schema: productSchema } ),
        onSuccess: props.onSuccess,
        onError: props.onError,
        onSubmit: ( values ) => props.onSubmit( values as ProductPayload ),
    } );

    const handleSelect =
    ( field: keyof InferType<typeof productSchema> ) => ( value: string ) =>
    {
        setFields( field, value );
        setTouched( field, true );
    };

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
                        value={props.productSelected?.title}
                    />

                    <FormErrorMessage>
                        <Text message={errors( 'title' )![0]} />
                    </FormErrorMessage>
                </FormControl>
            </div>

            <div class="field_wrapper">
                <FormControl required invalid={!!errors( 'price' )}>
                    <FormLabel for="price">
                        <Text message="price" />
                    </FormLabel>
                    <Input
                        name="price"
                        type="number"
                        placeholder={t( 'a_enter_price' ) as string}
                        value={props.productSelected?.price}
                    />
                    <FormErrorMessage>
                        <Text message={errors( 'price' )![0]} />
                    </FormErrorMessage>
                </FormControl>
            </div>

            <div class="field_wrapper">
                <FormControl id="category" invalid={!!errors( 'category' )}>
                    <FormLabel for="category">
                        <Text message="category" />
                    </FormLabel>
                    <Select
                        value={props.productSelected?.category}
                        onChange={handleSelect( 'category' )}
                    >
                        <SelectTrigger onBlur={() => setTouched( 'category', true )}>
                            <SelectPlaceholder>
                                <Text message="a_select_category" />
                            </SelectPlaceholder>
                            <SelectValue />
                            <SelectIcon />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectListbox>
                                <SelectOptGroup>
                                    <For each={props.categories}>
                                        {( category ) => (
                                            <SelectOption
                                                disabled={!category.enable}
                                                value={category.title}
                                                rounded="$none"
                                                fontSize="$sm"
                                                _active={{ bg: '$warning3', color: '$warning11' }}
                                                _selected={{ bg: '$warning9', color: 'white' }}
                                            >
                                                <SelectOptionText
                                                    _groupSelected={{ fontWeight: '$medium' }}
                                                >
                                                    {category.title}
                                                </SelectOptionText>
                                                <SelectOptionIndicator />
                                            </SelectOption>
                                        )}
                                    </For>
                                </SelectOptGroup>
                            </SelectListbox>
                        </SelectContent>
                    </Select>
                    <FormErrorMessage>
                        <Text message={errors( 'category' )![0]} />
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
                            props.productSelected?.id ? props.productSelected?.enable : true
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
                        href="/products"
                        colorScheme="neutral"
                    >
                        <Text message="a_close" />
                    </Button>
                </div>
                <div class="button_full has-permission">
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
                    <Button class="w-full" as={Link} href="/products">
                        <Text message="a_close" />
                    </Button>
                </div>
            </div>
        </form>
    );
};
export default ProductForm;
