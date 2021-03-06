import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import { 
    Dialog,
    Icon,  Button,
    Input, Checkbox, Form
} from 'tvirus';
import './css/login.less';

import BwLogo from './logo';

const rules = {
    username: [
        {
            required: true,
            message: '请填写用户名'
        }
    ],
    password: [
        {
            required: true,
            message: '请填写密码'
        }
    ]
}

export default class DemoLogin extends Component{
    state = {loading: false}
    handleOnSubmit = (valid) => {
        if(!valid){
            return false;
        }
        this.setState({loading: true})
        //todo: 模拟异步登录
        setTimeout(() => {
            this.props.history.push('/demo');
        }, 5000);
    }
    onHandleChange = (...arg) => {
        console.log(...arg);
    }
    render(){
        return (
            <div className="tv-user-layout">
                <div className="tv-user-layout-top">
                    <div className="tv-user-layout-header">
                        <a href="#"><BwLogo /></a>
                    </div>
                    <div className="tv-user-layout-desc">
                        酒店智慧解决之道
                    </div>
                </div>
                <div className="tv-components-login-index-login">
                    <Form onSubmit={this.handleOnSubmit} rules={rules}>
                        <Form.Item name="username">
                            <Form.Field value="admin" name="username" tagName="input" size="large" placeholder="用户名" prefix="user" />
                        </Form.Item>
                        <Form.Item name="password">
                            <Form.Field name="password" tagName="input" size="large" placeholder="密码" showToggle prefix="unlock" type="password" />
                        </Form.Item>
                        <Form.Item>
                            <Checkbox checked={true} onChange={this.onHandleChange} value="1" name="key">
                                记住密码
                            </Checkbox>
                            <Button type="link" style={{float: 'right'}}>忘记密码</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                loading={this.state.loading}
                                htmlType="submit"
                                className="tv-submit"
                                size="large"
                                type="primary"
                            >
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}