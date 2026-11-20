import {useEffect, useState} from 'react';
import type {FetchState} from '../models/FetchState.ts';

// One shared "loading" object — works for any T, because data is null here
const LOADING = {status: 'loading', data: null, error: null} as const;

// Internal state: the result + the url it was received for
interface IStoredResult<T> {
    url: string;
    result: FetchState<T>;
}

/**
 * Loads JSON from `url` and returns the request state. Replaces the useState + useEffect pair in a component.
 *
 * T — the API response type, set by the caller: `useFetch<IUsersResponse>(urls.users)`.
 * The hook does not validate the JSON shape — T is a "promise" about the response, so the interfaces in models/
 * must match what the server actually returns.
 */
export const useFetch = <T>(url: string): FetchState<T> => {
    const [stored, setStored] = useState<IStoredResult<T> | null>(null);

    useEffect(() => {
        // AbortController — to cancel the request if the url changed or the component unmounted.
        // Otherwise an old response could arrive after the new one and overwrite it (race condition).
        const controller = new AbortController();

        fetch(url, {signal: controller.signal})
            .then(response => {
                // fetch does NOT throw on 404/500 — check it ourselves
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status} ${response.statusText}`.trim());
                }
                return response.json() as Promise<T>;
            })
            .then(data => setStored({url, result: {status: 'success', data, error: null}}))
            .catch((error: unknown) => {
                // A canceled request is not an error for the user
                if (controller.signal.aborted) return;
                const message = error instanceof Error ? error.message : String(error);
                setStored({url, result: {status: 'error', data: null, error: message}});
            });

        return () => controller.abort();
    }, [url]);

    // "Loading" is not stored in state but derived: there is no result yet,
    // or it is left from the previous url → we are still waiting for the response for the current url
    if (!stored || stored.url !== url) return LOADING;

    return stored.result;
};
