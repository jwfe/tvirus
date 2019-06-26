import React from 'react';
import { Component, PropTypes, noop } from '@Libs';
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
        /** 自定义样式 */
        className: PropTypes.string,
        /** 缩进，目前未启用 */
        indent: PropTypes.number,
        /** 子节点的展示方式 */
        inlineCollapsed: PropTypes.bool,
        /** 设置皮肤 */
        theme: PropTypes.string,
        /** 是否允许多选 */
        multiple: PropTypes.bool,
        /** 展示方式，可选 horizontal, vertical */
        mode: PropTypes.string,
        /** 点击的回调 */
        onClick: PropTypes.func,
        /** 展开回调 */
        onOpenChange: PropTypes.func,

    };
    static defaultProps = {
        indent: 24,
        onOpenChange: noop,
        onClick: noop,
        inlineCollapsed: false,
        theme: 'default',
        mode: 'vertical'
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
        const { multiple } = this.props;
        const openPath = activeIndex.split('-');
        let openMaps = {};

        if(multiple){
            openMaps = this.state.openMaps;
        }
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
        const { children, mode, theme, inlineCollapsed } = this.props;
        const isHorizontal = mode === 'horizontal';
        const childrenWithProps = addPropsIndex(children, 'menu');
        return (
            <MenuContext.Provider value={{
                inlineCollapsed,
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
                        [`tv-menu-inline-collapsed`]: inlineCollapsed,
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