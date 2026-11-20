// Import the type of one product to describe the products array.
import {IProduct} from "./IProduct";

// Structure of the GET /auth/products response (dummyjson returns a list with "pagination" fields).
// type is used here (not interface) — for describing an object they work the same.
export type IProductsResponseModelType = {
    // Total number of products on the server.
    total: number;
    // How many products were skipped (offset from the start).
    skip: number;
    // How many products are returned in this response (30 by default).
    limit: number;
    // The products array itself.
    products: IProduct[]

}
