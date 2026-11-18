// memo — HOC, який пропускає ререндер, якщо пропси не змінились (порівняння через Object.is)
import {memo} from 'react';
// Тільки типи — у бандл не потраплять
import type {FC} from 'react';
import type {IUser} from '../models/IUser.ts';

// Описуємо пропси елемента
interface IProps {
    user: IUser;                        // сам користувач (посилання на об'єкт з масиву users — стабільне)
    isSelected: boolean;                // чи виділений — примітив, порівнюється за значенням
    onSelect: (id: number) => void;     // колбек — буде стабільним завдяки useCallback у App
}

// Обгортаємо компонент у memo: при зміні лічильника в App цей елемент НЕ ререндериться,
// бо user, isSelected та onSelect залишились тими самими
export const UserItem: FC<IProps> = memo(({user, isSelected, onSelect}) => {
    // Розмітка одного рядка; клік передає id нагору через onSelect
    return (
        <li
            onClick={() => onSelect(user.id)}
            className={`cursor-pointer rounded px-2 py-1 ${isSelected ? 'bg-sky-500 text-white' : 'hover:bg-slate-200'}`}
        >
            {user.name} — {user.age} р.
        </li>
    );
});
