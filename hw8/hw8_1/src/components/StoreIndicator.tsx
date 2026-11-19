import {useAppSelector} from '../redux/hooks/useAppSelector.ts';
import {selectLoadStatuses} from '../redux/selectors/complexSelectors.ts';
import type {LoadStatus} from '../models/LoadStatus.ts';

const dotColor: Record<LoadStatus, string> = {
    idle: 'bg-slate-500',
    loading: 'bg-amber-400',
    succeeded: 'bg-emerald-400',
    failed: 'bg-red-500',
};

const labels = {users: 'users', posts: 'posts', comments: 'comments'} as const;

// Маленька панель у меню: які дані вже лежать у сторі
export const StoreIndicator = () => {
    const statuses = useAppSelector(selectLoadStatuses);

    return (
        <div className="flex items-center gap-3 text-xs text-slate-300" title="Сірий — порожньо, жовтий — вантажиться, зелений — у сторі">
            <span>store:</span>
            {(Object.keys(labels) as (keyof typeof labels)[]).map(key => (
                <span key={key} className="flex items-center gap-1">
                    <span className={`inline-block h-2 w-2 rounded-full ${dotColor[statuses[key]]}`}/>
                    {labels[key]}
                </span>
            ))}
        </div>
    );
};
