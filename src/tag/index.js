import React from 'react';
import { Component, PropTypes } from '@Libs';

export default class Tag extends Component {
    constructor(props) {
        super(props);
    }
    static propTypes = {
        /** 自定义样式 */
        className: PropTypes.string,

    };
    static defaultProps = {
    };
    
    render(){
        const { children } = this.props;
        return (
            <div className={this.className('tv-tag')}>
                {children}
            </div>
        )
    }
}

