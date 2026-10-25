import type {UserModel} from './UserModel.ts';
import type {CartModel} from './CartModel.ts';

interface BaseResponseModel {
    total: number;
    skip: number;
    limit: number;
}

export interface UsersResponseModel extends BaseResponseModel {
    users: UserModel[];
}

export interface CartsResponseModel extends BaseResponseModel {
    carts: CartModel[];
}
