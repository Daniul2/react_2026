import type {FC} from 'react';
import type {CartModel} from '../../models/CartModel.ts';

type PropType = { cart: CartModel };

export const Cart: FC<PropType> = ({cart: {id, products, total, discountedTotal, totalProducts, totalQuantity}}) => {
    return (
        <div className="bg-white rounded-xl shadow p-4">
            <h3 className="text-lg font-semibold mb-3">Cart #{id}</h3>
            <ul className="flex flex-col gap-2">
                {products.map(({id, title, price, quantity, total, thumbnail}) => (
                    <li key={id} className="flex items-center gap-3">
                        <img src={thumbnail} alt={title} className="w-12 h-12 object-contain bg-slate-100 rounded"/>
                        <span className="flex-1">{title}</span>
                        <span className="text-sm text-slate-500">${price} × {quantity}</span>
                        <span className="font-medium w-20 text-right">${total}</span>
                    </li>
                ))}
            </ul>
            <div className="border-t border-slate-200 mt-3 pt-3 text-sm flex flex-wrap gap-x-6">
                <span>Products: {totalProducts}</span>
                <span>Quantity: {totalQuantity}</span>
                <span>Total: <s>${total}</s> <b>${discountedTotal}</b></span>
            </div>
        </div>
    );
};
