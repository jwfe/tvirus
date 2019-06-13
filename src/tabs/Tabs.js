import React from 'react';
import ReactDOM from 'react-dom';
import { Component, PropTypes, noop } from '@Libs';

export default class Tabs extends Component {
    constructor(props) {
        super(props);
        let { activeKey } = props;
        this.tabsNav = React.createRef();
        this.state = {
            activeStateKey: activeKey
        }
    }
    static propTypes = {
        /** 自定义样式 */
        className: PropTypes.string,
        /** 选中的key */
        activeKey: PropTypes.string,
        /** 是否禁用 */
        disabled: PropTypes.bool,
        /** 切换后的回调 */
        onChange: PropTypes.func,
        /** tabNav 右侧的内容 */
        extra: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    };
    static defaultProps = {
    };
    componentDidMount() {
        this.calcBarStyle(true);
    }
    calcBarStyle(firstRendering) {
        const { children, activeKey } = this.props;
        const tabsNav = this.tabsNav;
        const tabItemNode = tabsNav.current.querySelectorAll('.tv-tabs-item');

        let style = {};
        let offset = 0;
        let tabWidth = 0;

        children.forEach((item, index) => {
            let $el = tabItemNode[index];

            if (item.props.tabKey === this.state.activeStateKey) {
                offset = $el.offsetLeft;
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
        const { children, extra } = this.props;
        const { activeStateKey, barStyle } = this.state;
        return (
            <div style={this.style()} className={this.className('tv-tabs')}>
                <div className="tv-tabs-nav"
                    ref={this.tabsNav}
                >
                    {
                        React.Children.map(children, (item, index) => {
                            const { tab, tabKey, disabled } = item.props;

                            return (
                                <div key={index} className={this.className('tv-tabs-item', {
                                    'tv-tabs-item-active': tabKey === activeStateKey,
                                    'tv-tabs-disabled': disabled,

                                })} onClick={this.handleClick.bind(this, item.props, index)}>
                                    {tab}
                                </div>
                            )
                        })
                    }
                    {extra && <div className="tv-tabs-extra">{extra}</div>}
                    <div className="tv-tabs-nav-bar" style={barStyle}></div>
                </div>
                <div className="tv-tabs-content">
                    {
                        React.Children.map(children, (child, index) => {
                            if(child.props.tabKey === activeStateKey){
                                return React.cloneElement(child, {key: index, activeKey: activeStateKey})
                            }
                            return null;
                        })   
                    }
                </div>
            </div>
        )
    }
}

