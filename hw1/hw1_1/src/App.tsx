import CoursesTitles from './components/CoursesTitles/CoursesTitles.tsx';
import {coursesTitleArray} from './data/arrays.ts';

function App() {
    return (
        <>
            <h1>Courses</h1>
            <CoursesTitles titles={coursesTitleArray}/>
        </>
    );
}

export default App
