// memo — a HOC that skips re-rendering if props did not change (compared with Object.is)
import {memo} from 'react';
// Types only — they won't get into the bundle
import type {FC} from 'react';
import type {IUser} from '../models/IUser.ts';

// Describe the item props
interface IProps {
    user: IUser;                        // the user itself (reference to an object from the users array — stable)
    isSelected: boolean;                // whether it is selected — a primitive, compared by value
    onSelect: (id: number) => void;     // callback — stable thanks to useCallback in App
}

// Wrap the component in memo: when the counter in App changes, this item does NOT re-render,
// because user, isSelected and onSelect stayed the same
export const UserItem: FC<IProps> = memo(({user, isSelected, onSelect}) => {
    // Markup of one row; a click passes the id up through onSelect
    return (
        <li
            onClick={() => onSelect(user.id)}
            className={`cursor-pointer rounded px-2 py-1 ${isSelected ? 'bg-sky-500 text-white' : 'hover:bg-slate-200'}`}
        >
            {user.name} — {user.age} р.
        </li>
    );
});
