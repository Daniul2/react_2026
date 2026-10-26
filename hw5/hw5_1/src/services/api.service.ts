import axios from 'axios';
import type {CarModel} from '../models/CarModel.ts';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {'Content-Type': 'application/json'},
});

const getCars = async (): Promise<CarModel[]> => {
    const {data} = await axiosInstance.get<CarModel[]>('/cars');
    return data;
};

const addCar = async (car: CarModel): Promise<CarModel> => {
    const {data} = await axiosInstance.post<CarModel>('/cars', car);
    return data;
};

export {getCars, addCar};
