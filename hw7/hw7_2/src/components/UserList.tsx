// memo — щоб список не перемальовувався, поки його пропси ті самі
import {memo} from 'react';
// Тільки типи
import type {FC} from 'react';
import type {IUser} from '../models/IUser.ts';
// Дочірній елемент списку (теж у memo)
import {UserItem} from './UserItem.tsx';

// Пропси списку
interface IProps {
    users: IUser[];                     // відфільтрований масив — стабільний завдяки useMemo у App
    selectedId: number | null;          // хто зараз виділений
    onSelect: (id: number) => void;     // стабільний колбек з useCallback
}

// Список у memo. Якби App передавав новий масив або нову функцію на кожному рендері,
// memo не допоміг би — порівняння пропсів іде по посиланню
export const UserList: FC<IProps> = memo(({users, selectedId, onSelect}) => {
    // Лог, щоб у консолі було видно, КОЛИ список реально ререндериться
    console.log('🔁 UserList render, елементів:', users.length);

    // Показуємо перші 100, щоб DOM не був величезним
    return (
        <ul className="max-h-96 overflow-auto rounded border border-slate-300 bg-white p-2 text-sm">
            {users.slice(0, 100).map(user => (
                <UserItem
                    key={user.id}                           // стабільний ключ для React
                    user={user}                             // той самий об'єкт між рендерами
                    isSelected={user.id === selectedId}     // true лише для одного елемента
                    onSelect={onSelect}                     // та сама функція між рендерами
                />
            ))}
        </ul>
    );
});
