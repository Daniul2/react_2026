import type {FC} from 'react';
import type {UserModel} from '../../models/UserModel.ts';

type PropType = { user: UserModel };

export const User: FC<PropType> = ({user}) => {
    const {
        id, firstName, lastName, username, age, gender, email, phone, birthDate, image,
        address: {address, city, country}, university, company, role
    } = user;

    return (
        <div className="bg-white rounded-xl shadow p-4 flex gap-4">
            <img src={image} alt={username} className="w-20 h-20 rounded-full bg-slate-100"/>
            <div>
                <h3 className="text-lg font-semibold">{id}. {firstName} {lastName} <span className="text-slate-500 font-normal">@{username}</span></h3>
                <ul className="text-sm mt-1 space-y-0.5">
                    <li>{gender}, {age} · born {birthDate} · {role}</li>
                    <li>Email: {email}</li>
                    <li>Phone: {phone}</li>
                    <li>Address: {address}, {city}, {country}</li>
                    <li>University: {university}</li>
                    <li>Company: {company.name} — {company.title}</li>
                </ul>
            </div>
        </div>
    );
};
