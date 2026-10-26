// Опис одного продукту з dummyjson (структура об'єкта у масиві products).
export interface IProduct {
    // Унікальний ідентифікатор продукту.
    id: number;
    // Назва.
    title: string;
    // Опис.
    description: string;
    // Категорія (наприклад "beauty").
    category: string;
    // Ціна.
    price: number;
    // Знижка у відсотках.
    discountPercentage: number;
    // Рейтинг (0–5).
    rating: number;
    // Кількість на складі.
    stock: number;
    // Масив тегів.
    tags: string[];
    // Бренд.
    brand: string;
    // Артикул (stock keeping unit).
    sku: string;
    // Вага.
    weight: number;
    // Розміри — вкладений об'єкт, описаний інтерфейсом IDimensions нижче.
    dimensions: IDimensions;
    // Інформація про гарантію.
    warrantyInformation: string;
    // Інформація про доставку.
    shippingInformation: string;
    // Статус наявності ("In Stock", "Low Stock"...).
    availabilityStatus: string;
    // Масив відгуків (кожен описаний IReviews).
    reviews: IReviews[];
    // Умови повернення.
    returnPolicy: string;
    // Мінімальна кількість для замовлення.
    minimumOrderQuantity: number;
    // Службова інформація (IMeta).
    meta: IMeta;
    // Масив посилань на фото.
    images: string[];
    // Посилання на мініатюру.
    thumbnail: string;
}

// Розміри продукту. Без export — використовується лише всередині цього файлу.
interface IDimensions {
    // Ширина.
    width: number;
    // Висота.
    height: number;
    // Глибина.
    depth: number;
}

// Один відгук про продукт.
interface IReviews {
    // Оцінка у відгуку (1–5).
    rating: number;
    // Текст відгуку.
    comment: string;
    // Дата відгуку (рядок у форматі ISO).
    date: string;
    // Ім'я автора.
    reviewerName: string;
    // Пошта автора.
    reviewerEmail: string;
}

// Службові дані продукту.
interface IMeta {
    // Коли створено (ISO-дата).
    createdAt: string;
    // Коли оновлено.
    updatedAt: string;
    // Штрихкод.
    barcode: string;
    // Посилання на картинку QR-коду.
    qrCode: string;
}
