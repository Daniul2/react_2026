import {TreeNode} from './components/TreeNode.tsx';
import {LeftLevel1} from './components/left/LeftLevel1.tsx';
import {RightLevel1} from './components/right/RightLevel1.tsx';

const App = () => (
    <main className="mx-auto max-w-5xl p-6">
        <h1 className="mb-1 text-2xl font-bold">ДЗ 7 — дерево компонентів і тема через Context</h1>
        <p className="mb-6 text-sm opacity-70">
            Кнопка внизу правої гілки змінює тему, а текст внизу лівої гілки її показує — без жодного пропса.
        </p>

        <TreeNode title="App" level={0}>
            <div className="grid gap-4 md:grid-cols-2">
                <LeftLevel1/>
                <RightLevel1/>
            </div>
        </TreeNode>
    </main>
);

export default App;
