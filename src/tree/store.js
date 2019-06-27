export default class Store{
    constructor(props, nodes = {}){
        this.props = props;
        this.flatNodes = nodes;
    }
    getNode(value) {
        return this.flatNodes[value];
    }
    nodeHasChildren(node) {
        return Array.isArray(node.children) && node.children.length > 0;
    }
    getDisabledState(node, parent, disabledProp, noCascade) {
        if (disabledProp) {
            return true;
        }

        if (!noCascade && parent.disabled) {
            return true;
        }

        return Boolean(node.disabled);
    }
    flattenNodes(nodes, parent = {}, depth = 0) {
        if (!Array.isArray(nodes) || nodes.length === 0) {
            return;
        }

        const { disabled, noCascade } = this.props;

        // 递归对当前数据结构进行梳理
        nodes.forEach((node, index) => {
            const isParent = this.nodeHasChildren(node);
            node = Object.assign(node, {
                children: node.children,
                parent,
                isParent,
                isLeaf: !isParent,
                showCheckbox: node.showCheckbox !== undefined ? node.showCheckbox : true,
                disabled: this.getDisabledState(node, parent, disabled, noCascade),
                treeDepth: depth,
                index,
            })
            this.flatNodes[node.key] = node;
            this.flattenNodes(node.children, node, depth + 1);
        });
    }
}