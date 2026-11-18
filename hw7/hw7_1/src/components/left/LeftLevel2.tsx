import {TreeNode} from '../TreeNode.tsx';
import {LeftLevel3} from './LeftLevel3.tsx';

export const LeftLevel2 = () => (
    <TreeNode title="LeftLevel2" level={2}>
        <LeftLevel3/>
    </TreeNode>
);
