import React from 'react';
import { Component, PropTypes } from '@Libs';
import Icon from '../icon'

export default class Button extends Component {
    static propTypes = {
        type: PropTypes.oneOf(['default', 'primary', 'success', 'danger', 'warning']),
        size: PropTypes.oneOf(['large', 'medium', 'small']),
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
        return (
            <button 
            className={
                this.className('tv-button', 
                this.props.type && `tv-button-${this.props.type}`,
                this.props.size && `tv-button-${this.props.size}`,
                {
                    'tv-button-disabled': this.props.disabled,
                    'tv-button-loading': this.props.loading,
                    'tv-button-plain': this.props.plain,
                    'tv-button-block': this.props.block,
                    [`tv-button-${this.props.shape}`]: this.props.shape,
                }
                )
            } 
            style={this.style()}
            >
                { this.props.loading && <Icon type="loading" /> }
                { this.props.icon && !this.props.loading && <Icon type={this.props.icon} /> }
                <span>{this.props.children}</span>
            </button>
        )
    }
}
