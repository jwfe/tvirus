import React from 'react';
import { Component, PropTypes, noop } from '../../libs';

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
            <div style={this.style()} className={this.className('tv-table-cell')}>
                {this.props.children}
            </div>
        )
    }
}
