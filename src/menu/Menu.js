import React from 'react';
import { Component, PropTypes, noop } from '../../libs';
import { MenuContext, addPropsIndex } from './MenuContext';

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: '',
            isAnimation: false,
            openMaps: {}
        }
    }
    static propTypes = {
        className: PropTypes.string,
        indent: PropTypes.number,
        theme: PropTypes.string,
        mode: PropTypes.string,
        onClick: PropTypes.func,
        onOpenChange: PropTypes.func,

    };
    static defaultProps = {
        indent: 24,
        onOpenChange: noop,
        onClick: noop,
        //todo: 定义主题名称
        theme: 'default',
    };
    onClick(item, index, to){
        this.openMenu(index);
        this.props.onClick(index, to, this.state.openMaps);
        
    }
    closeMenu(index){
        const { openMaps } = this.state;
        openMaps[index] = false;

        this.setState({
            openMaps
        })
    }
    openMenu(index) {
        this.defaultOpenActive(index);
        this.props.onOpenChange(this, index);
    }
    handleOpened(index){
        return !!this.state.openMaps[index];
    }
    newOpenNodes(activeIndex){
        const openPath = activeIndex.split('-');
        const openMaps = {};
        openPath.reduce(function(a, b){ 
            const value = `${a}-${b}`;
            openMaps[value] = true;
            return value;
        });
        return openMaps
    }
    defaultOpenActive(activeIndex){
        if(typeof activeIndex === 'undefined' || this.handleOpened(activeIndex)){
            return;
        }
        const openMaps = this.newOpenNodes(activeIndex);
        this.setState({ openMaps, activeIndex });
    }
    changeAnimation(fn){
        this.setState({
            isAnimation: true
        }, () => {fn()})
    }
    render(){
        const { children, mode, theme } = this.props;
        const isHorizontal = mode === 'horizontal';
        const childrenWithProps = addPropsIndex(children, 'menu');
        return (
            <MenuContext.Provider value={{
                handleOpened: this.handleOpened.bind(this),
                openMenu: this.openMenu.bind(this),
                closeMenu: this.closeMenu.bind(this),
                onClick: this.onClick.bind(this),
                defaultOpenActive: this.defaultOpenActive.bind(this),
                activeIndex: this.state.activeIndex,
                openMaps: this.state.openMaps,
                isAnimation: this.state.isAnimation,
                changeAnimation: this.changeAnimation.bind(this)
            }}>
                <ul 
                    style={this.style()}
                    className={this.className('tv-menu', {
                        [`tv-theme-${theme}-menu`]: true,
                        'tv-menu-horizontal': isHorizontal,
                        'tv-menu-vertical': !isHorizontal
                    })}
                >
                    {childrenWithProps}
                </ul>
            </MenuContext.Provider>
        )
    }
}