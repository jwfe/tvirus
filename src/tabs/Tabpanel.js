import React from 'react';
import { Component, PropTypes } from '@Libs';

export default class Tabpanel extends Component {
    constructor(props) {
        super(props);
    }
    static propTypes = {
        /** 自定义样式 */
        className: PropTypes.string,
        /** 当前这项的key  */
        tabKey: PropTypes.string,
        /** 是否禁用 */
        disabled: PropTypes.bool
    };
    static defaultProps = {
        disabled: false
    };
    render(){
        const { activeKey, tabKey } = this.props;
        return (
            <div className={this.className('tv-tabs-tabpanel', {
                'tv-tabs-tabpanel-active': activeKey === tabKey
            })}>
                {this.props.children}
            </div>
        )
    }
}

