import React from 'react';
import { Component, PropTypes } from '@Libs';
import Icon from '@icon'

export default class Button extends Component {
    static propTypes = {
        /** 设置按钮类型，可选值 'primary', 'success', 'danger', 'warning', 'link' 或不设 */
        type: PropTypes.oneOf(['default', 'primary', 'success', 'danger', 'warning', 'link']),
        /** 设置按钮大小，可选值 'large', 'small' 或不设 */
        size: PropTypes.oneOf(['large', 'medium', 'small']),
        /** 设置按钮原生的type，可选值 'submit', 'reset' 或不设 */
        htmlType: PropTypes.oneOf(['button', 'submit', 'reset']),
        /** 自定义样式 */
        className: PropTypes.string,
        /** 设置按钮形状， 可选 'circle' 或不设 */
        shape: PropTypes.string,
        /** 设置前置图标 */
        icon: PropTypes.string,
        /** 继承父级宽度 */
        block: PropTypes.bool,
        /** 按钮失效 */
        disabled: PropTypes.bool,
        /** 按钮loading状态 */
        loading: PropTypes.bool,
        /** 简单按钮状态 */
        plain: PropTypes.bool
    };
    
    static defaultProps = {
        type: 'default',
        htmlType: 'button',
    }

    render(){
        const { type, size, loading, plain, className, block, shape, icon, children, ref, htmlType, ...other } = this.props;
        return (
            <button 
            type={htmlType}
            className={
                this.className('tv-button', 
                    type && `tv-button-${type}`,
                    size && `tv-button-${size}`,
                    {
                        'tv-button-loading': loading,
                        'tv-button-plain': plain,
                        'tv-button-block': block,
                        [`tv-button-${shape}`]: shape,
                    }
                )
            } 
            style={this.style()}
            ref={ref}
            {...other}
            >
                { loading && <Icon type="loading" /> }
                { icon && !loading && <Icon type={icon} /> }
                {children && <span>{children}</span>}
            </button>
        )
    }
}
