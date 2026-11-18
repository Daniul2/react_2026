import Courses from './components/Courses/Courses.tsx';
import {coursesAndDurationArray} from './data/arrays.ts';

function App() {
    return (
        <>
            <h1>Courses and duration</h1>
            <Courses courses={coursesAndDurationArray}/>
        </>
    );
}

export default App
