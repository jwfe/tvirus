
import React, { Component } from 'react';
import Layout from '../../../common/compLayout';

import { Table } from 'tvirus';
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
            const columns = [
                {title: 'Full Name', key: 'name', fixed: 'left'},
                {title: 'Age', width: 80, dataIndex: 'age', key: 'age', fixed: 'left'},
                {title: 'Column 1', dataIndex: 'address', key: '1', width: 200},
                {title: 'Column 2', dataIndex: 'address', key: '2', width: 200},
                {title: 'Column 3', dataIndex: 'address', key: '3', width: 200},
                {title: 'Column 4', dataIndex: 'address', key: '4', width: 200},
                {title: 'Column 5', dataIndex: 'address', key: '5', width: 200},
                {title: 'Column 6', dataIndex: 'address', key: '6', width: 200},
                {title: 'Column 7', dataIndex: 'address', key: '7', width: 200},
                {title: 'Column 8', dataIndex: 'address', key: '8'},
                {
                    title: 'Action',
                    key: 'operation',
                    fixed: 'right',
                    width: 100,
                    render: (text, record) => (
                        <span>
                            <a href="javascript:;">Invite {record.name}</a>
                            <a href="javascript:;">Delete</a>
                        </span>
                    ),
                },
            ];
    
            const data = [];
            for (let i = 0; i < 100; i++) {
                data.push({
                    key: i,
                    name: `Edrward ${i}`,
                    age: 32,
                    address: `London Park no. ${i}`,
                });
            }
              
    
            childs.push({
                title: '正常',
                children: (
                    <div className="code-demo">
                        <Table 
                            style={{height: '200px'}}
                            columns={columns}
                            data={data}
                         />
                    </div>
                )
            });
        })();

        (()=>{
            const columns = [
                    {
                        title: 'Name',
                        dataIndex: 'name',
                        key: 'name',
                        width: 100,
                        fixed: 'left'
                    }, 
                    {
                        title: 'Other',
                        children: [
                            {
                                title: 'Age',
                                dataIndex: 'age',
                                key: 'age',
                                width: 200,
                                sorter: (a, b) => a.age - b.age,
                            }, 
                            {
                                title: 'Address',
                                children: [
                                    {
                                        title: 'Street',
                                        dataIndex: 'street',
                                        key: 'street',
                                        width: 200,
                                    },
                                    {
                                        title: 'Block',
                                        children: [
                                            {
                                                title: 'Building',
                                                dataIndex: 'building',
                                                key: 'building',
                                                width: 100,
                                            },
                                            {
                                                title: 'Door No.',
                                                dataIndex: 'number',
                                                key: 'number',
                                                width: 100,
                                            }
                                        ],
                                    }
                                ],
                            }
                        ],
                    }, 
                    {
                        title: 'Company',
                        children: [
                            {
                                title: 'Company Address',
                                dataIndex: 'companyAddress',
                                key: 'companyAddress',
                                width: 200,
                            }, 
                            {
                                title: 'Company Name',
                                dataIndex: 'companyName',
                                key: 'companyName',
                                width: 200,
                            }
                        ],
                    }, 
                    {
                        title: 'Gender',
                        dataIndex: 'gender',
                        key: 'gender',
                        width: 80,
                        fixed: 'right',
                    }
                ];
                
            const data = [];
            for (let i = 0; i < 100; i++) {
                data.push({
                    key: i,
                    name: 'John Brown',
                    age: i + 1,
                    street: 'Lake Park',
                    building: 'C',
                    number: 2035,
                    companyAddress: 'Lake Street 42',
                    companyName: 'SoftLake Co',
                    gender: 'M',
                });
            }
    
            childs.push({
                title: '多行头',
                children: (
                    <div className="code-demo">
                        <Table 
                            bordered={true}
                            style={{height: '500px'}}
                            columns={columns}
                            data={data}
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
            