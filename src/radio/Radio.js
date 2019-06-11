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
        if(typeof nextProps.checked == 'undefined' || nextProps.checked === prevState.stateChecked){
            return null;
        }
        return {
            stateChecked: nextProps.checked
        }
    }

    getChecked(props){
        return Boolean(props.checked)
    }
    handleChange(value, name, evt){
        const checked = evt.target.checked;
        if(checked){
            const { onChange, value, name } = this.props;
            onChange && onChange(value, name, evt)
        }
        this.setState({ stateChecked: checked })
    }

    render() {
        const { children, disabled, onChange, name, checked, className, ...otherProps } = this.props;
        const { stateChecked } = this.state;
        return (
            <label className={this.className('tv-radio-label', className, {
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