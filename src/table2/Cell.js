import React from 'react';
import { Component, PropTypes, noop } from '@Libs';

export default class Cell extends Component {
    constructor(props) {
        super(props);
    }
    static propTypes = {
        /** 自定义样式 */
        className: PropTypes.string,
        onChange: PropTypes.func,

    };
    static defaultProps = {
    };
    render(){
        return (
            <div style={this.style()} onClick={this.props.onClick} className={this.className('tv-table-cell')}>
                {this.props.children}
            </div>
        )
    }
}
