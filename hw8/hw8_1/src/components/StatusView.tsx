import type {FC} from 'react';

export const Loading = () => <p className="text-slate-500">Завантаження…</p>;

interface IErrorMessageProps {
    message: string;
    onRetry?: () => void;
}

export const ErrorMessage: FC<IErrorMessageProps> = ({message, onRetry}) => (
    <div className="flex items-center gap-3 rounded border border-red-300 bg-red-50 px-3 py-2 text-red-700">
        <span>Помилка: {message}</span>
        {onRetry && (
            <button type="button" onClick={onRetry} className="cursor-pointer rounded bg-red-600 px-2 py-0.5 text-sm text-white">
                Спробувати ще
            </button>
        )}
    </div>
);
