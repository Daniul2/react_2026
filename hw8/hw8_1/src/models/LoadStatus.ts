// idle — ще не вантажили; loading — запит у процесі; succeeded — дані в сторі; failed — помилка
export type LoadStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

// Спільна "форма" стану для кожного слайсу з даними
export interface IListState<T> {
    items: T[];
    status: LoadStatus;
    error: string | null;
}
