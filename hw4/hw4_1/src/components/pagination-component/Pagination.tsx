import type {FC} from 'react';
import {useSearchParams} from 'react-router';

type PropType = { page: number; totalPages: number };

export const Pagination: FC<PropType> = ({page, totalPages}) => {
    const [, setSearchParams] = useSearchParams();

    const goTo = (newPage: number) => {
        setSearchParams({page: String(newPage)});
        window.scrollTo({top: 0});
    };

    const buttonClass = 'rounded px-4 py-2 font-medium bg-slate-900 text-white hover:bg-slate-700 ' +
        'disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed';

    return (
        <div className="flex items-center justify-center gap-4">
            <button className={buttonClass} disabled={page <= 1} onClick={() => goTo(page - 1)}>
                ← Назад
            </button>
            <span className="text-slate-600">Сторінка {page} з {totalPages || '…'}</span>
            <button className={buttonClass} disabled={!totalPages || page >= totalPages} onClick={() => goTo(page + 1)}>
                Вперед →
            </button>
        </div>
    );
};
