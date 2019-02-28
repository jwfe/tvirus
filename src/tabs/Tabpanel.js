import React from 'react';
import { Component, PropTypes } from '../../libs';

export default class Tabs extends Component {
    constructor(props) {
        super(props);
    }
    static propTypes = {
        className: PropTypes.string,
        tab: PropTypes.string,
        tabKey: PropTypes.string,
        disabled: PropTypes.bool,
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

