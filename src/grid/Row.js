import React from 'react';
import { Component, PropTypes } from '@Libs';

export default class Row extends Component{
    static propTypes = {
        className: PropTypes.string,
        tag: PropTypes.string,
    };

    static defaultProps = {
        tag: 'div'
    };
    render(){
        const { className, ...others } = this.props;
        let classList = [];
        //todo: 看下需要插入什么样式
        return React.createElement(this.props.tag, {
            className: this.className('tv-row', classList),
            style: this.style(),
            ...others
          }, this.props.children);
    }
}