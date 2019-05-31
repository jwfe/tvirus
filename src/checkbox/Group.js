import React from 'react';
import { Component, PropTypes } from '@Libs';

export default class Group extends Component {
    static propTypes = {
        className: PropTypes.string,
        defaultValue: PropTypes.arrayOf(PropTypes.string),
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