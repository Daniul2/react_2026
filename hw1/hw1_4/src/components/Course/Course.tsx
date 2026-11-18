import type {FC} from 'react';
import type {ICourse} from '../../models/ICourse.ts';
import Modules from '../Modules/Modules.tsx';
import styles from './Course.module.css';

const Course: FC<ICourse> = ({title, monthDuration, hourDuration, modules}) => {
    return (
        <li className={styles.item}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.duration}>{monthDuration} months · {hourDuration} hours</p>
            <Modules modules={modules}/>
        </li>
    );
};

export default Course;
