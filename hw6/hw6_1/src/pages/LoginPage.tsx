// useEffect — хук для побічних ефектів (запити, таймери тощо) після рендеру компонента.
import {useEffect} from "react";
// Функція логіну з нашого сервісу: робить POST /auth/login і зберігає користувача з токенами в localStorage.
import {login} from "../services/api.service.ts";

// Сторінка логіну (маршрут "/login").
export const LoginPage = () => {
    // Ефект з порожнім масивом залежностей [] виконується ОДИН раз — коли сторінка з'являється на екрані.
    useEffect(() => {
        // Одразу логінимося. Форми ще немає — дані "зашиті" в код для демонстрації.
        login({
            // Тестовий користувач, який існує в dummyjson.
            username: 'emilys',
            // Його пароль.
            password: 'emilyspass',
            // Скільки хвилин житиме accessToken. 1 хв — навмисно мало,
            // щоб швидко побачити, як токен протухає і як працює refresh.
            expiresInMins: 1
        });
        // Promise, який повертає login, тут не обробляється (немає .then/.catch) —
        // результат ми побачимо в console.log всередині login і в localStorage.
    }, []);

    return (
        // Просто текст сторінки.
        <>
            login Page
        </>
    );
};
