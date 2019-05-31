import React from 'react';
import { Component, PropTypes } from '@Libs';

export default class Progress extends Component {
    static propTypes = {
        className: PropTypes.string,
        status: PropTypes.oneOf(['default', 'primary', 'success', 'danger', 'warning']),
        type: PropTypes.string
    };
    
    static defaultProps = {
        status: 'success'
    }

    render(){
        const { type, status, value } = this.props;
        if(type === 'color'){
            const percentage = 100/value.length;
            return (
                <div className="tv-progress">
                    {
                        value.map((item, index) => {
                            return <div key={index} className="tv-progress-inner" style={{width: `${percentage}%`, backgroundColor: item.color}}></div>
                        })
                    }
                </div>
            )
        }
        return (
            <div className="tv-progress">
                <div className={this.className("tv-progress-inner", {
                    [`tv-progress-inner-${status}`]: status
                })} style={{width: `${value}%`}}></div>
            </div>
        )
    }
}
