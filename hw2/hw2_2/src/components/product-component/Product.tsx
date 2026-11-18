import type {FC} from 'react';
import type {ProductModel} from '../../models/ProductModel.ts';
import {Review} from '../review-component/Review.tsx';

type PropType = { product: ProductModel };

export const Product: FC<PropType> = ({product}) => {
    const {
        id, title, description, category, price, discountPercentage, rating, stock, tags, brand,
        sku, weight, dimensions: {width, height, depth}, warrantyInformation, shippingInformation,
        availabilityStatus, reviews, returnPolicy, minimumOrderQuantity,
        meta: {createdAt, updatedAt, barcode, qrCode}, images, thumbnail
    } = product;

    return (
        <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-3">
            <div className="flex gap-4">
                <img src={thumbnail} alt={title} className="w-24 h-24 object-contain bg-slate-100 rounded"/>
                <div>
                    <h2 className="text-xl font-semibold">{id}. {title}</h2>
                    <p className="text-sm text-slate-500">{category}{brand && ` · ${brand}`}</p>
                    <p className="text-lg font-bold">${price} <span className="text-sm text-green-600">-{discountPercentage}%</span></p>
                    <p className="text-sm">Rating: {rating} ★</p>
                </div>
            </div>

            <p>{description}</p>

            <div className="flex flex-wrap gap-2">
                {tags.map(tag => <span key={tag} className="text-xs bg-slate-200 rounded px-2 py-1">#{tag}</span>)}
            </div>

            <ul className="text-sm grid grid-cols-2 gap-x-4 gap-y-1">
                <li>SKU: {sku}</li>
                <li>Stock: {stock}</li>
                <li>Status: {availabilityStatus}</li>
                <li>Min order: {minimumOrderQuantity}</li>
                <li>Weight: {weight}</li>
                <li>Size: {width} × {height} × {depth}</li>
                <li>Warranty: {warrantyInformation}</li>
                <li>Shipping: {shippingInformation}</li>
                <li className="col-span-2">Return policy: {returnPolicy}</li>
            </ul>

            <div className="flex flex-wrap gap-2">
                {images.map(image => <img key={image} src={image} alt={title} className="w-20 h-20 object-contain bg-slate-100 rounded"/>)}
            </div>

            <div>
                <h3 className="font-semibold mb-2">Reviews</h3>
                <div className="flex flex-col gap-2">
                    {reviews.map((review, index) => <Review review={review} key={index}/>)}
                </div>
            </div>

            <div className="text-xs text-slate-500 flex items-center gap-3 border-t pt-3">
                <img src={qrCode} alt="QR code" className="w-14 h-14"/>
                <div>
                    <p>Barcode: {barcode}</p>
                    <p>Created: {new Date(createdAt).toLocaleString()}</p>
                    <p>Updated: {new Date(updatedAt).toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};
