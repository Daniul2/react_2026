import {useEffect, useState} from 'react';
import type {UserModel} from '../../models/UserModel.ts';
import {loadUsers} from '../../service/api.service.ts';
import {User} from '../user-component/User.tsx';

export const Users = () => {
    const [users, setUsers] = useState<UserModel[]>([]);

    useEffect(() => {
        loadUsers().then(value => setUsers(value));
    }, []);

    return (
        <ul className="flex flex-col gap-1">
            {users.map(user => <User user={user} key={user.id}/>)}
        </ul>
    );
};
