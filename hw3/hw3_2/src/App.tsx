import {Route, Routes} from 'react-router';
import {MainLayout} from './layouts/MainLayout.tsx';
import {HomePage} from './pages/HomePage.tsx';
import {UsersPage} from './pages/UsersPage.tsx';
import {PostsPage} from './pages/PostsPage.tsx';
import {CommentsPage} from './pages/CommentsPage.tsx';
import {ProductsPage} from './pages/ProductsPage.tsx';
import {NotFoundPage} from './pages/NotFoundPage.tsx';

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout/>}>
                <Route index element={<HomePage/>}/>
                <Route path="users" element={<UsersPage/>}/>
                <Route path="posts" element={<PostsPage/>}/>
                <Route path="comments" element={<CommentsPage/>}/>
                <Route path="products" element={<ProductsPage/>}/>
            </Route>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    );
}

export default App;
