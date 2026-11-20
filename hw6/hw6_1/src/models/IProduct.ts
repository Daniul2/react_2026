// Description of one dummyjson product (structure of an object in the products array).
export interface IProduct {
    // Unique product identifier.
    id: number;
    // Title.
    title: string;
    // Description.
    description: string;
    // Category (e.g. "beauty").
    category: string;
    // Price.
    price: number;
    // Discount in percent.
    discountPercentage: number;
    // Rating (0–5).
    rating: number;
    // Quantity in stock.
    stock: number;
    // Array of tags.
    tags: string[];
    // Brand.
    brand: string;
    // SKU (stock keeping unit).
    sku: string;
    // Weight.
    weight: number;
    // Dimensions — a nested object described by the IDimensions interface below.
    dimensions: IDimensions;
    // Warranty information.
    warrantyInformation: string;
    // Shipping information.
    shippingInformation: string;
    // Availability status ("In Stock", "Low Stock"...).
    availabilityStatus: string;
    // Array of reviews (each described by IReviews).
    reviews: IReviews[];
    // Return policy.
    returnPolicy: string;
    // Minimum order quantity.
    minimumOrderQuantity: number;
    // Service information (IMeta).
    meta: IMeta;
    // Array of image links.
    images: string[];
    // Thumbnail link.
    thumbnail: string;
}

// Product dimensions. No export — used only inside this file.
interface IDimensions {
    // Width.
    width: number;
    // Height.
    height: number;
    // Depth.
    depth: number;
}

// One product review.
interface IReviews {
    // Review rating (1–5).
    rating: number;
    // Review text.
    comment: string;
    // Review date (ISO string).
    date: string;
    // Author name.
    reviewerName: string;
    // Author email.
    reviewerEmail: string;
}

// Product service data.
interface IMeta {
    // Created at (ISO date).
    createdAt: string;
    // Updated at.
    updatedAt: string;
    // Barcode.
    barcode: string;
    // QR code image link.
    qrCode: string;
}
