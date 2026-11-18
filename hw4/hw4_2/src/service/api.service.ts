import type {ProductsResponseModel} from '../models/ResponseModels.ts';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const PRODUCTS_PER_PAGE = 30;

const loadProducts = async (page: number): Promise<ProductsResponseModel> => {
    const skip = (page - 1) * PRODUCTS_PER_PAGE;
    return await fetch(`${baseUrl}/products?limit=${PRODUCTS_PER_PAGE}&skip=${skip}`)
        .then(value => value.json());
};

export {loadProducts};
