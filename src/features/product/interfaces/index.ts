import Base from '../../shared/interfaces/Base';
import { CategoryApi } from '../../category/interfaces';
import { IBodyApi } from '../../shared/interfaces/response/IBodyApi';
import { IPaginatedBodyApi } from '../../shared/interfaces/response/IPaginatedBodyApi';

export interface Product {
    title: string;
    price: number;
    category: CategoryApi;
    enable: boolean;
}

export type ProductPayload = {
    title: string;
    price: number;
    category: string;
    enable: boolean;
};

export interface ProductApi extends Product, Base {}

export type ProductResponse = IBodyApi & {
    data: ProductApi;
};

export type ProductListResponse = IPaginatedBodyApi & {
    data: ProductApi[];
};
