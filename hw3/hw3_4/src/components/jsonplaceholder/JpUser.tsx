import type {FC} from 'react';
import type {UserModel} from '../../models/jsonplaceholder/UserModel.ts';

type PropType = { user: UserModel };

export const JpUser: FC<PropType> = ({user}) => {
    const {id, name, username, email, phone, website, address: {street, suite, city, zipcode}, company} = user;

    return (
        <div className="bg-white rounded-xl shadow p-4">
            <h3 className="text-lg font-semibold">{id}. {name} <span className="text-slate-500 font-normal">@{username}</span></h3>
            <ul className="text-sm mt-2 space-y-0.5">
                <li>Email: {email}</li>
                <li>Phone: {phone}</li>
                <li>Website: {website}</li>
                <li>Address: {street}, {suite}, {city}, {zipcode}</li>
                <li>Company: {company.name} — <i>{company.catchPhrase}</i></li>
            </ul>
        </div>
    );
};
