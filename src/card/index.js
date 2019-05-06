import React from 'react';
import { Component } from '@Libs';

export default class Card extends Component {
    render(){
        const { title, extra, bordered } = this.props;
        return (
            <div className={this.className('tv-card', {
                'tv-card-bordered': bordered
            })} style={this.style()}>
                {title && <div className="tv-card-head">
                    <div className="tv-card-head-wrapper">
                        {title && <div className="tv-card-head-title">{ title }</div>}
                        {extra && <div className="tv-card-extra">{ extra }</div>}
                    </div>
                </div>}
                <div className="tv-card-body">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
