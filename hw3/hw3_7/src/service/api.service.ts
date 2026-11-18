import type {UserModel} from '../models/UserModel.ts';
import type {CartModel} from '../models/CartModel.ts';
import type {CartsResponseModel, UsersResponseModel} from '../models/ResponseModels.ts';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

// limit=0 — всі користувачі, а не лише перші 30
const loadUsers = async (): Promise<UserModel[]> => {
    return await fetch(baseUrl + '/users?limit=0')
        .then(value => value.json())
        .then(({users}: UsersResponseModel) => users);
};

const loadCartsOfUser = async (userId: string): Promise<CartModel[]> => {
    return await fetch(baseUrl + '/carts/user/' + userId)
        .then(value => value.json())
        .then(({carts}: CartsResponseModel) => carts);
};

export {loadUsers, loadCartsOfUser};
