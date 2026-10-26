import {useEffect, useState} from 'react';
import {loadProducts} from '../../service/api.service.ts';
import type {ProductModel} from '../../models/ProductModel.ts';
import {Product} from '../product-component/Product.tsx';

export const Products = () => {
    const [products, setProducts] = useState<ProductModel[]>([]);

    useEffect(() => {
        loadProducts().then(value => setProducts(value));
    }, []);

    return (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {
                products.map(product => <Product product={product} key={product.id}/>)
            }
        </div>
    );
};
