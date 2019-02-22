import React from 'react';
import { Component, PropTypes } from '../../libs';
import { MenuContext, addPropsIndex } from './MenuContext';

export default class Menu extends Component {
    constructor(props) {
        super(props);
    }
    static contextType = MenuContext;
    static propTypes = {
        className: PropTypes.string,
    };

    componentDidMount(){
        if(this.props.opened){
            this.context.defaultOpenActive(this.props.index);
        }
    }
    render(){
        const { children, mode, title, index, theme} = this.props;
        const isHorizontal = mode === 'horizontal';
        const childrenWithProps = addPropsIndex(children, index);

        return (
            <li 
                style={this.style()}
                className={this.className('tv-menu-item-group', {
                    'tv-menu-horizontal': isHorizontal,
                    [`tv-menu-theme-${theme}`]: theme
                })}
            >
                <div className={this.className('tv-menu-item-group-title', className)}>
                    {title}
                    <i className={this.className('tv-menu-submenu-arrow')}></i>
                </div>
                <ul>
                    {childrenWithProps}
                </ul>
            </li>
        )
    }
}