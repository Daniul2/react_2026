// Тип одного користувача у списку
export interface IUser {
    id: number;      // унікальний ідентифікатор — піде в key і в onSelect
    name: string;    // ім'я, по ньому фільтруємо
    age: number;     // вік, по ньому сортуємо
}
