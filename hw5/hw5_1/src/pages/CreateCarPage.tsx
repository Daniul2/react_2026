import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';
import {Link} from 'react-router';
import type {CarModel} from '../models/CarModel.ts';
import {addCar} from '../services/api.service.ts';
import {carValidator} from '../validators/carValidator.ts';

const inputClass = 'w-full rounded border border-slate-300 bg-white px-3 py-2 focus:outline-2 focus:outline-slate-900';

export const CreateCarPage = () => {
    const {register, handleSubmit, reset, formState: {errors, isValid, isSubmitting}} = useForm<CarModel>({
        mode: 'all',
        resolver: joiResolver(carValidator),
    });
    const [createdCar, setCreatedCar] = useState<CarModel | null>(null);
    const [serverError, setServerError] = useState('');

    const createHandler = async (car: CarModel) => {
        setServerError('');
        setCreatedCar(null);
        try {
            setCreatedCar(await addCar(car));
            reset();
        } catch {
            setServerError('Не вдалося зберегти авто, спробуйте ще раз');
        }
    };

    return (
        <div className="max-w-md">
            <h2 className="text-2xl font-bold mb-4">Create car</h2>
            <form onSubmit={handleSubmit(createHandler)} className="flex flex-col gap-4 bg-white rounded-xl shadow p-6">
                <label className="flex flex-col gap-1">
                    <span className="font-medium">Brand</span>
                    <input type="text" className={inputClass} {...register('brand')}/>
                    <span className="text-sm text-red-600">{errors.brand?.message}</span>
                </label>
                <label className="flex flex-col gap-1">
                    <span className="font-medium">Price</span>
                    <input type="number" className={inputClass} {...register('price', {valueAsNumber: true})}/>
                    <span className="text-sm text-red-600">{errors.price?.message}</span>
                </label>
                <label className="flex flex-col gap-1">
                    <span className="font-medium">Year</span>
                    <input type="number" className={inputClass} {...register('year', {valueAsNumber: true})}/>
                    <span className="text-sm text-red-600">{errors.year?.message}</span>
                </label>
                <button
                    disabled={!isValid || isSubmitting}
                    className="rounded px-4 py-2 font-medium bg-slate-900 text-white hover:bg-slate-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Збереження...' : 'Save car'}
                </button>
                {serverError && <p className="text-red-600">{serverError}</p>}
                {createdCar && (
                    <p className="text-green-700">
                        Авто #{createdCar.id} {createdCar.brand} створено. <Link to="/cars" className="underline">До списку</Link>
                    </p>
                )}
            </form>
        </div>
    );
};
