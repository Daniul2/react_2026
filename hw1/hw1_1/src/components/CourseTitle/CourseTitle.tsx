import type {FC} from 'react';
import type {ICourseTitle} from '../../models/ICourseTitle.ts';
import styles from './CourseTitle.module.css';

const CourseTitle: FC<ICourseTitle> = ({title}) => {
    return <li className={styles.item}>{title}</li>;
};

export default CourseTitle;
