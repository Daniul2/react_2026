import type {FC} from 'react';
import type {ProductModel} from '../../models/ProductModel.ts';

type PropType = { product: ProductModel };

export const Product: FC<PropType> = ({product}) => {
    const {id, title, description, category, price, discountPercentage, rating, stock, tags, brand, availabilityStatus, thumbnail} = product;

    return (
        <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-3">
            <div className="flex gap-4">
                <img src={thumbnail} alt={title} className="w-24 h-24 object-contain bg-slate-100 rounded"/>
                <div>
                    <h3 className="text-lg font-semibold">{id}. {title}</h3>
                    <p className="text-sm text-slate-500">{category}{brand && ` · ${brand}`}</p>
                    <p className="text-lg font-bold">${price} <span className="text-sm text-green-600">-{discountPercentage}%</span></p>
                    <p className="text-sm">Rating: {rating} ★ · Stock: {stock} · {availabilityStatus}</p>
                </div>
            </div>
            <p className="text-sm">{description}</p>
            <div className="flex flex-wrap gap-2">
                {tags.map(tag => <span key={tag} className="text-xs bg-slate-200 rounded px-2 py-1">#{tag}</span>)}
            </div>
        </div>
    );
};
