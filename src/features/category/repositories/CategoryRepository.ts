import {
    CategoryListResponse,
    CategoryPayload,
    CategoryResponse
} from '../interfaces';

import { AxiosRequestConfig } from 'axios';
import HttpService from '../../../services/HttpService';
import PayloadProps from '../../shared/interfaces/PayloadProps';
import { config } from '../../shared/repositories/config';

const { baseUrl } = config.apiGateway.server;
const { getAll, remove, update, create, getOne } =
  config.apiGateway.routes.categories;

class CategoryRepository
{
    public async getCategories ( { queryParams, user }: PayloadProps )
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${getAll}`,
        };

        return HttpService.request<CategoryListResponse>( {
            config,
            queryParams,
            user,
        } );
    }

    public async getOne ( { id, user }: PayloadProps )
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${getOne}/${id}`,
        };

        return HttpService.request<CategoryResponse>( { config, user } );
    }

    public async updateCategory ( {
        id,
        data,
        user,
    }: PayloadProps<CategoryPayload> )
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${update}/${id}`,
            method: 'PUT',
            data,
        };

        return HttpService.request<CategoryResponse>( { config, user } );
    }

    public createCategory ( { data, user }: PayloadProps<CategoryPayload> )
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${create}`,
            method: 'POST',
            data,
        };

        return HttpService.request<CategoryResponse>( { config, user } );
    }

    public removeCategory ( { id, user }: PayloadProps )
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${remove}/${id}`,
            method: 'DELETE',
        };

        return HttpService.request<CategoryResponse>( { config, user } );
    }
}

export default CategoryRepository;
