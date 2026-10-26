import type {ProductModel} from './ProductModel.ts';

export interface ProductsResponseModel {
    products: ProductModel[];
    total: number;
    skip: number;
    limit: number;
}
