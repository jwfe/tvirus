import React from 'react';
import { Component, PropTypes, noop } from '../../libs';

export default class Tabs extends Component {
    constructor(props) {
        super(props);
        let { activeKey } = props;
        this.state = {
            activeStateKey: activeKey
        }
    }
    static propTypes = {
        className: PropTypes.string,
        activeKey: PropTypes.string,
        onChange: PropTypes.func,

    };
    static defaultProps = {
    };
    handleClick(props, index){
        const { tabKey, onChange, disabled } = props;

        if(disabled){
            return;
        }

        this.setState({
            activeStateKey: tabKey
        })

        onChange && onChange(props, index);
    }
    render(){
        const { children, activeKey } = this.props;
        const { activeStateKey } = this.state;
        return (
            <div style={this.style()} className={this.className('tv-tabs')}>
                <div className="tv-tabs-nav">
                    {
                        React.Children.map(children, (item, index) => {
                            const { tab, tabKey, disabled } = item.props;

                            return (
                                <div className={this.className('tv-tabs-item', {
                                    'tv-tabs-item-active': tabKey === activeStateKey,
                                    'tv-tabs-disabled': disabled,

                                })} tabKey={tabKey} onClick={this.handleClick.bind(this, item.props, index)}>
                                    {tab}
                                </div>
                            )
                        })
                    }
                </div>
                <div className="tv-tabs-content">
                    {
                        React.Children.map(children, (child) => {
                            return React.cloneElement(child, {activeKey: activeStateKey})
                        })   
                    }
                </div>
            </div>
        )
    }
}

