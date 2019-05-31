import React from 'react';
import AsyncValidator from 'async-validator';

import { Component, noop } from '@Libs';
import { Row, Col } from '@grid';
import { FormContext } from './FormContext';
import { FormItemContext } from './FormItemContext';

export default class FormItem extends Component {
    state = {
        explain: null
    }
    constructor(props) {
        super(props);
    }
    static contextType = FormContext
    static propTypes = {
    }

    componentDidMount() {
        const { name } = this.props;

        if (name) {
            this.context.addField(this);
        }
    }

    componentWillUnmount() {
        this.context.removeField(this);
    }

    onBlur = () => {
        this.validate();
    }

    validate(callback = noop){
        const { name } = this.props;
        const { rules } = this.context;
        const _rules = rules[name];
        if(!_rules){
            return callback(null);
        }

        const descriptor = { [name]: _rules };
        const validator = new AsyncValidator(descriptor);

        this.setState({pending: true});

        const data = { [name]: this.fieldValue() };


        validator.validate(data, { firstFields: true }, (errors) => {
            this.setState({
                explain: errors ? errors[0].message : '',
                pending: false,
                valid: !errors
            }, () => {
                callback(errors);
            });
        })
    }

    fieldValue() {
        const model = this.context.model;
        if (!model || !this.props.name) { return; }
        const temp = this.props.name.split(':');
        return temp.length > 1 ? model[temp[0]][temp[1]] : model[this.props.name];
    }
    renderChildren(){
        const { children } = this.props;
        const { explain, pending } = this.state;
        return (
            <FormItemContext.Provider value={{
                onFieldBlur: this.onBlur,
                onFieldChange: this.context.onFieldChange
            }}
            >
                <div className={this.className('tv-form-item-control', {
                    'has-error': explain,
                    'is-pending': pending,
                })}>
                    <span className="tv-form-item-children">
                        {children}
                    </span>
                    {explain && <div className="tv-form-explain">{explain}</div>}
                </div>
            </FormItemContext.Provider>
        )
    }
    render(){
        const { label } = this.props;

        if(!label){
            return (
                <div className={this.className('tv-form-item')}>
                    {this.renderChildren()}
                </div>
            )
        }

        return (
            <Row className={this.className('tv-form-item')}>
                <Col span="5">
                    <label title={label}>{ label }</label>
                </Col>
                <Col span="12">
                    {this.renderChildren()}
                </Col>
            </Row>
        )
    }
}