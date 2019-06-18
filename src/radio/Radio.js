import React from 'react';
import { Component, PropTypes } from '@Libs';
import Input from '@input';

export default class Radio extends Component {
    static propTypes = {
        /** 自定义样式 */
        className: PropTypes.string,
        /** 设置是否默认选中 */
        checked: PropTypes.bool,
        /** 设置禁用 */
        disabled: PropTypes.bool,
        /** raido 值 */
        value: PropTypes.string,
        /** 设置大小，可选值为 'large', 'small' 或不设 */
        size: PropTypes.oneOf(['large', 'medium', 'small']),
        /** radio name */
        name: PropTypes.string,
        /** checked变化后的回调 */
        onChange: PropTypes.func
    };

    static defaultProps = {
        size: 'medium',
        checked: false,
        disabled: false
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
    handleChange(val, key, evt){
        const checked = evt.target.checked;
        if(checked){
            const { onChange, value, name } = this.props;
            onChange && onChange(value, name, evt)
        }
        this.setState({ stateChecked: checked })
    }

    render() {
        const { size, children, disabled, onChange, name, checked, className, ...otherProps } = this.props;
        const { stateChecked } = this.state;
        return (
            <label className={this.className('tv-radio-label', className, {
                [`tv-checkbox-label-size-${size}`]: size,
                'tv-radio-checked': stateChecked,
                'tv-radio-disabled': disabled
            })}>
                <Input
                    name={name}
                    type="radio"
                    size={size}
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