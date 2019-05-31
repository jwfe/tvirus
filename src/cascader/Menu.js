import React from 'react';
import { Component, PropTypes } from '@Libs';

export default class CascaderMenu extends Component {
    static propTypes = {
        className: PropTypes.string,
        changeOnSelect: PropTypes.bool,
        options: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.string
        })).isRequired,
        onChange: PropTypes.func,
    };

    static defaultProps = {
    };

    constructor(props) {
        super(props);
        this.state = {
            options: props.options,
            activeValue: [],
            activeLabel: [],
        }
    }

    componentDidMount(){
    }

    getActiveOptions(){
        const { activeValue, options } = this.state;

        const loadActiveOptions = (options = [], activeOptions = []) => {
            const level = activeOptions.length;
            activeOptions[level] = options;
            let active = activeValue[level];
            if (active) {
                options = options.filter(option => option.value === active)[0];
                if (options && options.children) {
                    loadActiveOptions(options.children, activeOptions);
                }
            }
            return activeOptions;
        };

        return loadActiveOptions(options);

    }

    handleClick(menu, index){
        let { onChange, changeOnSelect } = this.props;
        let { activeValue, activeLabel } = this.state
        if(!index){
            activeValue = [menu.value];
            activeLabel = [menu.label];
        } else {
            activeValue.splice(index, activeValue.length - 1, menu.value);
            activeLabel.splice(index, activeLabel.length - 1, menu.label);
        }

        this.setState({activeValue, activeLabel})

        const isLast = !menu.children;
        if(!changeOnSelect && !isLast){
            return;
        }
        onChange && onChange(activeValue, activeLabel, isLast);
    }

    renderMenus(){
        const { activeValue } = this.state;
        return this.getActiveOptions().map((menu, index)=>{

            const menuItem = menu.map((item, index2) => {
                const events = {};

                if(!item.disabled){
                    events['onClick'] = () => {
                        this.handleClick(item, index);
                    };
                }

                return (
                    <li
                        key={index2}
                        className={this.className('tv-cascader-menu', {
                            'tv-cascader-menu-active': item.value === activeValue[index],
                            'tv-cascader-menu-disabled': item.disabled,
                        })}
                        {...events}
                    >
                        {item.label}
                        {item.expand}
                        <i className="tv-cascader-arrow"></i>
                    </li>
                )
            })

            return (
                <ul key={index}>
                    {menuItem}
                </ul>
            )
        })
    }

    render() {
        const { disabled } = this.props;
        return (
            <div className={this.className('tv-cascader-menus', {
                'tv-cascader-menus-disabled': disabled
            })}>
                {this.renderMenus()}
            </div>
        );
    }
}