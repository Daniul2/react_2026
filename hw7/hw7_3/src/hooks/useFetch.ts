import {useEffect, useState} from 'react';
import type {FetchState} from '../models/FetchState.ts';

// Один спільний об'єкт "завантаження" — підходить для будь-якого T, бо data тут null
const LOADING = {status: 'loading', data: null, error: null} as const;

// Внутрішній стан: результат + url, для якого він отриманий
interface IStoredResult<T> {
    url: string;
    result: FetchState<T>;
}

/**
 * Завантажує JSON з `url` і повертає стан запиту. Замінює пару useState + useEffect у компоненті.
 *
 * T — тип відповіді API, його задає той, хто викликає хук: `useFetch<IUsersResponse>(urls.users)`.
 * Хук сам не перевіряє форму JSON — T це "обіцянка" про відповідь, тому інтерфейси в models/
 * мають збігатися з тим, що реально повертає сервер.
 */
export const useFetch = <T>(url: string): FetchState<T> => {
    const [stored, setStored] = useState<IStoredResult<T> | null>(null);

    useEffect(() => {
        // AbortController — щоб скасувати запит, якщо url змінився або компонент розмонтувався.
        // Інакше стара відповідь могла б прийти пізніше за нову і перезаписати її (race condition).
        const controller = new AbortController();

        fetch(url, {signal: controller.signal})
            .then(response => {
                // fetch НЕ кидає помилку на 404/500 — перевіряємо самі
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status} ${response.statusText}`.trim());
                }
                return response.json() as Promise<T>;
            })
            .then(data => setStored({url, result: {status: 'success', data, error: null}}))
            .catch((error: unknown) => {
                // Скасований запит — це не помилка для користувача
                if (controller.signal.aborted) return;
                const message = error instanceof Error ? error.message : String(error);
                setStored({url, result: {status: 'error', data: null, error: message}});
            });

        return () => controller.abort();
    }, [url]);

    // "Завантаження" не зберігаємо в стані, а виводимо: результату ще немає,
    // або він лишився від попереднього url → для поточного url ми ще чекаємо відповідь
    if (!stored || stored.url !== url) return LOADING;

    return stored.result;
};
