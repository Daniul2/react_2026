import Courses from './components/Courses/Courses.tsx';
import {coursesArray} from './data/arrays.ts';

function App() {
    return (
        <>
            <h1>Courses</h1>
            <Courses courses={coursesArray}/>
        </>
    );
}

export default App
