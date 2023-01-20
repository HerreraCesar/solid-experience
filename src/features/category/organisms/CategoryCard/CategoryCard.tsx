import Card from '../../../shared/molecules/Card/Card';
import CardContent from '../../../shared/molecules/CardContent/CardContent';
import { CategoryApi } from '../../interfaces';
import { Component } from 'solid-js';
import { IconButton } from '@hope-ui/solid';
import IconPencilAlt from '../../../../atoms/Icons/Stroke/IconPencilAlt';
import IconTrash from '../../../../atoms/Icons/Stroke/IconTrash';
import { Link } from 'solid-app-router';

interface CategoryCardProps {
    category: CategoryApi;
    onDelete: () => void;
}

const CategoryCard: Component<CategoryCardProps> = ( props ) => (
    <Card>
        <CardContent class="card_container">
            <div class="card_media_object">
                <h6 class="card_media_object_title" data-parent="categoriesShow">
                    <Link
                        class="card_media_object_link has-permission"
                        href={`/categories/${props.category.id}/update`}
                    >
                        {props.category.title}
                    </Link>
                </h6>
            </div>

            <div class="card_third">
                <div data-parent="categoriesUpdate">
                    <div class="has-permission">
                        <Link href={`/categories/${props.category.id}/update`}>
                            <IconButton
                                aria-label="Edit"
                                variant="ghost"
                                icon={<IconPencilAlt />}
                                compact
                                colorScheme="success"
                            />
                        </Link>
                    </div>
                </div>
                <div data-parent="categoriesDelete">
                    <IconButton
                        class="has-permission"
                        aria-label="Delete Category"
                        variant="ghost"
                        icon={<IconTrash />}
                        compact
                        colorScheme="danger"
                        onClick={props.onDelete}
                    />
                </div>
            </div>
        </CardContent>
    </Card>
);

export default CategoryCard;
