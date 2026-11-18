import type {FC} from 'react';
import CourseTitle from '../CourseTitle/CourseTitle.tsx';
import styles from './CoursesTitles.module.css';

interface IProps {
    titles: string[];
}

const CoursesTitles: FC<IProps> = ({titles}) => {
    return (
        <ul className={styles.list}>
            {titles.map((title, index) => <CourseTitle key={index} title={title}/>)}
        </ul>
    );
};

export default CoursesTitles;
