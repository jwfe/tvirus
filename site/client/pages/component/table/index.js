import React, { Component } from 'react';
import Layout from '../../../common/webcomponent';

import { Util, Table } from 'tvirus';
import './index.less'

export default class TableDemo extends Component{
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
        
        (()=>{
            const columns2 = [
                {title: 'Full Name', width: 150, key: 'name'},
                {title: 'Age', width: 100, dataIndex: 'age', key: 'age'},
                {title: 'Column 1', dataIndex: 'address1', width: 200},
                {title: 'Column 2', dataIndex: 'address2', width: 200},
                {title: 'Column 3', dataIndex: 'address3', width: 200},
                {title: 'Column 4', dataIndex: 'address4', width: 200},
                {title: 'Column 5', dataIndex: 'address5', width: 200},
                {title: 'Column 6', dataIndex: 'address6', width: 200},
                {title: 'Column 7', dataIndex: 'address7', width: 200},
                {title: 'Column 8', dataIndex: 'address8', width: 200},
                {
                    title: 'Action',
                    key: 'operation',
                    width: 180,
                    render: function (text, record){
                        return {
                            children: (
                                <span>
                                    <a style={{marginRight: 10}} href="javascript:;">Invite {record.name}</a>
                                    <a href="javascript:;">Delete</a>
                                </span>
                            )
                        }
                    },
                },
            ];
    
            const data2 = [];
            for (let i = 0; i < 100; i++) {
                data2.push({
                    key: i,
                    name: `Edrward ${i}`,
                    age: 32,
                    address1: `London Park no. ${i}`,
                    address2: `London Park no. ${i}`,
                    address3: `London Park no. ${i}`,
                    address4: `London Park no. ${i}`,
                    address5: `London Park no. ${i}`,
                    address6: `London Park no. ${i}`,
                    address7: `London Park no. ${i}`,
                    address8: `London Park no. ${i}`
                });
            }
              
    
            childs.push({
                title: '正常',
                children: (
                    <div className="code-demo">
                        <Table
                            footer={true}
                            sumFirstText="总计"
                            style={{width: '100%'}}
                            columns={columns2}
                            data={data2}
                            bordered={true}
                            height={550}
                        />
                    </div>
                )
            });
        })();

        (()=>{
            const columns = [
                {
                    width: 150,
                    title: '日期', key: 'date', fixed: 'left', align: 'center', sort: (a, b)=>{
                        return Util.date.parse(a) - Util.date.parse(b);
                    }
                },
                {title: '星期', width: 120, dataIndex: 'week', key: 'week', align: 'center'},
                {title: '预测', dataIndex: 'fc', key: 'fc', width: 200, align: 'center'},
                {title: '去年同星期', dataIndex: 'last_year', width: 200, align: 'center'},
                {title: '已有/实际', dataIndex: 'otb', key: 'otb', width: 200, align: 'center'},
                {
                    title: 'vs 去年同星期实际', align: 'center',
                    
                    children: [
                        {
                            title: '差值',
                            dataIndex: 'dv', 
                            width: 200, align: 'center'
                        },
                        {
                            title: '差异率',
                            dataIndex: 'd_rate', 
                            width: 200, align: 'center'
                        }
                    ]
                },
                {
                    title: 'vs 已有/实际', align: 'center',
                    children: [
                        {
                            title: '差值',
                            dataIndex: 'otb_dv', 
                            width: 200, align: 'center'
                        },
                        {
                            title: '差异率',
                            dataIndex: 'otb_d_rate', 
                            width: 200, align: 'center'
                        }
                    ]
                },
                {
                    title: 'vs 预算', 
                    align: 'center',
                    children: [
                        {
                            title: '差值',
                            dataIndex: 'budget_dv', 
                            width: 200, align: 'center'
                        },
                        {
                            title: '差异率',
                            dataIndex: 'budget_d_rate', 
                            width: 200, align: 'center'
                        }
                    ]
                }
            ];
            
            const data = [];
            for (let i = 0; i < 31; i++) {
                const index = i + 1;
                const _date = `2019-05-${index > 9 ? i : ('0' + index)}`;
                data.push({
                    date: _date,
                    week: '星期1',
                    fc: parseInt(Math.random() * 100),
                    last_year: parseInt(Math.random() * 100),
                    otb: '-',
                    dv: parseInt(Math.random() * 100),
                    d_rate: parseInt(Math.random() * 100),
                    otb_dv: parseInt(Math.random() * 100),
                    otb_d_rate: parseInt(Math.random() * 100),
                    budget_dv: parseInt(Math.random() * 100),
                    budget_d_rate: parseInt(Math.random() * 100)
                });
            }

            childs.push({
                title: 'loading',
                children: (
                    <div className="code-demo">
                        <Table
                            loading={true}
                            style={{width: '100%'}}
                            columns={columns}
                            data={data}
                            bordered={true}
                            height={350}
                        />
                    </div>
                )
            });
    
            childs.push({
                title: '多行头',
                children: (
                    <div className="code-demo">
                        <Table
                            loading={false}
                            style={{width: '100%'}}
                            columns={columns}
                            data={data}
                            bordered={true}
                            height={450}
                        />
                    </div>
                )
            });
        })()

        this.setState({childs})
    }

    render() {
        const {childs} = this.state;

        return <Layout {...this.props} 
            className="main-table-box"
            title="Table"
            desc="表格被公认为是展现数据最为清晰、高效的形式之一。"
            childs={childs}
        />
    }
}
            