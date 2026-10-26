import {Outlet} from 'react-router';
import {Menu} from './components/menu/Menu.tsx';

function App() {
    return (
        <>
            <Menu/>
            <main className="p-6">
                <Outlet/>
            </main>
        </>
    );
}

export default App;
