import React from "react";
import { Transition, Component } from '@Libs';
import Icon from '@icon';

export default class Node extends Component{
    state = {
        expanded: false
    }
    constructor(props){
        super(props);
        this.state.expanded = props.expandedKeys.indexOf(props.node.key) > -1
    }
    onExpand = () => {
        const { onClick, node, expandedKeys } = this.props;
        const expanded = !this.state.expanded;
        this.setState({
            expanded,
        }, () => {
            onClick && onClick(node, expanded);
        })
    }
    renderLabel(children) {
        const { onClick, label } = this.props;
        const clickable = onClick !== null;

        return (
            <span className="tv-tree-node-label" title={label}>
                {clickable ? (
                    <span
                        className="tv-tree-node-clickable"
                    >
                        {children}
                    </span>
                ) : children}
            </span>
        );
    }
    renderCollapseButton(expanded) {
        return (
            <span className="expanded-icon">
                {expanded ? null : <Icon type="caret-right" />}
            </span>
        )
    }
    render(){
        const { node, children } = this.props;
        return (
            <li>
                <div className={this.className('tv-tree-node', {
                    'expanded': this.state.expanded
                })} onClick={this.onExpand}>
                    {this.renderCollapseButton(!children)} 
                    {this.renderLabel(node.label)}
                </div>
                {children && <Transition
                    isAnimation={ true }
                    isShow={this.state.expanded}
                >
                    { children }
                </Transition>}
            </li>
        )
    }
}