// Typed hook for reading data from the store.
import {useAppSelector} from '../redux/hooks/useAppSelector.ts';
// Selector that returns the statuses of all three slices.
import {selectLoadStatuses} from '../redux/selectors/complexSelectors.ts';
// Loading status type — the key for the color map.
import type {LoadStatus} from '../models/LoadStatus.ts';

// Dot color for every status: grey — empty, yellow — loading, green — in the store, red — error.
const dotColor: Record<LoadStatus, string> = {
    idle: 'bg-slate-500',
    loading: 'bg-amber-400',
    succeeded: 'bg-emerald-400',
    failed: 'bg-red-500',
};

// Slice labels shown next to the dots (keys match the keys of selectLoadStatuses).
const labels = {users: 'users', posts: 'posts', comments: 'comments'} as const;

// StoreIndicator component: renders a small panel of three colored dots in the menu,
// showing whether users / posts / comments are already in the store. Has no props — reads data from the store.
export const StoreIndicator = () => {
    // Statuses object {users, posts, comments} from the store; the component re-renders when a status changes.
    const statuses = useAppSelector(selectLoadStatuses);

    return (
        // Row with a label and dots; title — a tooltip on mouse hover.
        <div className="flex items-center gap-3 text-xs text-slate-300" title="Grey — empty, yellow — loading, green — in the store">
            {/* Panel label. */}
            <span>store:</span>
            {/* For every slice draw a dot of the right color and its name. */}
            {(Object.keys(labels) as (keyof typeof labels)[]).map(key => (
                // key — slice name, unique within the list.
                <span key={key} className="flex items-center gap-1">
                    {/* Round dot; its color depends on this slice's status. */}
                    <span className={`inline-block h-2 w-2 rounded-full ${dotColor[statuses[key]]}`}/>
                    {/* Slice name. */}
                    {labels[key]}
                </span>
            ))}
        </div>
    );
};
