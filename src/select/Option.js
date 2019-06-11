import React from 'react';
import { Component, PropTypes } from '@Libs';
import Icon from '@icon';
import Checkbox from '@checkbox';

export default class Select extends Component {
    static propTypes = {
        className: PropTypes.string,
        value: PropTypes.string,
        selected: PropTypes.bool,
        disabled: PropTypes.bool,
        onClick: PropTypes.func,
    };

    static defaultProps = {
        disabled: false
    };

    constructor(props) {
        super(props);
        this.state = {
            selected: props.selected
        }
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
                    selection && <div className={this.classNames(["tv-checkbox-label", "tv-checkbox-label-size-small", {
                        'tv-checkbox-checked': selected,
                        'tv-checkbox-disabled': disabled
                    }])}>
                            <span className="tv-input-wraper">
                                <input className="tv-input tv-input-size-small tv-input-checkbox" type="checkbox" autocomplete="off" value="" />
                            </span>{children}
                        </div>
                }
                {!selection && children}
            </li>
        );
    }
}