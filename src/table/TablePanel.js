import React from 'react';
import { Component, PropTypes, noop } from '@Libs';

export default class TablePanel extends Component {
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
            <div className={this.className('tv-table-panel')}>
                {this.props.children}
            </div>
        )
    }
}
