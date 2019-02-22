import React from 'react';
import { Component, PropTypes } from '@Libs';

export default class Group extends Component {
    static propTypes = {
        type: PropTypes.oneOf(['default', 'primary', 'success', 'danger', 'link']),
        size: PropTypes.oneOf(['large', 'medium', 'small']),
        htmlType: PropTypes.oneOf(['button', 'submit', 'reset']),
        className: PropTypes.string,
        icon: PropTypes.string,
        block: PropTypes.bool,
        component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        disabled: PropTypes.bool,
        loading: PropTypes.bool,
        outline: PropTypes.bool,
        bordered: PropTypes.bool
    };
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
                    'tv-button-outline': this.props.outline,
                    'tv-button-block': this.props.block,
                    'tv-button-bordered': this.props.bordered,
                }
                )
            } 
            style={this.style()}
            >
                { this.props.loading && <i className="tv-icon-loading" /> }
                { this.props.icon && !this.props.loading && <i className={`tv-icon-${this.props.icon}`} /> }
                <span>{this.props.children}</span>
            </button>
        )
    }
}
