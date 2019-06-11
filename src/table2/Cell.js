import React from 'react';
import { Component, PropTypes, noop } from '@Libs';

export default class Cell extends Component {
    constructor(props) {
        super(props);
    }
    static propTypes = {
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
