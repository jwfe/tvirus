import React from 'react';
import { Component, PropTypes } from '@Libs';


export default class Col extends Component{
    static propTypes = {
        span: PropTypes.number,
        offset: PropTypes.number,
        className: PropTypes.string,
        tag: PropTypes.string,
    };

    static defaultProps = {
        span: 24,
        tag: 'div'
    };

    render(){
        const { span, className, ...others } = this.props;
        let classList = [];
        //todo: 看下需要插入什么样式
        return React.createElement(this.props.tag, {
            className: this.className('tv-col', classList),
            style: this.style(),
            ...others
          }, this.props.children);
    }
}