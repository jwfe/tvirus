import React from 'react';
import { Component, PropTypes } from '@Libs';

export default class Badge extends Component {
    static propTypes = {
        /** 自定义样式 */
        className: PropTypes.string,
        /** 设置徽标的状态, 可选 'default', 'primary', 'success', 'danger', 'warning', 'processing' */
        status: PropTypes.oneOf(['default', 'primary', 'success', 'danger', 'warning', 'processing']),
        /** 设置徽标的颜色 */
        color: PropTypes.string,
        /** 设置徽标内的值 */
        count: PropTypes.number,
    };
    
    static defaultProps = {
    }

    renderStatus(){
        const { children, status, color } = this.props;
        return [
            <span 
            style={{ backgroundColor: color }}
            className={this.className('tv-badge-dot', {
                [`tv-badge-status-${status}`] : true
            })}></span>,
            <span className="tv-badge-status-text">{children}</span>
        ]
    }

    render(){
        const { count, children, status, color } = this.props;
        let child;
        if(status){
            child = this.renderStatus();
        } else {
            child = [
                children,
                <sup 
                style={{ backgroundColor: color }}
                className={this.className('tv-badge-number', {
                    'tv-badge-count': count, 
                    'tv-badge-dot': !count, 
                })}>{count || ''}</sup>
            ]
        }
        return (
            <span 
            style={this.style()}
            className={this.className('tv-badge', {
                'tv-badge-status': status
            })}>
                {child}
            </span>
        )
    }
}
