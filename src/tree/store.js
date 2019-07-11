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
    }
    setAllSelected(value) {
        Object.keys(this.flatNodes).forEach((key) => {
            this.flatNodes[key]['selected'] = value;
        });
    }
    setParentHidden(node, value){
        if(!node || !node.key){
            return;
        }
        this.flatNodes[node.key].isHidden = value;
        this.setParentHidden(node.parent, value);
    }
    setSelectedLabel(label) {
        const keys = [];
        const _keys = Object.keys(this.flatNodes);
        _keys.forEach((key) => {
            if(!label || this.flatNodes[key]['label'].includes(label)){
                keys.push(key);
            } else {
                this.flatNodes[key]['isHidden'] = true;
            }
        });

        keys.forEach((key) => {
            this.setParentHidden(this.flatNodes[key], false);
        });

        return keys.length;
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