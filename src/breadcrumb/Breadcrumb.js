import React from 'react';
import { Component, PropTypes } from '@Libs';
import { BreadcrumbContext } from './BreadcrumbContext';

import Icon from '@icon'

export default class Breadcrumb extends Component {
    static propTypes = {
        /** 自定义样式 */
        className: PropTypes.string,
        /** 分隔符自定义 */
        separator: PropTypes.string,
        /** 前置的icon */
        icon: PropTypes.string
    };
    
    static defaultProps = {
        separator: '/'
    }

    render(){
        const {separator} = this.props;
        return (
            <BreadcrumbContext.Provider value={{
                separator
            }}>
                <div 
                className={
                    this.className('tv-breadcrumb')
                } 
                style={this.style()}
                >
                    { this.props.icon && !this.props.loading && <Icon type={this.props.icon} /> }
                    {this.props.children}
                </div>
            </BreadcrumbContext.Provider>
            
        )
    }
}
