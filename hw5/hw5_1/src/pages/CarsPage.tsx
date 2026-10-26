import {useEffect, useState} from 'react';
import type {CarModel} from '../models/CarModel.ts';
import {getCars} from '../services/api.service.ts';

export const CarsPage = () => {
    const [cars, setCars] = useState<CarModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        getCars()
            .then(value => setCars(value))
            .catch(() => setError('Не вдалося завантажити автівки'))
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) return <p>Завантаження...</p>;
    if (error) return <p className="text-red-600">{error}</p>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Cars ({cars.length})</h2>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {cars.map(({id, brand, price, year}) => (
                    <li key={id} className="bg-white rounded-xl shadow p-4">
                        <p className="font-semibold">{id}. {brand}</p>
                        <p className="text-sm text-slate-600">{year} · ${price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
