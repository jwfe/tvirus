import React from 'react';
import { Component, PropTypes } from '@Libs';
import Icon from '@icon';

export default class Option extends Component {
    static propTypes = {
        /** 自定义样式 */
        className: PropTypes.string,
        /** option value */
        value: PropTypes.string,
        /** 默认是否选中 */
        selected: PropTypes.bool,
        /** 是否禁用 */
        disabled: PropTypes.bool,
        /** 点击后的回调 */
        onClick: PropTypes.func
    };

    static defaultProps = {
        disabled: false
    };

    constructor(props) {
        super(props);
        this.state = {
            selected: props.selected
        };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.selected !== prevState.selected){
            return {
                selected: nextProps.selected
            }
        }
        return {}
    }

    handleClick = () => {
        const { value, children, onClick, disabled } = this.props;
        if(disabled){
            return;
        }
        console.log(55555,value,'index');
        this.setState({
            selected: true
        }, () => {
            onClick && onClick(value, children);
        })
    }
    render() {
        const { value, children, disabled, icon, selection, autoCtrol } = this.props;
        const { selected } = this.state;
        return (
            <li 
            key={value}
            className={this.className('tv-select-option', {
                'tv-select-option-disabled': disabled,
                'tv-select-option-selected': selected
            })}
            onClick={this.handleClick}
            >
                {icon && <Icon type={icon} />}
                {
                    selection && <div key={value} className={this.classNames(["tv-checkbox-label", "tv-checkbox-label-size-small", {
                        'tv-checkbox-checked': selected,
                        'tv-checkbox-disabled': disabled
                    }])}>
                            <span key={value} className="tv-input-wraper">
                                <input className="tv-input tv-input-size-small tv-input-checkbox" type="checkbox" autoComplete="off" value="" />
                            </span>{children}
                        </div>
                }
                {!selection && children}
            </li>
        );
    }
}