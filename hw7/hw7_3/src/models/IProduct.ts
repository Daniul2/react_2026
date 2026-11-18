import type {IDummyResponse} from './IDummyResponse.ts';

export interface IProduct {
    id: number;
    title: string;
    price: number;
    category: string;
}

export interface IProductsResponse extends IDummyResponse {
    products: IProduct[];
}
