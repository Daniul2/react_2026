import {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router';
import type {ProductsResponseModel} from '../models/ResponseModels.ts';
import {loadProducts, PRODUCTS_PER_PAGE} from '../service/api.service.ts';
import {Product} from '../components/product-component/Product.tsx';
import {Pagination} from '../components/pagination-component/Pagination.tsx';

export const ProductsPage = () => {
    const [searchParams] = useSearchParams();
    // номер сторінки береться з url (?page=2), некоректне значення -> 1
    const page = Math.max(1, Number(searchParams.get('page')) || 1);

    const [response, setResponse] = useState<ProductsResponseModel | null>(null);

    useEffect(() => {
        let ignore = false;
        loadProducts(page).then(value => {
            if (!ignore) setResponse(value);
        });
        return () => {
            ignore = true;
        };
    }, [page]);

    const totalPages = response ? Math.ceil(response.total / PRODUCTS_PER_PAGE) : 0;

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold">Products</h2>
            <Pagination page={page} totalPages={totalPages}/>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {response?.products.map(product => <Product product={product} key={product.id}/>)}
            </div>
            {response && !response.products.length && <p>На цій сторінці немає продуктів.</p>}
            <Pagination page={page} totalPages={totalPages}/>
        </div>
    );
};
