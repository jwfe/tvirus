import React from 'react';
import { Component, PropTypes } from '@Libs';

import Store from './Store';
import Node from './Node';

export default class Tree extends Component{
    state = {}
    static propTypes = {
        /** 自定义样式 */
        className: PropTypes.string,
        /** 展开的数据列表, [{key:'0', label:'0-label', children: [{key:'0-1', label:'1-label'}]}] */
        data: PropTypes.array,
        /** 展开的key列表 */
        expandedKeys: PropTypes.array,
        /** 禁用那些key的函数 */
        expandDisabled: PropTypes.func,
        /** 关闭以后的回调 */
        onChange: PropTypes.func,

    };
    static defaultProps = {
        expandedKeys: []
    };

    constructor(props){
        super(props);

        const store = new Store(props);
        store.flattenNodes(props.data);
        this.state.store = store;
    }
    
    renderTreeNodes(nodes, parent = {}) {
        const {
            expandedKeys,
            expandDisabled,
            onChange
        } = this.props;

        const { store } = this.state;
        const treeNodes = nodes.map((node) => {
            const key = node.key;
            const flatNode = store.getNode(node.key);
            const children = flatNode.isParent ? this.renderTreeNodes(node.children, node) : null;

            return (
                <Node
                    key={key}
                    onClick={onChange}
                    label={flatNode.label}
                    expandedKeys={expandedKeys}
                    expandDisabled={expandDisabled} 
                    node={flatNode}
                >
                {children}
                </Node>
            );
        });

        return (
            <ol className="tv-tree">
                {treeNodes}
            </ol>
        );
    }
    render(){
        return this.renderTreeNodes(this.props.data)
    }
}


