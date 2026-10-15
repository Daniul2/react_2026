import type {FC} from 'react';
import styles from './Modules.module.css';

interface IProps {
    modules: string[];
}

const Modules: FC<IProps> = ({modules}) => {
    return (
        <ul className={styles.list}>
            {modules.map(module => <li key={module} className={styles.item}>{module}</li>)}
        </ul>
    );
};

export default Modules;
