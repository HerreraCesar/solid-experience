import {
    ProductListResponse,
    ProductPayload,
    ProductResponse
} from '../interfaces';

import { AxiosRequestConfig } from 'axios';
import HttpService from '../../../services/HttpService';
import PayloadProps from '../../shared/interfaces/PayloadProps';
import { config } from '../../shared/repositories/config';

const { baseUrl } = config.apiGateway.server;
const { getAll, remove, update, create, getOne } =
  config.apiGateway.routes.products;

class ProductRepository
{
    public getProducts ( { user, queryParams }: PayloadProps )
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${getAll}`,
        };

        return HttpService.request<ProductListResponse>( {
            config,
            queryParams,
            user,
        } );
    }

    public getOne ( { id, user }: PayloadProps )
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${getOne}/${id}`,
        };

        return HttpService.request<ProductResponse>( { config, user } );
    }

    public updateProduct ( { id, data, user }: PayloadProps<ProductPayload> )
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${update}/${id}`,
            method: 'PUT',
            data,
        };

        return HttpService.request<ProductResponse>( { config, user } );
    }

    public createProduct ( { data, user }: PayloadProps<ProductPayload> )
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${create}`,
            method: 'POST',
            data,
        };

        return HttpService.request<ProductResponse>( { config, user } );
    }

    public removeProduct ( { id, user }: PayloadProps )
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${remove}/${id}`,
            method: 'DELETE',
        };

        return HttpService.request<ProductResponse>( { config, user } );
    }
}

export default ProductRepository;
