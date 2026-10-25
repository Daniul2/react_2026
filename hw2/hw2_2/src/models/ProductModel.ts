import type {DimensionsModel} from './DimensionsModel.ts';
import type {ReviewModel} from './ReviewModel.ts';
import type {MetaModel} from './MetaModel.ts';

export interface ProductModel {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand?: string;
    sku: string;
    weight: number;
    dimensions: DimensionsModel;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: ReviewModel[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: MetaModel;
    images: string[];
    thumbnail: string;
}
