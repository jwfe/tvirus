import React from 'react';
import { Component, PropTypes } from '@Libs';

export default class Group extends Component {
    static propTypes = {
        /** 自定义样式 */
        className: PropTypes.string,
        /** 默认选中项的value */
        value: PropTypes.string,
        /** radioButton的风格样式，支持描边和填色2种 */
        buttonStyle: PropTypes.oneOf(['solid', 'outline']),
        /** input name */
        name: PropTypes.string,
        /** 禁用整个分组 */
        disabled: PropTypes.bool,
        onChange: PropTypes.func
    };

    static defaultProps = {
        disabled: false
    };

    constructor(props) {
        super(props);
        this.state = {
            defaultValue: props.value
        }
    }
    handleChange = (value, key, evt) => {
        const { onChange, name } = this.props;
        onChange && onChange(value, name, evt);
        this.setState({defaultValue: value})
    }

    render() {
        const { children, disabled, name, className, buttonStyle } = this.props;
        const { defaultValue } = this.state;

        const cloneChildren = React.Children.map(children, (child, index) => {
            return React.cloneElement(child, Object.assign({}, child.props, {
                key: index,
                name: !name ? (+new Date) : name,
                onChange: this.handleChange,
                checked: typeof defaultValue == 'undefined' ? child.props.checked : child.props.value === defaultValue,
                disabled: disabled || child.props.disabled
            }))
        });

        return (
            <div className={this.className('tv-radio-group', className, {
                [`tv-radio-group-${buttonStyle}`]: buttonStyle
            })}>
                {cloneChildren}
            </div>
        );
    }
}