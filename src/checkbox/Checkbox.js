import React from 'react';
import { Component, PropTypes } from '@Libs';
import Input from '@input';

export default class Checkbox extends Component {
    static propTypes = {
        /** 自定义样式 */
        className: PropTypes.string,
        /** 设置是否默认选中 */
        checked: PropTypes.bool,
        /** 设置禁用 */
        disabled: PropTypes.bool,
        /** 自主控制，state不生效 */
        autoCtrol: PropTypes.bool,
        /** 值 */
        value: PropTypes.string,
        /** 设置大小，可选值为 'large', 'small' 或不设 */
        size: PropTypes.oneOf(['large', 'medium', 'small']),
        /** input的key，结合form组件时有意义 */
        name: PropTypes.string,
        /** change回调，返回 value, checked, name, evt */
        onChange: PropTypes.func
    };

    static defaultProps = {
        size: 'medium',
        checked: false,
        disabled: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            checked: Boolean(props.checked)
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.checked !== prevState.preChecked){
            return {
                preChecked: nextProps.checked,
                checked: nextProps.checked
            }
        }
        return null;
    }

    handleChange = (val, key, evt) => {
        const checked = evt.target.checked;
        const { onChange, value, autoCtrol, name } = this.props;
        if(autoCtrol){
            return;
        }
        this.setState({
            checked: checked
        }, () => {
            onChange && onChange(value, checked, name, evt);
        })
    }

    render() {
        const { children, disabled, onChange, name, size, checked, autoCtrol, ...otherProps } = this.props;
        return (
            <label className={this.className('tv-checkbox-label', {
                [`tv-checkbox-label-size-${size}`]: size,
                'tv-checkbox-checked': this.state.checked,
                'tv-checkbox-disabled': disabled
            })}>
                <Input
                    name={name}
                    type="checkbox"
                    size={size}
                    checked={autoCtrol ? checked : this.state.checked}
                    disabled={disabled}
                    onChange={this.handleChange}
                    {...otherProps}
                />
                {children}
            </label>
        );
    }
}