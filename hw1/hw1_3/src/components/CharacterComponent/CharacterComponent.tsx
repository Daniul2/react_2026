import type {FC, PropsWithChildren} from 'react';
import type {ISimpson} from '../../models/ISimpson.ts';
import styles from './CharacterComponent.module.css';

type IProps = PropsWithChildren<Omit<ISimpson, 'info'>>;

const CharacterComponent: FC<IProps> = ({name, surname, age, photo, children}) => {
    return (
        <div className={styles.card}>
            <img className={styles.photo} src={photo} alt={`${name} ${surname}`}/>
            <div>
                <h2 className={styles.name}>{name} {surname}</h2>
                <p className={styles.age}>Age: {age}</p>
                <p className={styles.info}>{children}</p>
            </div>
        </div>
    );
};

export default CharacterComponent;
