import React from 'react';
import { Component, PropTypes } from '@Libs';

export default class Card extends Component {
    static propTypes = {
        className: PropTypes.string,
        title: PropTypes.string,
        bordered: PropTypes.bool,
        extra: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    };
    
    static defaultProps = {
        bordered: true
    }
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
