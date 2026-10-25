import {useEffect, useState} from 'react';
import type {UserModel} from '../models/jsonplaceholder/UserModel.ts';
import {loadJsonPlaceholderUsers} from '../service/jsonplaceholder.service.ts';
import {JpUser} from '../components/jsonplaceholder/JpUser.tsx';

export const UsersJsonPlaceholderPage = () => {
    const [users, setUsers] = useState<UserModel[]>([]);

    useEffect(() => {
        loadJsonPlaceholderUsers().then(value => setUsers(value));
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Users · JSONPlaceholder</h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {users.map(user => <JpUser user={user} key={user.id}/>)}
            </div>
        </div>
    );
};
