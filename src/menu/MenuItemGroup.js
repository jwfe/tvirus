import React from 'react';
import { Component, PropTypes } from '@Libs';
import { MenuContext, addPropsIndex } from './MenuContext';

export default class MenuItemGroup extends Component {
    constructor(props) {
        super(props);
    }
    static contextType = MenuContext;
    static propTypes = {
        /** 自定义样式 */
        className: PropTypes.string,
    };

    componentDidMount(){
        const { children, index } = this.props;
        const opened = [];
        React.Children.map(children, (child) => {
            if(child.props.opened){
                opened.push(true);
            }
        });
        if(opened.length){
            this.context.defaultOpenActive(index);
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
                <div className={this.className('tv-menu-item-group-title')}>
                    {title}
                    <i className={this.className('tv-menu-submenu-arrow')}></i>
                </div>
                <ul className="tv-menu-item-group-children">
                    {childrenWithProps}
                </ul>
            </li>
        )
    }
}