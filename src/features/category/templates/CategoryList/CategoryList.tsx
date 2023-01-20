import {
    Button,
    Icon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    createDisclosure
} from '@hope-ui/solid';
import { Component, For, Show, createMemo } from 'solid-js';
import { Text, useI18n } from 'solid-i18n';

import ButtonScrollUp from '../../../shared/molecules/ButtonScrollUp/ButtonScrollUp';
import { CategoryApi } from '../../interfaces';
import CategoryCard from '../../organisms/CategoryCard/CategoryCard';
import Filter from '../../../filterSort/organisms/Filter/Filter';
import GeneralLoader from '../../../shared/templates/GeneralLoader';
import IconPlus from '../../../../atoms/Icons/Stroke/IconPlus';
import { Link } from 'solid-app-router';
import { SelectTransform } from '../../../shared/utils/SelectTransform';
import { SelectValueOption } from '../../../shared/types/Selects';
import { filterBy } from '../../constants/filterBy';
import { orderBy } from '../../constants/orderBy';
import { permissions } from '../../../../config/permissions';
import useTransformTranslatedOptions from '../../../shared/hooks/useTransformTranslatedOptions';

interface CategoryListTemplateProps {
    categoryList: CategoryApi[] | undefined;
    removeAction: any;
    loading: boolean;
    viewMoreAction: any;
    nextPage: string | undefined;
}

const CategoryList: Component<CategoryListTemplateProps> = ( props ) =>
{
    const i18n = useI18n();
    const { t } = i18n;

    const { isOpen, onOpen, onClose } = createDisclosure();
    let deleteData: CategoryApi | undefined;

    const handleModalClick = () => () =>
    {
        props.removeAction( deleteData?.id );
        onClose();
    };

    const handleDelete = ( category: CategoryApi ) => () =>
    {
        deleteData = category;
        onOpen();
    };

    const { filterOptions } = useTransformTranslatedOptions( filterBy, ( item ) =>
        t( item.label )
    );

    const orderOptions = createMemo( () =>
        SelectTransform.getOptionsObjectArray<SelectValueOption>(
            orderBy,
            ( item ) => ( <Text message={item.label} /> ) as string,
            ( item ) => item.value
        )
    );

    return (
        <section class="section_container">
            <Modal opened={isOpen()} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalHeader>
                        <Text message="a_delete_data" />
                    </ModalHeader>
                    <ModalBody>
                        <p>
                            <Text message="c_remove" />
                        </p>
                        <h1>{deleteData?.title}</h1>
                    </ModalBody>
                    <ModalFooter class="modal_footer">
                        <Button onClick={onClose}>
                            <Text message="a_cancel" />
                        </Button>
                        <Button colorScheme="danger" onClick={handleModalClick()}>
                            <Text message="a_delete" />
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <header
                class="section_header_container"
                data-parent={permissions.CATEGORIES.SAVE}
            >
                <h1 class="section_title">
                    <Text message="c_list" />
                </h1>

                <div class="has-permission">
                    <Link href={'/categories/create'}>
                        <Button
                            leftIcon={
                                <Icon>
                                    <IconPlus />
                                </Icon>
                            }
                        >
                            <Text message="c_create" />
                        </Button>
                    </Link>
                </div>
            </header>

            <Filter filterOptions={filterOptions()} />

            <Show when={props.loading}>
                <GeneralLoader />
            </Show>

            <div class="grid_cards_container">
                <Show when={!props.loading || props.categoryList?.length}>
                    <For
                        each={props.categoryList}
                        fallback={
                            <div>
                                <Text message="c_no_categories" />
                            </div>
                        }
                    >
                        {( category ) => (
                            <CategoryCard
                                category={category}
                                onDelete={handleDelete( category )}
                            />
                        )}
                    </For>
                </Show>
            </div>

            <div class="section_bottom_buttons_container">
                <Show when={!!props.nextPage}>
                    <Button onClick={props.viewMoreAction()} variant="outline">
                        <Show
                            when={!props.loading}
                            fallback={() => (
                                <span>
                                    <Text message="a_loading" />
                  ...
                                </span>
                            )}
                        >
                            <Text message="a_view_more" />
                        </Show>
                    </Button>
                </Show>

                <ButtonScrollUp />
            </div>
        </section>
    );
};

export default CategoryList;
