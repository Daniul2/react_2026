import {useEffect, useState} from 'react';
import type {UserModel} from '../models/UserModel.ts';
import {loadUsers} from '../service/api.service.ts';
import {User} from '../components/user-component/User.tsx';

export const UsersPage = () => {
    const [users, setUsers] = useState<UserModel[]>([]);

    useEffect(() => {
        loadUsers().then(value => setUsers(value));
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Users</h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {users.map(user => <User user={user} key={user.id}/>)}
            </div>
        </div>
    );
};
