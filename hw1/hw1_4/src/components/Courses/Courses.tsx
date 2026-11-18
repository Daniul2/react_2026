import type {FC} from 'react';
import type {ICourse} from '../../models/ICourse.ts';
import Course from '../Course/Course.tsx';
import styles from './Courses.module.css';

interface IProps {
    courses: ICourse[];
}

const Courses: FC<IProps> = ({courses}) => {
    return (
        <ul className={styles.list}>
            {courses.map(course => <Course key={course.title} {...course}/>)}
        </ul>
    );
};

export default Courses;
