import {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router';
import type {UsersResponseModel} from '../models/ResponseModels.ts';
import {loadUsers, USERS_PER_PAGE} from '../service/api.service.ts';
import {User} from '../components/user-component/User.tsx';
import {Pagination} from '../components/pagination-component/Pagination.tsx';

export const UsersPage = () => {
    const [searchParams] = useSearchParams();
    // номер сторінки береться з url (?page=2), некоректне значення -> 1
    const page = Math.max(1, Number(searchParams.get('page')) || 1);

    const [response, setResponse] = useState<UsersResponseModel | null>(null);

    useEffect(() => {
        let ignore = false;
        loadUsers(page).then(value => {
            if (!ignore) setResponse(value);
        });
        return () => {
            ignore = true;
        };
    }, [page]);

    const totalPages = response ? Math.ceil(response.total / USERS_PER_PAGE) : 0;

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold">Users</h2>
            <Pagination page={page} totalPages={totalPages}/>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {response?.users.map(user => <User user={user} key={user.id}/>)}
            </div>
            {response && !response.users.length && <p>На цій сторінці немає користувачів.</p>}
            <Pagination page={page} totalPages={totalPages}/>
        </div>
    );
};
