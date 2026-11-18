// Допоміжна узагальнена (generic) функція: дістає з localStorage значення за ключем і парсить його з JSON.
// <T> — тип, який ми очікуємо отримати (наприклад IUserWithTokens). Задається при виклику: retriveLocalStorage<IUserWithTokens>('user').
// (Назва з одруківкою: правильно було б "retrieve", але використовується саме так по всьому проєкту.)
export const retriveLocalStorage = <T>(key: string) => {
    // localStorage.getItem повертає рядок або null, якщо ключа немає. "|| ''" перетворює null на порожній рядок.
    const object = localStorage.getItem(key) || '';
    // Якщо нічого не збережено (порожній рядок) —
    if (!object) {
        // повертаємо порожній об'єкт, "прикинувши" його до типу T. Так код далі не впаде,
        // але поля будуть undefined (наприклад, accessToken → undefined).
        return {} as T;
    }
    // Інакше перетворюємо JSON-рядок назад в об'єкт.
    const parse = JSON.parse(object);
    // І повертаємо його з типом T (TypeScript повірить нам на слово — перевірки структури немає).
    return parse as T;

}
