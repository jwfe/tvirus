import React from 'react';
import { Component, PropTypes } from '@Libs';

export default class Card extends Component {
    static propTypes = {
        /** 自定义样式 */
        className: PropTypes.string,
        /** 卡片标题 */
        title: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element,
        ]),
        /** 设置卡片body的样式 */
        style: PropTypes.object,
        /** 设置是否有边框 */
        bordered: PropTypes.bool,
        /** 增加title的拓展，一般是右上角 */
        extra: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    };
    
    static defaultProps = {
        bordered: true
    }
    render(){
        const { title, extra, bordered, className } = this.props;
        return (
            <div className={this.className('tv-card', {
                'tv-card-bordered': bordered
            })}>
                {title && <div className="tv-card-head">
                    <div className="tv-card-head-wrapper">
                        {title && <div className="tv-card-head-title">{ title }</div>}
                        {extra && <div className="tv-card-extra">{ extra }</div>}
                    </div>
                </div>}
                <div className="tv-card-body" style={this.style()}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
