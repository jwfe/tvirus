import React from 'react';
import { Component, PropTypes, Transition } from '@Libs';
import { MenuContext, addPropsIndex } from './MenuContext';

export default class SubMenu extends Component {
    constructor(props) {
        super(props);
    }
    static contextType = MenuContext
    static propTypes = {
        className: PropTypes.string,
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

    render(){
        const { children, title, index } = this.props;
        const { handleOpened, isAnimation } = this.context;
        const childrenWithProps = addPropsIndex(children, index);
        const isShow = handleOpened(index);
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
                    isAnimation={isAnimation}
                    isShow={ isShow }
                 >
                    <ul className="tv-menu-submenu-children">
                        {childrenWithProps}
                    </ul>
                </Transition>
                
            </li>
        )
    }
}