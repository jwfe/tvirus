import React from "react";
import { Transition, Component } from '@Libs';
import Icon from '@icon';

export default class Node extends Component{
    state = {
        expanded: false,
    }
    constructor(props){
        super(props);
        this.state.expanded = props.expandedKeys.indexOf(props.node.key) > -1
    }
    onExpand = () => {
        this.setState({
            expanded: !this.state.expanded
        })
    }
    onChange = () => {
        const expanded = !this.state.expanded;
        const { onClick, node } = this.props;
        onClick && onClick(node, expanded, !node.selected);
    }

    renderLabel(children) {
        const { onClick, label } = this.props;
        const clickable = onClick !== null;

        return (
            <span className="tv-tree-node-label" title={label}>
                {clickable ? (
                    <span
                        className="tv-tree-node-clickable"
                        onClick={this.onChange}
                    >
                        {children}
                    </span>
                ) : children}
            </span>
        );
    }
    renderCollapseButton(expanded) {
        return (
            <span className="expanded-icon" onClick={this.onExpand}>
                {expanded ? null : <Icon type="caret-right" />}
            </span>
        )
    }
    render(){
        const { node, children } = this.props;
        return (
            <li>
                <div className={this.className('tv-tree-node', {
                    'expanded': this.state.expanded,
                    'selected': node.selected
                })}>
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