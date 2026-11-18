// Link — посилання React Router. На відміну від <a href>, НЕ перезавантажує сторінку,
// а лише змінює url і перемальовує потрібну частину (клієнтський перехід).
import {Link} from "react-router-dom";

// Компонент меню (стрілочна функція, яка повертає JSX).
const Menu = () => {
    return (
        <div>
            {/* Ненумерований список посилань. */}
            <ul>
                {/* to={'/'} — перехід на головну (спрацює index-маршрут → HomePage). */}
                <li><Link to={'/'}>home</Link></li>
                {/* Перехід на /login → LoginPage (там і відбувається логін). */}
                <li><Link to={'/login'}>login</Link></li>
                {/* Перехід на /auth/resources → сторінка, що тягне ЗАХИЩЕНІ дані (потрібен токен). */}
                <li><Link to={'/auth/resources'}>resources</Link></li>
            </ul>
            {/* Горизонтальна лінія, щоб відокремити меню від вмісту сторінки. */}
            <hr/>

        </div>
    );
};

// Експорт за замовчуванням — тому в MainLayout імпорт виглядає як `import Menu from ...`.
export default Menu;
