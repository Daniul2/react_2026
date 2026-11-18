// useEffect — щоб зробити запит один раз після появи сторінки.
import {useEffect} from "react";
// loadAuthProducts — GET /auth/products (захищений ресурс, потрібен accessToken);
// refresh — POST /auth/refresh, отримує нову пару токенів за refreshToken.
import {loadAuthProducts, refresh} from "../services/api.service.ts";

// Сторінка захищених ресурсів (маршрут "/auth/resources").
export const AuthResourcesPage = () => {

    // Виконується один раз при відкритті сторінки ([] — без залежностей).
    useEffect(() => {
        // 1) Пробуємо завантажити продукти з поточним accessToken (його додає interceptor в api.service.ts).
        loadAuthProducts().then(products => {
            // Успіх — токен ще живий, просто виводимо продукти в консоль.
            console.log(products)
        // 2) Помилка — найімовірніше 401 Unauthorized: accessToken протух (жив 1 хвилину)
        //    або ми ще не логінилися.
        }).catch(reason => {
            // Виводимо помилку, щоб побачити її в консолі (там буде статус 401).
            console.log(reason);
            // 3) Оновлюємо токени: відправляємо refreshToken, отримуємо нові accessToken + refreshToken
            //    і refresh() сам записує їх у localStorage.
            refresh()
                // 4) Коли нові токени збережені — повторюємо той самий запит (interceptor візьме вже НОВИЙ токен).
                .then(() => loadAuthProducts())
                // 5) Виводимо продукти, отримані після оновлення токена.
                .then(value => console.log(value))
            // Примітка: якщо і refresh не вдасться (refreshToken теж протух / не логінились) —
            // помилка тут не обробляється, і в консолі буде "Uncaught (in promise)".
        })

    }, []);

    return (
        // Сторінка нічого не малює з даних — результат дивимось у консолі браузера (F12 → Console).
        <>
            AuthResourcesPage
        </>
    );
};
