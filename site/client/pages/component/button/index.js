import React, { Component } from 'react';
import Layout from '../../../common/webcomponent';

import { Button } from 'tvirus';

console.log(Button);

export default class ButtonDemo extends Component{
    constructor(props){
        super(props);
        this.state = {
            childs: []
        }
    }
    componentWillMount(){
        this.childs();
    }
    switchSize(size){
        return (
            <div className="code-demo">
                <Button type="primary" size={size}>Primary</Button>
                <Button type="default" size={size}>Default</Button>
                <Button type="dashed" size={size}>Dashed</Button>
                <Button type="danger" size={size}>Danger</Button>
                <Button type="success" size={size}>Success</Button>
                <Button type="warning" size={size}>Warning</Button>
                <Button type="primary" plain={true} size={size}>Primary</Button>
                <Button type="danger" plain={true} size={size}>Danger</Button>
                <Button type="success" plain={true} size={size}>Success</Button>
                <Button type="warning" plain={true} size={size}>Warning</Button>
                <br />
                <Button type="primary" shape="circle" icon="search" size={size}></Button>
                <Button type="primary" shape="circle" icon="like" size={size} plain={true}></Button>
            </div>
        )
    }

    childs(){
        const childs = [];
        childs.push({
            title: '正常状态',
            children: ['large', 'medium', 'small'],
            func: this.switchSize.bind(this)
        });

        childs.push({
            title: '加载状态',
            children: (
                <div className="code-demo">
                    <Button type="primary" loading={true}>Loading</Button>
                </div>
            )
        });

        childs.push({
            title: '禁用状态',
            children: (
                <div className="code-demo">
                    <Button type="primary" disabled>Primary</Button>
                    <Button type="default" disabled>Default</Button>
                    <Button type="dashed" disabled>Dashed</Button>
                    <Button type="danger" disabled>Danger</Button>
                    <Button type="success" disabled>Success</Button>
                    <Button type="warning" disabled>Warning</Button>
                </div>
            )
        });



        childs.push({
            title: '按钮组合',
            children: (
                <div className="code-demo">
                    <Button.Group>
                        <Button>1号位</Button>
                        <Button>2号位</Button>
                        <Button>3号位</Button>
                    </Button.Group>
                    <Button.Group>
                        <Button type="primary">1号位</Button>
                        <Button type="primary">2号位</Button>
                        <Button type="primary">3号位</Button>
                    </Button.Group>
                </div>
            )
        });

        this.setState({childs})
    }

    render() {
        const {childs} = this.state;
        return (
            <Layout {...this.props} 
            title="按钮"
            desc="按钮有四种类型：主按钮、次按钮、虚线按钮、情感按钮、图标按钮。主按钮在同一个操作区域最多出现一次。按钮状态分为正常、加载中、不可点等三种状态。"
            childs={childs}
            />
        )
    }
}