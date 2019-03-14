import React from 'react';
import { Component, PropTypes } from '@Libs';
import Input from '@input';

export default class Radio extends Component {
    static propTypes = {
        className: PropTypes.string,
        value: PropTypes.string,
        name: PropTypes.string,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func
    };

    static defaultProps = {
    };

    constructor(props) {
        super(props);
        this.state = {
            stateChecked: this.getChecked(props)
        }
    }
    static getDerivedStateFromProps(nextProps, prevState){
        return {
            stateChecked: nextProps.checked
        }
    }

    getChecked(props){
        return Boolean(props.checked)
    }
    handleChange(evt){
        const checked = evt.target.checked;
        if(checked){
            const { onChange, value } = this.props;
            onChange && onChange(evt, value)
        }
        this.setState({stateChecked:checked})
    }
    handleFocus(evt){
        const { onFocus } = this.props;
        onFocus && onFocus(evt)
    }
    handleBlur(evt){
        const { onBlur } = this.props;
        onBlur && onBlur(evt)
    }

    render() {
        const { children, disabled, onChange, onFocus, onBlur, name, checked, ...otherProps } = this.props;
        const { stateChecked } = this.state;
        return (
            <label className={this.className('tv-radio-label', {
                'tv-radio-checked': stateChecked,
                'tv-radio-disabled': disabled
            })}>
                <Input
                    name={name}
                    type="radio"
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