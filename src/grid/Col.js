import React from 'react';
import { Component, PropTypes } from '@Libs';
import { GridContext } from './GridContext';


export default class Col extends Component{
    static contextType = GridContext

    static propTypes = {
        /** 栅格展位的格数 */
        span: PropTypes.number,
        /** 栅格的顺序 */
        order: PropTypes.number,
        /** 栅格的间隔格数，间隔内不可以有栅格 */
        offset: PropTypes.number,
        /** 自定义样式 */
        className: PropTypes.string,
        /** 设置栅格的节点 */
        tag: PropTypes.string,
    };

    static defaultProps = {
        span: 24,
        offset: 0,
        order: 0,
        tag: 'div'
    };

    getGutter(){
        const style = {};

        if (this.context.gutter) {
            style.paddingLeft = `${this.context.gutter / 2}px`;
            style.paddingRight = style.paddingLeft;
        }

        return style;
    }

    render(){
        const { children, span, order, offset, className, tag, ...others } = this.props;
        const classNames = [
            `tv-col-span-${span}`,
            `tv-col-order-${order}`,
            `tv-col-offset-${offset}`
        ];
        //todo: 看下需要插入什么样式
        return React.createElement(tag, {
            className: this.className('tv-col', classNames),
            style: this.style(this.getGutter()),
            ...others
          }, children);
    }
}