import {TreeNode} from '../TreeNode.tsx';
import {RightLevel3} from './RightLevel3.tsx';

export const RightLevel2 = () => (
    <TreeNode title="RightLevel2" level={2}>
        <RightLevel3/>
    </TreeNode>
);
