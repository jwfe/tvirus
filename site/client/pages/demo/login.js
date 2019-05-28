import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import { 
    Icon,  Button,
    Input, Checkbox, Form
} from 'tvirus';
import './css/login.less';

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
    handleOnSubmit = (valid) => {
        if(valid){
            this.props.history.push('/demo');
        }
    }
    render(){
        return (
            <div className="tv-user-layout">
                <div className="tv-user-layout-top">
                    <div className="tv-user-layout-header">
                        <a href="/">
                            <Icon type="bwlogo" />
                        </a>
                    </div>
                    <div className="tv-user-layout-desc">
                        酒店智慧解决之道
                    </div>
                </div>
                <div className="tv-components-login-index-login">
                    <Form onSubmit={this.handleOnSubmit} rules={rules}>
                        <Form.Item name="username">
                            <Form.Field name="username" tagName="input" size="large" placeholder="用户名" prefix="user" />
                        </Form.Item>
                        <Form.Item name="password">
                            <Form.Field name="password" tagName="input" size="large" placeholder="密码" showToggle prefix="unlock" type="password" />
                        </Form.Item>
                        <Form.Item>
                            <Checkbox checked={true}>
                                记住密码
                            </Checkbox>
                            <Button type="link" style={{float: 'right'}}>忘记密码</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button
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