
import React, { Component } from 'react';
import Layout from '../../../common/compLayout';

import Card from '@card';
import './index.less'

export default class CardDemo extends Component{
    constructor(props){
        super(props);
        this.state = {
            childs: []
        }
    }

    componentWillMount(){
        this.childs();
    }

    childs(){
        const childs = [];
        childs.push({
            title: '正常',
            children: (
                <div className="code-demo">
                    <Card></Card>
                </div>
            )
        });

        this.setState({childs})
    }

    render() {
        const {childs} = this.state;

        return <Layout {...this.props} 
            className="main-card-box"
            title="Card"
            desc="Card的说明"
            childs={childs}
        />
    }
}
            