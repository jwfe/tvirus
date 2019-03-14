import React from 'react';
import { Component, PropTypes } from '@Libs';

export default class Group extends Component {
    static propTypes = {
        className: PropTypes.string,
        defaultValue: PropTypes.string,
        name: PropTypes.string,
        disabled: PropTypes.bool,
        onChange: PropTypes.func
    };

    static defaultProps = {
        disabled: false
    };

    constructor(props) {
        super(props);
        this.state = {
            defaultValue: props.defaultValue
        }
    }
    handleChange(evt, value){
        const { onChange } = this.props;
        onChange && onChange(evt, value);
        this.setState({defaultValue: value})
    }

    render() {
        const { children, disabled, name } = this.props;
        const { defaultValue } = this.state;

        const cloneChildren = React.Children.map(children, child => {
            return React.cloneElement(child, Object.assign({}, child.props, {
                name: !name ? (+new Date) : name,
                onChange: this.handleChange.bind(this),
                checked: typeof defaultValue == 'undefined' ? child.props.checked : child.props.value === defaultValue,
                disabled: disabled || child.props.disabled
            }))
        });

        return (
            <div className={this.className('tv-radio-group')}>
                {cloneChildren}
            </div>
        );
    }
}