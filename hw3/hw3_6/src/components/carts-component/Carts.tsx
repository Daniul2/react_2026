import {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import type {CartModel} from '../../models/CartModel.ts';
import {loadCartsOfUser} from '../../service/api.service.ts';
import {Cart} from '../cart-component/Cart.tsx';

type LoadedType = { userId: string; carts: CartModel[] };

export const Carts = () => {
    const {userId = ''} = useParams();
    const [loaded, setLoaded] = useState<LoadedType | null>(null);

    useEffect(() => {
        let ignore = false; // щоб відповідь попереднього користувача не перезаписала поточного
        loadCartsOfUser(userId).then(carts => {
            if (!ignore) setLoaded({userId, carts});
        });
        return () => {
            ignore = true;
        };
    }, [userId]);

    // поки не прийшли корзини саме цього користувача — показуємо завантаження
    if (loaded?.userId !== userId) return <p>Завантаження...</p>;
    if (!loaded.carts.length) return <p>У користувача {userId} немає корзин.</p>;

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Корзини користувача {userId}</h2>
            {loaded.carts.map(cart => <Cart cart={cart} key={cart.id}/>)}
        </div>
    );
};
