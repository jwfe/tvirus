
import React, { Component } from 'react';
import Layout from '../../../common/compLayout';

import Chart from '@chart';
import './index.less'

export default class ChartDemo extends Component{
    constructor(props){
        super(props);
        this.state = {
            childs: [],
            option: {
                xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line'
                }]
            }
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
                    <Chart option = {this.state.option}/>
                </div>
            )
        });

        this.setState({childs})
    }

    render() {
        const {childs} = this.state;
        
        return <Layout {...this.props} 
            className="main-chart-box"
            title="Chart"
            desc="Chart的说明"
            childs={childs}
        />
    }
}
            