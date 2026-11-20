import {useFetch} from '../hooks/useFetch.ts';
import {urls} from '../constants/urls.ts';
import {ErrorMessage, Loading} from './StatusView.tsx';

// Intentionally non-existent endpoint — shows how the hook handles 404
export const BrokenRequest = () => {
    const state = useFetch<unknown>(urls.broken);

    if (state.status === 'loading') return <Loading/>;
    if (state.status === 'error') return <ErrorMessage message={state.error}/>;

    return <pre>{JSON.stringify(state.data, null, 2)}</pre>;
};
