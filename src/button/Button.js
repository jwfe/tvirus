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
        className: PropTypes.string,
        shape: PropTypes.string,
        icon: PropTypes.string,
        block: PropTypes.bool,
        component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        disabled: PropTypes.bool,
        loading: PropTypes.bool,
        plain: PropTypes.bool,
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
