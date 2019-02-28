import React from 'react';
import { Component, PropTypes } from '@Libs';

export default class Input extends Component {
    static propTypes = {
        type: PropTypes.string.string,
        className: PropTypes.string,
        autoComplete: PropTypes.string,
        value: PropTypes.string,
        prefix: PropTypes.string,
        suffix: PropTypes.string,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onPressEnter: PropTypes.func,
    };

    static defaultProps = {
        type: 'text',
        autoComplete: 'off',
    };

    constructor(props) {
        super(props);
    }
    handleChange(){}
    handleFocus(){}
    handleBlur(){}
    handlePressEnter(){}
    render() {
        const { type, autoComplete, value, placeholder, ...otherProps } = this.props;

        return (
            <span className={this.className('tv-input-wraper')}>
                <input
                    className="tv-input" type={type}
                    value={value}
                    autoComplete={autoComplete}
                    placeholder={placeholder}
                    onChange={this.handleChange.bind(this)}
                    onFocus={this.handleFocus.bind(this)}
                    onBlur={this.handleBlur.bind(this)}
                    onPressEnter={this.handlePressEnter.bind(this)}
                    {...otherProps}
                />
            </span>
        );
    }
}