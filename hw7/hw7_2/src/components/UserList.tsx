// memo — so the list doesn't re-render while its props are the same
import {memo} from 'react';
// Types only
import type {FC} from 'react';
import type {IUser} from '../models/IUser.ts';
// Child list item (also in memo)
import {UserItem} from './UserItem.tsx';

// List props
interface IProps {
    users: IUser[];                     // filtered array — stable thanks to useMemo in App
    selectedId: number | null;          // who is selected right now
    onSelect: (id: number) => void;     // stable callback from useCallback
}

// The list in memo. If App passed a new array or a new function on every render,
// memo would not help — props are compared by reference
export const UserList: FC<IProps> = memo(({users, selectedId, onSelect}) => {
    // Log so the console shows WHEN the list actually re-renders
    console.log('🔁 UserList render, елементів:', users.length);

    // Show the first 100 so the DOM is not huge
    return (
        <ul className="max-h-96 overflow-auto rounded border border-slate-300 bg-white p-2 text-sm">
            {users.slice(0, 100).map(user => (
                <UserItem
                    key={user.id}                           // stable key for React
                    user={user}                             // the same object between renders
                    isSelected={user.id === selectedId}     // true only for one item
                    onSelect={onSelect}                     // the same function between renders
                />
            ))}
        </ul>
    );
});
