import CharacterComponent from '../CharacterComponent/CharacterComponent.tsx';
import {simpsons} from '../../data/arrays.ts';
import styles from './FamilyComponent.module.css';

const FamilyComponent = () => {
    return (
        <div className={styles.family}>
            {simpsons.map(({info, ...character}) => (
                <CharacterComponent key={character.name} {...character}>
                    {info}
                </CharacterComponent>
            ))}
        </div>
    );
};

export default FamilyComponent;
