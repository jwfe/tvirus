import React from 'react';
import { Component, PropTypes } from '@Libs';

export default class Group extends Component {
    static propTypes = {
        /** 自定义样式 */
        className: PropTypes.string,
        /** 组合后的默认选中项 */
        defaultValue: PropTypes.arrayOf(PropTypes.string),
        /** 必须设置name，用来控制是否同组 */
        name: PropTypes.string,
        /** 是否整组禁用 */
        disabled: PropTypes.bool,
        /** change回调 */
        onChange: PropTypes.func
    };

    static defaultProps = {
        disabled: false
    };

    constructor(props) {
        super(props);
        this.state = {
            defaultValue: props.defaultValue || []
        }
    }
    handleChange(value, checked, key, evt){
        const { onChange } = this.props;
        let { defaultValue } = this.state;

        if(!checked){
            defaultValue = this.filterValues(value);
        } else {
            defaultValue.push(value);
        }

        onChange && onChange(defaultValue, key);
        this.setState({defaultValue})
    }
    filterValues(value){
        const { defaultValue } = this.state;
        return defaultValue.map((val) => {
            return value !== val;
        });
    }
    /**
     * get children node
     * @param {Object} child children node
     */
    childChecked(child){
        const { defaultValue } = this.state;
        if(!defaultValue || child.checked){
            return child.checked
        }
        const values = defaultValue.filter((value) => {
            return value === child.value;
        });
        return !!values.length;
    }

    render() {
        const { children, disabled, name } = this.props;

        const cloneChildren = React.Children.map(children, (child, index) => {
            return React.cloneElement(child, Object.assign({}, child.props, {
                key: index,
                name: !name ? (+new Date) : name,
                onChange: this.handleChange.bind(this),
                checked: this.childChecked(child.props),
                disabled: disabled || child.props.disabled
            }))
        });

        return (
            <div className={this.className('tv-checkbox-group')}>
                {cloneChildren}
            </div>
        );
    }
}