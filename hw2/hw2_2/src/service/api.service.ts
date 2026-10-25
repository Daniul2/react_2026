import type {ProductModel} from '../models/ProductModel.ts';
import type {ProductsResponseModel} from '../models/ProductsResponseModel.ts';

const endpointProducts = import.meta.env.VITE_API_BASE_URL + '/products';

const loadProducts = async (): Promise<ProductModel[]> => {
    return await fetch(endpointProducts)
        .then(value => value.json())
        .then(({products}: ProductsResponseModel) => products);
};

export {loadProducts};
