// Entry point: createRoot mounts React into <div id="root">
import {createRoot} from 'react-dom/client';
// Global styles + Tailwind
import './index.css';
// Root component
import App from './App.tsx';

// Without StrictMode, so console logs are not duplicated (StrictMode renders twice in dev)
createRoot(document.getElementById('root')!).render(<App/>);
