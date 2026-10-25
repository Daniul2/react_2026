import {useEffect, useState} from 'react';
import type {UserModel} from '../models/dummyjson/UserModel.ts';
import {loadDummyJsonUsers} from '../service/dummyjson.service.ts';
import {DjUser} from '../components/dummyjson/DjUser.tsx';

export const UsersDummyJsonPage = () => {
    const [users, setUsers] = useState<UserModel[]>([]);

    useEffect(() => {
        loadDummyJsonUsers().then(value => setUsers(value));
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Users · DummyJSON</h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {users.map(user => <DjUser user={user} key={user.id}/>)}
            </div>
        </div>
    );
};
