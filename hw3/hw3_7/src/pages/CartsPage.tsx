import {Link, useLocation, useParams} from 'react-router';
import type {UserModel} from '../models/UserModel.ts';
import {Carts} from '../components/carts-component/Carts.tsx';

export const CartsPage = () => {
    const {userId} = useParams();
    // якщо сторінку відкрили напряму за адресою — state порожній, показуємо лише id
    const user = (useLocation().state as { user?: UserModel } | null)?.user;

    return (
        <div className="flex flex-col gap-4">
            <Link to="/" className="text-blue-600 hover:underline w-fit">← До всіх користувачів</Link>
            <h2 className="text-2xl font-bold">
                Корзини користувача {user ? `${user.firstName} ${user.lastName}` : `#${userId}`}
            </h2>
            <Carts/>
        </div>
    );
};
