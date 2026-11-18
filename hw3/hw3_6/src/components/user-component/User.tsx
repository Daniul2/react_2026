import type {FC} from 'react';
import {NavLink} from 'react-router';
import type {UserModel} from '../../models/UserModel.ts';

type PropType = { user: UserModel };

export const User: FC<PropType> = ({user: {id, firstName, lastName, email, image}}) => {
    return (
        <li>
            <NavLink
                to={`users/${id}/carts`}
                className={({isActive}) =>
                    `flex items-center gap-3 rounded-lg p-2 transition-colors ${
                        isActive ? 'bg-slate-900 text-white' : 'bg-white hover:bg-slate-200'
                    }`
                }
            >
                <img src={image} alt={firstName} className="w-10 h-10 rounded-full bg-slate-100"/>
                <div>
                    <p className="font-medium">{id}. {firstName} {lastName}</p>
                    <p className="text-xs opacity-70">{email}</p>
                </div>
            </NavLink>
        </li>
    );
};
