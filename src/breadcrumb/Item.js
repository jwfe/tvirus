import React from 'react';
import { Component } from '@Libs';
import { BreadcrumbContext } from './BreadcrumbContext';

export default class Item extends Component {
    static contextType = BreadcrumbContext;
    render(){
        const {separator} = this.context;
        return (
            <span>
                <span className={this.className('tv-breadcrumb-link')} style={this.style()}>
                    {this.props.children}
                </span>
                <span className={this.className('tv-breadcrumb-separator')}>{separator}</span>
            </span>
        )
    }
}
