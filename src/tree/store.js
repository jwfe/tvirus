export default class Store{
    constructor(props, nodes = {}){
        this.props = props;
        this.flatNodes = nodes;
    }
    getNode(value) {
        return this.flatNodes[value];
    }
    setNode(key, objectKey, value) {
        this.flatNodes[key][objectKey] = value;
        console.log(this.flatNodes[key], this.flatNodes[key][objectKey]);
    }
    setAllSelected(value) {
        Object.keys(this.flatNodes).forEach((key) => {
            this.flatNodes[key]['selected'] = value;
        });
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
    expandAllNodes(expand){
        Object.keys(this.flatNodes).forEach((key) => {
            if(this.flatNodes[key].isParent){
                this.flatNodes[key].expanded = expand;
            }
        })
    }
}