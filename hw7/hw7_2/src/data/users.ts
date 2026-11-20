// Import only the type — it won't get into the built JS (verbatimModuleSyntax)
import type {IUser} from '../models/IUser.ts';

// Base names used to build a big list
const NAMES = ['Олена', 'Андрій', 'Марія', 'Тарас', 'Ірина', 'Богдан', 'Софія', 'Дмитро', 'Катерина', 'Остап'];

// 5000 users — enough to make filtering + sorting noticeably "expensive"
export const users: IUser[] = Array.from({length: 5000}, (_, i) => ({
    id: i + 1,                                        // id from 1 to 5000
    name: `${NAMES[i % NAMES.length]} #${i + 1}`,     // e.g. "<name> #3"
    age: 18 + ((i * 37) % 50),                        // pseudo-random age 18–67
}));
