import React from 'react';
import { Component, PropTypes, Animation } from '@Libs';
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
        if(this.props.opened){
            this.context.defaultOpenActive(this.props.index);
        }
    }

    handleClick() {
        const { index } = this.props;
        const { opened, closeMenu, openMenu } = this.context;
        if(opened(index)){
            closeMenu(index);
            return;
        }
        openMenu(index);
    }
    
    render(){
        const { children, title, index } = this.props;
        const { opened } = this.context;
        const childrenWithProps = addPropsIndex(children, index);
        const isShow = opened(index);
        return (
            <li className={this.className('tv-menu-submenu')}>
                <div 
                className={this.className('tv-menu-submenu-title')}
                onClick={this.handleClick.bind(this)}
                >
                    {title}
                    <i className={this.className('tv-menu-submenu-arrow', {
                        'tv-arrow-up': isShow
                    })}></i>
                </div>
                <Animation
                    duration={0.3}
                    animatedStart="zoomEnter" 
                    animatedEnd="zoomExit" 
                    animatedIn="zoomInTop" 
                    animatedOut="zoomInBottom" 
                    inProp={isShow}
                 >
                    <ul>
                        {childrenWithProps}
                    </ul>
                </Animation>
                
            </li>
        )
    }
}