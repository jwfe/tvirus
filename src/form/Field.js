import React from 'react';
import { Component, noop, PropTypes } from '@Libs';

import Input from '@input';
import Search from '@search';
import Sliderbar from '@sliderbar';
import Radio from '@radio';
import Checkbox from '@checkbox';
import Switch from '@switch';
import Select from '@select';
import Cascader from '@cascader';
import Datepicker from '@datepicker';

import { FormItemContext } from './FormItemContext';
/**
 * form子节点，其他属性可以参考各组件参数
 */
export default class FormField extends Component {
    static propTypes = {
        /** 节点名称，可选 'input', 'search', 'sliderbar', 'radio', 'checkbox', 'switch', 'select', 'cascader', 'datepicker' */
        tagName: PropTypes.oneOf([
            'input', 'search', 'sliderbar', 'radio', 'checkbox',
            'switch', 'select', 'cascader', 'datepicker'
        ]),
        /** 默认值 */
        value: PropTypes.string
    };
    static defaultProps = {
        tagName: 'input',
        mode: 'day',
        trigger: 'click',
        disabledDate: noop
    };
    constructor(props){
        super(props);
        this.state = {
            currentValue: props.value || ''
        }
    }
    static contextType = FormItemContext;
    componentDidMount(){
        this.context.onFieldChange(this.props.name, this.state.currentValue);
    }
    onFieldChange = (value) => {
        this.setState({currentValue: value}, () => {
            this.context.onFieldChange(this.props.name, value);
        });
    }
    getComponent(str){
        if(str === 'input'){
            return Input;
        }
        if(str === 'search'){
            return Search;
        }
        if(str === 'sliderbar'){
            return Sliderbar;
        }
        if(str === 'radio'){
            return Radio;
        }
        if(str === 'checkbox'){
            return Checkbox;
        }
        if(str === 'switch'){
            return Switch;
        }
        if(str === 'select'){
            return Select;
        }
        if(str === 'cascader'){
            return Cascader;
        }
        if(str === 'datepicker'){
            return Datepicker;
        }
    }
    render(){
        const { tagName, children, value, ...other } = this.props;
        const { currentValue } = this.state;

        return React.createElement(this.getComponent(tagName), {
            onChange: this.onFieldChange || noop,
            onBlur: this.onFieldBlur,
            value: currentValue,
            ...other
        }, children)

    }
}