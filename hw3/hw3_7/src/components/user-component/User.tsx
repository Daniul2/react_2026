import type {FC} from 'react';
import {Link} from 'react-router';
import type {UserModel} from '../../models/UserModel.ts';

type PropType = { user: UserModel };

export const User: FC<PropType> = ({user}) => {
    const {id, firstName, lastName, email, image} = user;

    return (
        <li>
            {/* state — щоб на сторінці корзин показати ім'я без додаткового запиту */}
            <Link
                to={`/users/${id}/carts`}
                state={{user}}
                className="flex items-center gap-3 rounded-lg p-2 bg-white hover:bg-slate-200 transition-colors"
            >
                <img src={image} alt={firstName} className="w-10 h-10 rounded-full bg-slate-100"/>
                <div>
                    <p className="font-medium">{id}. {firstName} {lastName}</p>
                    <p className="text-xs text-slate-500">{email}</p>
                </div>
            </Link>
        </li>
    );
};
