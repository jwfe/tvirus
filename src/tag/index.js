import React from 'react';
import { Component, PropTypes } from '@Libs';

import Icon from '@icon';

export default class Tag extends Component {
    constructor(props) {
        super(props);
    }
    static propTypes = {
        /** 自定义样式 */
        className: PropTypes.string,
        /** 是否显示关闭按钮 */
        closable: PropTypes.bool,
        /** 关闭以后的回调 */
        onChange: PropTypes.func,
        /** select中使用的props*/
        type: PropTypes.any

    };

    static defaultProps = {
        closable: false
    };

    state = {
        visible: true
    }

    onHandleChange = () => {
        if (!this.props.type) {
            this.setState({visible: false});
        }
        console.log('children', this.props.children, this.state.visible)
        this.props.onChange(this.node);
    }
    render(){
        const {children, closable} = this.props;
        console.log('children', children, this.state.visible)
        return (
            <div 
            ref={(el) => {this.node = el}}
            className={this.className('tv-tag', {
                'tv-tag-hidden': !this.state.visible
            })} 
            >
                {children}
                {closable && <Icon type="add" onClick={this.onHandleChange} /> }
            </div>
        )
    }
}

