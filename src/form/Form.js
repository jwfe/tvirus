import React from 'react';
import { Component, PropTypes, Portal, noop, Animation } from '@Libs';
import { FormContext } from './FormContext';

export default class Form extends Component {
    static propTypes = {
        
    };

    static defaultProps = {
        
    };

    state = {

    }

    constructor(props) {
        super(props);
    }

    onHandleSubmit = (evt) => {
        evt.preventDefault();
        this.props.onSubmit();
    }

    onChange = (key) => {

    }

    render(){
        return (
            <FormContext.Provider value={{
                onChange: this.onChange
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