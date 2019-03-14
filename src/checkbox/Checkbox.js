import React from 'react';
import { Component, PropTypes } from '@Libs';
import Input from '@input';

export default class Checkbox extends Component {
    static propTypes = {
        className: PropTypes.string,
        checked: PropTypes.bool,
        defaultChecked: PropTypes.bool,
        disabled: PropTypes.bool,
        value: PropTypes.string,
        name: PropTypes.string,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func
    };

    static defaultProps = {
        checked: false,
        defaultChecked: false,
        disabled: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            stateChecked: Boolean(props.checked)
        }
    }

    handleChange(evt){
        const checked = evt.target.checked;
        const { onChange, value } = this.props;
        onChange && onChange(evt, value, checked);
        this.setState({
            stateChecked: checked
        })
    }

    render() {
        const { children, disabled, onChange, name, checked, ...otherProps } = this.props;
        const { stateChecked } = this.state;
        return (
            <label className={this.className('tv-checkbox-label', {
                'tv-checkbox-checked': stateChecked,
                'tv-checkbox-disabled': disabled
            })}>
                <Input
                    name={name}
                    type="checkbox"
                    checked={stateChecked}
                    disabled={disabled}
                    onChange={this.handleChange.bind(this)}
                    {...otherProps}
                />
                {children}
            </label>
        );
    }
}