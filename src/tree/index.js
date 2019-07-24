import React from 'react';
import { Component, PropTypes } from '@Libs';

import Store from './store';
import Node from './Node';
import Input from '@input';
import Result from '@result';

export default class Tree extends Component{
    state = {
        haveData: true
    }
    static propTypes = {
        /** 自定义样式 */
        className: PropTypes.string,
        /** 显示搜索 */
        isShowSearch: PropTypes.bool,
        /** 展开的数据列表, [{key:'0', label:'0-label', children: [{key:'0-1', label:'1-label'}]}] */
        data: PropTypes.array,
        /** 展开的key列表 */
        expandedKeys: PropTypes.array,
        /** 禁用那些key的函数 */
        expandDisabled: PropTypes.func,
        /** 关闭以后的回调 */
        onChange: PropTypes.func

    };
    static defaultProps = {
        isShowSearch: false,
        expandedKeys: []
    };

    constructor(props){
        super(props);
        // TODO: data没有空判断，在未获得数据时会抛出错误
        const store = new Store(props);
        store.flattenNodes(JSON.parse(JSON.stringify(props.data)));
        this.state.store = store;
    }

    onChange = (node, expanded, selected) => {
        const {
            onChange,
            multiple,
            name
        } = this.props;
        const { store } = this.state;
        if(!multiple){
           store.setAllSelected(false);
        }
        store.setNode(node.key, 'selected', selected);
        this.setState({update: !this.state.update}, () => {
            onChange(node, name);
        })
    }

    handleSearch = (value) => {
        const { store } = this.state;
        const haveData = store.setSelectedLabel(value);
        this.setState({
            haveData,
            update: !this.state.update
        })
    }

    renderTreeNodes(nodes, parent = {}) {
        const {
            expandedKeys,
            expandDisabled
        } = this.props;

        const { store } = this.state;
        const treeNodes = nodes.map((node) => {
            const key = node.key;
            const flatNode = store.getNode(node.key);
            const children = flatNode.isParent ? this.renderTreeNodes(node.children, node) : null;

            return (
                <Node
                    key={key}
                    onClick={this.onChange}
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
        return (
            <div className="tv-tree-wraper">
                {this.props.isShowSearch && <div className={this.className('tv-search')}>
                    <Input
                        type="text"
                        onChange={this.handleSearch}
                    />
                </div>}
                {this.state.haveData ? this.renderTreeNodes(this.props.data) : <Result type="nodata" subtitle="暂不数据" />}
            </div>
        )
    }
}


