import React from 'react';
import { Component, PropTypes, Transition, Animation } from '@Libs';
import { MenuContext, addPropsIndex } from './MenuContext';
import Popup from '@popup';

export default class SubMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }
    static contextType = MenuContext
    static propTypes = {
        /** 自定义样式 */
        className: PropTypes.string,
        /** 设置每一项的索引，默认可以不设置 */
        index: PropTypes.string,
        /** 标题 */
        title: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.string
        ]),
        /** 禁用 */
        disabled: PropTypes.bool, 
        /** 是否允许多选 */
        multiple: PropTypes.bool
    }

    static defaultProps = {
        disabled: false,
        multiple: false
    }

    componentDidMount(){
        const { children, index } = this.props;
        const { handleOpened } = this.context;
        const isOpened = handleOpened(index);
        if(!isOpened){
            const opened = [];
            React.Children.map(children, (child) => {
                if(child.props.opened){
                    opened.push(true);
                }
            });
        }
    }

    handleClick() {
        const { index } = this.props;
        const { handleOpened, closeMenu, openMenu, changeAnimation } = this.context;
        changeAnimation(()=>{
            if(handleOpened(index)){
                closeMenu(index);
                return;
            }
            openMenu(index);
        });
    }

    handlePopupChange(showPopup){
        const { disabled, multiple } = this.props;

        if(disabled){
            this.setState({visible: false});
            return;
        }

        if(multiple){
            return;
        }

        if(disabled){
            showPopup = false
        }
        this.setState({visible: showPopup});
    }

    render(){
        const { visible } = this.state;
        const { children, title, index } = this.props;
        const { handleOpened, isAnimation, inlineCollapsed } = this.context;
        const childrenWithProps = addPropsIndex(children, index);
        const isShow = handleOpened(index);

        if(inlineCollapsed){
            return (
                <Popup 
                    className="tv-menu-submenu-popup"
                    showArrow={false} 
                    visible={visible} 
                    trigger="hover" 
                    position='right top' 
                    content={
                        <ul className="tv-menu-submenu-children">
                            {childrenWithProps}
                        </ul>
                    }
                    onChange={this.handlePopupChange.bind(this)}
                >
                    <li className={this.className('tv-menu-submenu', {
                    'tv-menu-submenu-open': isShow
                })}>
                        <div 
                            className={this.className('tv-menu-submenu-title')}
                        >
                            { title }
                        </div>
                    </li>
                </Popup>
            )
        }

        return (
            <li className={this.className('tv-menu-submenu', {
                'tv-menu-submenu-open': isShow
            })}>
                <div 
                className={this.className('tv-menu-submenu-title')}
                onClick={this.handleClick.bind(this)}
                >
                    {title}
                    <i className={this.className('tv-menu-submenu-arrow', {
                        'tv-arrow-up': isShow
                    })}></i>
                </div>
                <Transition
                    isAnimation={ isAnimation }
                    isShow={ isShow }
                 >
                    <ul className="tv-menu-submenu-children">
                        { childrenWithProps }
                    </ul>
                </Transition>
                
            </li>
        )
    }
}