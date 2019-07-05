import React from 'react';
import { Link } from 'react-router-dom'

import { 
    Util,
    Component, PropTypes, Portal, noop, Animation,
    Dialog,
    Icon,  Button,
    Input, Checkbox, Form,
    Table
} from 'tvirus';

export default class DemoLogin extends Component{
    constructor(props) {
        super(props);
        
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
                render: (text, record) => (
                    <span>
                        <a style={{marginRight: 10}} href="javascript:;">Invite {record.name}</a>
                        <a href="javascript:;">Delete</a>
                    </span>
                ),
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

        this.state = {
            state: 1,    
            ...this.data1(),
            columns2,
            data2,
        }
    }

    data1(){
        const columns = [{"title":"日期","dataIndex":"time","minWidth":200,"align":"center"},{"title":"回复率","dataIndex":"replyed_rate","minWidth":200,"align":"center"},{"title":"回复数","dataIndex":"replyed_cnt","minWidth":200,"align":"center"}];
        const data = [{"replyed_rate":"100%","replyed_cnt":5,"time":1558886400},{"replyed_rate":"100%","replyed_cnt":7,"time":1559491200},{"replyed_rate":"100%","replyed_cnt":7,"time":1560096000},{"replyed_rate":"100%","replyed_cnt":7,"time":1560700800},{"replyed_rate":"100%","replyed_cnt":12,"time":1561305600}]

        return {
            columns,
            data
        }
    }

    data2(){
        const columns = [{"title":"日期","dataIndex":"time","minWidth":200,"align":"center"},{"title":"回复率","dataIndex":"replyed_rate","minWidth":200,"align":"center"}] 
        const data = [{"replyed_rate":"100%","time":1558886400},{"replyed_rate":"100%","time":1559491200},{"replyed_rate":"100%","time":1560096000},{"replyed_rate":"100%","time":1560700800},{"replyed_rate":"100%","time":1561305600}]

        return {
            columns,
            data
        }
    }

    sync = () => {
        setTimeout(() => {
            this.setState({
                ...(this.state.state ? this.data2() : this.data1()),
                state: !this.state.state
            });
        }, 2000)
    }
      
    render() {
        return (
            <div>
                <Button onClick={this.sync}>加载数据</Button>
                <div style={{width: 800}}>
                    <Table
                        loading={false}
                        style={{width: '100%'}}
                        columns={this.state.columns}
                        data={this.state.data}
                        bordered={true}
                        height={250}
                    />
                </div>
                {/* <div style={{width: 800, margin: 20}}>
                    <Table
                        loading={false}
                        style={{width: '100%'}}
                        columns={this.state.columns2}
                        data={this.state.data2}
                        bordered={true}
                        height={250}
                    />
                </div> */}
            </div>
        )
    }
}