import React from 'react';
import { Component, PropTypes, noop } from '../../libs';

export default class Row extends Component {
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
            <div className={this.className('tv-table-row')}>
                {this.props.children}
            </div>
        )
    }
}
