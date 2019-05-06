import React from 'react';
import { Component, PropTypes } from '@Libs';
import { BreadcrumbContext } from './BreadcrumbContext';

import Icon from '@icon'

export default class Breadcrumb extends Component {
    static propTypes = {
        className: PropTypes.string,
        separator: PropTypes.string,
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
