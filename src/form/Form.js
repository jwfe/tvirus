import React from 'react';
import { Component, PropTypes, Portal, noop, Animation } from '@Libs';
import { FormContext } from './FormContext';

export default class Form extends Component {
    static propTypes = {
        rules: PropTypes.object
    };

    static defaultProps = {
        
    };

    state = {
        model: {},
        fields: []
    }

    constructor(props) {
        super(props);
    }

    onHandleSubmit = (evt) => {
        evt.preventDefault();
        this.validate();
    }

    onChange = (key, value) => {
        const { model } = this.state;
        model[key] = value;
        this.setState({model});
    }

    addField = (field) => {
        const { fields } = this.state;
        fields.push(field);
        
        this.setState({
            fields
        })
    }

    removeField = (field) => {
        if(field.props.name){
            const { fields } = this.state;
            fields.splice(fields.indexOf(field), 1);
            this.setState({fields});
        }
    }

    validate(){
        const { fields } = this.state;
        const { onSubmit } = this.props;
        let valid = true;
        let count = 0;

        if (fields.length === 0) {
            return onSubmit(valid);
        }

        fields.forEach(field => {
            field.validate(errors => {
                if (errors) {
                    valid = false;
                }
                if (++count === fields.length) {
                    onSubmit(valid, this.state.model);
                }
            });
        });
    }

    render(){
        return (
            <FormContext.Provider value={{
                model: this.state.model,
                rules: this.props.rules,
                addField: this.addField,
                removeField: this.removeField,
                onFieldChange: this.onChange
            }}
            >
            <form 
            style={this.style()}
            className={this.className('tv-form')}
            onSubmit={this.onHandleSubmit}>
                {this.props.children}
            </form>
            </FormContext.Provider>
        )
    }
    
}