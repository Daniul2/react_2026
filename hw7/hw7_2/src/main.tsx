// Точка входу: createRoot монтує React у <div id="root">
import {createRoot} from 'react-dom/client';
// Глобальні стилі + Tailwind
import './index.css';
// Кореневий компонент
import App from './App.tsx';

// Без StrictMode, щоб логи в консолі не дублювались (StrictMode у dev рендерить двічі)
createRoot(document.getElementById('root')!).render(<App/>);
