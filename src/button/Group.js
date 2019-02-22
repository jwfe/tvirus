import React from 'react';
import { Component } from '@Libs';

export default class Group extends Component {
    render(){
        return (
            <div className={this.className('tv-button-group')} style={this.style()}>
                {this.props.children}
            </div>
        )
    }
}
