// Outlet — "дірка" в розмітці, куди React Router вставляє елемент поточного дочірнього маршруту.
import {Outlet} from "react-router-dom";
// Наш компонент меню з посиланнями (default export, тому імпорт без фігурних дужок).
import Menu from "../components/menu/Menu.tsx";

// Компонент-каркас. Він вказаний як element батьківського маршруту "/" у routes.tsx,
// тому рендериться на БУДЬ-ЯКІЙ сторінці застосунку.
export const MainLayout = () => {
    return (
        // <>...</> — фрагмент: групує кілька елементів без зайвого div у DOM.
        <>
            {/* Меню завжди зверху. */}
            <Menu/>
            {/* Сюди підставляється HomePage / LoginPage / AuthResourcesPage залежно від url. */}
            <Outlet/>
        </>
    );
};
