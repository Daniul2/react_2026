import {useFetch} from '../hooks/useFetch.ts';
import {urls} from '../constants/urls.ts';
import type {IProductsResponse} from '../models/IProduct.ts';
import {ErrorMessage, Loading} from './StatusView.tsx';

export const ProductsList = () => {
    const state = useFetch<IProductsResponse>(urls.products);

    if (state.status === 'loading') return <Loading/>;
    if (state.status === 'error') return <ErrorMessage message={state.error}/>;

    return (
        <ul className="flex flex-col gap-1">
            {state.data.products.map(product => (
                <li key={product.id} className="flex justify-between rounded bg-white px-3 py-2">
                    <span><b>{product.title}</b> <span className="text-slate-500">· {product.category}</span></span>
                    <span>${product.price}</span>
                </li>
            ))}
        </ul>
    );
};
