import React from 'react';
import ReactDOM from 'react-dom';
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
    componentDidMount() {
        this.calcBarStyle(true);
    }
    calcBarStyle(firstRendering) {
        const { children, activeKey } = this.props;
        const { tabsNav } = this.refs;
        const tabsNavNode = ReactDOM.findDOMNode(tabsNav);
        const tabItemNode = tabsNavNode.querySelectorAll('.tv-tabs-item');

        let style = {};
        let offset = 0;
        let tabWidth = 0;

        children.every((item, index) => {
            let $el = tabItemNode[index];
            const computedStyle = getComputedStyle($el);

            if (item.props.tabKey !== this.state.activeStateKey) {
                offset += $el.clientWidth + parseFloat(computedStyle.marginRight) + parseFloat(computedStyle.marginLeft);
                return true;
            } else {
                tabWidth = $el.clientWidth;
                return false;
            }
        })

        style.width = tabWidth + 'px';
        style.transform = `translateX(${offset}px)`;

        if (!firstRendering) {
            style.transition = 'transform .3s cubic-bezier(.645,.045,.355,1), -webkit-transform .3s cubic-bezier(.645,.045,.355,1)';
        }

        this.setState({
            barStyle: style,
        });
    }
    handleClick(props, index){
        const { tabKey, onChange, disabled } = props;

        if(disabled){
            return;
        }

        this.setState({
            activeStateKey: tabKey
        }, () => {
            this.calcBarStyle();
            onChange && onChange(props, index);
        })
    }
    render(){
        const { children, activeKey } = this.props;
        const { activeStateKey, barStyle } = this.state;
        return (
            <div style={this.style()} className={this.className('tv-tabs')}>
                <div className="tv-tabs-nav"
                    ref="tabsNav"
                >
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
                    <div className="tv-tabs-nav-bar" style={barStyle}></div>
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

