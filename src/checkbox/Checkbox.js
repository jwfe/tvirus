import React from 'react';
import { Component, PropTypes } from '@Libs';
import Input from '@input';

export default class Checkbox extends Component {
    static propTypes = {
        className: PropTypes.string,
        checked: PropTypes.bool,
        disabled: PropTypes.bool,
        autoCtrol: PropTypes.bool,
        value: PropTypes.string,
        size: PropTypes.oneOf(['large', 'medium', 'small']),
        name: PropTypes.string,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func
    };

    static defaultProps = {
        size: 'medium',
        checked: false,
        disabled: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            stateChecked: Boolean(props.checked)
        }
    }

    handleChange(val, key, evt){
        const checked = evt.target.checked;
        const { onChange, value, autoCtrol } = this.props;
        if(autoCtrol){
            return;
        }
        this.setState({
            stateChecked: checked
        }, () => {
            onChange && onChange(value, checked, name, evt);
        })
    }

    render() {
        const { children, disabled, onChange, name, size, checked, autoCtrol, ...otherProps } = this.props;
        const { stateChecked } = this.state;
        return (
            <label className={this.className('tv-checkbox-label', {
                [`tv-checkbox-label-size-${size}`]: size,
                'tv-checkbox-checked': stateChecked,
                'tv-checkbox-disabled': disabled
            })}>
                <Input
                    name={name}
                    type="checkbox"
                    size={size}
                    checked={autoCtrol ? checked : stateChecked}
                    disabled={disabled}
                    onChange={this.handleChange.bind(this)}
                    {...otherProps}
                />
                {children}
            </label>
        );
    }
}