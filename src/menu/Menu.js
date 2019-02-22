import React from 'react';
import { Component, PropTypes, noop } from '../../libs';
import { MenuContext, addPropsIndex } from './MenuContext';

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: '',
            openNodes: []    
        }
    }
    static propTypes = {
        className: PropTypes.string,
        indent: PropTypes.number,
        theme: PropTypes.string,
        onClick: PropTypes.func,
        onOpenChange: PropTypes.func,

    };
    static defaultProps = {
        indent: 24,
        onOpenChange: noop
        //todo: 定义主题名称
        // theme: '',
    };
    onClick(index){
        this.props.onClick(this, index);
        this.setState({
            activeIndex: index
        })
    }
    closeMenu(index){
        const { openNodes } = this.state;
        openNodes.splice(openNodes.indexOf(index), 1);

        this.setState({
            openNodes
        })
    }
    openMenu(index) {
        const { openNodes } = this.state;
        if(this.opened(index)){
            return;
        }
        openNodes.push(index);
        this.props.onOpenChange(this, index);
        this.setState({ openNodes })
    }
    opened(index){
        return this.state.openNodes.indexOf(index) !== -1;
    }
    defaultOpenActive(activeIndex){
        const openPath = activeIndex.split('-');
        const openNodes = [];
        openPath.reduce(function(a, b){ 
            const value = `${a}-${b}`;
            openNodes.push(value);
            return value;
        });
        this.setState({ openNodes, activeIndex });
    }
    render(){
        const { children, mode } = this.props;
        const isHorizontal = mode === 'horizontal';
        const childrenWithProps = addPropsIndex(children, 'menu');
        return (
            <MenuContext.Provider value={{
                opened: this.opened.bind(this),
                openMenu: this.openMenu.bind(this),
                closeMenu: this.closeMenu.bind(this),
                onClick: this.onClick.bind(this),
                defaultOpenActive: this.defaultOpenActive.bind(this),
                activeIndex: this.state.activeIndex
            }}>
                <ul 
                    style={this.style()}
                    className={this.className('tv-menu', {
                        'tv-menu-horizontal': isHorizontal
                    })}
                >
                    {childrenWithProps}
                </ul>
            </MenuContext.Provider>
        )
    }
}