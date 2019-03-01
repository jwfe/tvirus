import React, { Component } from 'react';
import Layout from '../../../common/compLayout';
import Highlight from 'react-highlight' 

import Button from '@button';
import { Tabs, Tabpanel } from '@tabs';

export default class ButtonDemo extends Component{
    constructor(props){
        super(props);
        this.state = {
            controlTitle: '显示',
            isCodeShow: false
        }
    }
    onShowCode(){
        const {isCodeShow} = this.state;
        if(isCodeShow){
            this.setState({
                isCodeShow: false,
                controlTitle: '显示'
            })
        } else{
            this.setState({
                isCodeShow: true,
                controlTitle: '隐藏'
            })
        }
    }
    switchSize(size){
        return (
            <div>
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
                    <Button type="primary" shape="circle" icon="work" size={size} plain={true}></Button>

                </div>
                <div className="language-jsx" style={{display: this.state.isCodeShow ? '' : 'none'}}>
                    <Highlight>
                        {`
                    improt React from 'react';
                    import { Button } from 'tvirus';
                    React.render(
                        <div>
                        <Button type="primary" size="${size}">Primary</Button>
                        <Button type="default" size="${size}">Default</Button>
                        <Button type="dashed" size="${size}">Dashed</Button>
                        <Button type="danger" size="${size}">Danger</Button>
                        <Button type="success" size="${size}">Success</Button>
                        <Button type="warning" size="${size}">Warning</Button>
                        <Button type="primary" plain={true} size="${size}">Primary</Button>
                        <Button type="danger" plain={true} size="${size}">Danger</Button>
                        <Button type="success" plain={true} size="${size}">Success</Button>
                        <Button type="warning" plain={true} size="${size}">Warning</Button>
                        <br />
                        <Button type="primary" shape="circle" icon="search" size="${size}"></Button>
                        <Button type="primary" shape="circle" icon="work" size="${size}" plain={true}></Button>
                        </div>
                        )
                        `}
                    </Highlight>
                </div>
                <div className="code-block-control" onClick={this.onShowCode.bind(this)}>{this.state.controlTitle}</div>
            </div>
        )
    }
    render() {
        return (
            <Layout {...this.props}>
                <article>
                    <h1>按钮</h1>
                    <p>按钮有四种类型：主按钮、次按钮、虚线按钮、情感按钮、图标按钮。主按钮在同一个操作区域最多出现一次。按钮状态分为正常、加载中、不可点等三种状态。</p>
                    <section className="main-body">
                        <h2>正常状态</h2>
                        <div className="code-wraper">
                            <Tabs activeKey="large">
                                {
                                    ['large', 'medium', 'small'].map((size) => {
                                        return (<Tabpanel tab={size} tabKey={size}>{this.switchSize(size)}</Tabpanel>)
                                    })
                                }
                            </Tabs>
                        </div>
                        <h2>加载状态</h2>
                        <div className="code-wraper">
                            <div className="code-demo">
                                <Button type="primary" loading={true}>Loading</Button>
                            </div>
                            <div className="language-jsx" style={{display: this.state.isCodeShow ? '' : 'none'}}>
                                <Highlight>
                                    {`
    improt React from 'react';
    import { Button } from 'tvirus';
    React.render(
        <div>
            <Button type="primary" loading={true}>Loading</Button>  
        </div>
    )
                                    `}
                                </Highlight>
                            </div>
                            <div className="code-block-control" onClick={this.onShowCode.bind(this)}>{this.state.controlTitle}</div>
                        </div>


                        <h2>禁用状态</h2>
                        <div className="code-wraper">
                            <div className="code-demo">
                                <Button type="primary" disabled={true}>Primary</Button>
                                <Button type="default" disabled={true}>Default</Button>
                                <Button type="dashed" disabled={true}>Dashed</Button>
                                <Button type="danger" disabled={true}>Danger</Button>
                                <Button type="success" disabled={true}>Success</Button>
                                <Button type="warning" disabled={true}>Warning</Button>
                            </div>
                            <div className="language-jsx" style={{display: this.state.isCodeShow ? '' : 'none'}}>
                                <Highlight>
                                    {`
    improt React from 'react';
    import { Button } from 'tvirus';
    React.render(
        <div>
            <Button type="primary" loading={true}>Loading</Button>  
        </div>
    )
                                    `}
                                </Highlight>
                            </div>
                            <div className="code-block-control" onClick={this.onShowCode.bind(this)}>{this.state.controlTitle}</div>
                        </div>

                        <h2>按钮组合</h2>
                        <div className="code-wraper">
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
                            <div className="language-jsx" style={{display: this.state.isCodeShow ? '' : 'none'}}>
                                <Highlight>
                                    {`
    improt React from 'react';
    import { Button } from 'tvirus';
    React.render(
        <div>
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
                                    `}
                                </Highlight>
                            </div>
                            <div className="code-block-control" onClick={this.onShowCode.bind(this)}>{this.state.controlTitle}</div>
                        </div>

                    </section>
                </article>
            </Layout>
        )
    }
}