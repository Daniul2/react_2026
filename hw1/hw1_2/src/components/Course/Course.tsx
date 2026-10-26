import type {FC} from 'react';
import type {ICourse} from '../../models/ICourse.ts';
import styles from './Course.module.css';

const Course: FC<ICourse> = ({title, monthDuration}) => {
    return (
        <li className={styles.item}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.duration}>{monthDuration} months</p>
        </li>
    );
};

export default Course;
