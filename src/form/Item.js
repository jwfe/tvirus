import React from 'react';
import { Component, PropTypes, Transition, Animation } from '@Libs';
import { Row, Col } from '@grid';
import { FormContext } from './FormContext';

export default class SubMenu extends Component {
    state = {
        explain: null
    }
    constructor(props) {
        super(props);
    }
    static contextType = FormContext
    static propTypes = {
    }

    render(){
        const { label, children } = this.props;
        const { explain } = this.state;

        if(!label){
            return (
                <div className={this.className('tv-form-item')}>
                    <div className={this.className('tv-form-item-control', {
                        'has-error': explain
                    })}>
                        <span className="tv-form-item-children">
                            {children}
                        </span>
                        {explain && <div className="tv-form-explain">{explain}</div>}
                    </div>
                </div>
            )
        }

        return (
            <Row className={this.className('tv-form-item')}>
                <Col span="5">
                    <label title={label}>{ label }</label>
                </Col>
                <Col span="12">
                    <div className={this.className('tv-form-item-control', {
                        'has-error': explain
                    })}>
                        <span className="tv-form-item-children">
                            {children}
                        </span>
                        {explain && <div className="tv-form-explain">{explain}</div>}
                    </div>
                </Col>
            </Row>
        )
    }
}