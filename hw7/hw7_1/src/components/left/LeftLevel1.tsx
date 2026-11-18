import {TreeNode} from '../TreeNode.tsx';
import {LeftLevel2} from './LeftLevel2.tsx';

export const LeftLevel1 = () => (
    <TreeNode title="LeftLevel1" level={1}>
        <LeftLevel2/>
    </TreeNode>
);
