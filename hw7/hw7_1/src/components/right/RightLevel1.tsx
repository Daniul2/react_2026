import {TreeNode} from '../TreeNode.tsx';
import {RightLevel2} from './RightLevel2.tsx';

export const RightLevel1 = () => (
    <TreeNode title="RightLevel1" level={1}>
        <RightLevel2/>
    </TreeNode>
);
