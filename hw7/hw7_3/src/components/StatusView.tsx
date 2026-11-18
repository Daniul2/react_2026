import type {FC} from 'react';

export const Loading = () => <p className="text-slate-500">Завантаження…</p>;

export const ErrorMessage: FC<{message: string}> = ({message}) => (
    <p className="rounded border border-red-300 bg-red-50 px-3 py-2 text-red-700">Помилка: {message}</p>
);
