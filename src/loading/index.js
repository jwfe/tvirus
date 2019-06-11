import React from 'react';
import { Component, PropTypes, noop } from '@Libs';

export default class Loading extends Component {
    static propTypes = {
        className: PropTypes.string
    };

    static defaultProps = {
    };

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="tv-loading-wrapper">
                <span className={this.className('tv-loading')}>
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
            </div>
        );
    }
}