import React, { Component } from 'react';
import Layout from '../../../common/compLayout';

import { Popup, Button, Row, Col } from 'tvirus';
import './index.less'

export default class PopupDemo extends Component{
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
                    <Row gutter={16}>
                        <Col span={12}>
                            <Popup 
                            trigger="click"
                            title="竟然还有title"
                            content="这段提示很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长，真的太长了"
                            >
                                <Button>click me !</Button>
                            </Popup>
                        </Col>
                        <Col span={12}>
                            <Popup 
                            trigger="hover"
                            title="竟然还有title"
                            content="鼠标滑过"
                            >
                                <Button>hover me !</Button>
                            </Popup>
                        </Col>
                    </Row>
                    
                </div>
            )
        });

        childs.push({
            title: '十二个方向',
            children: (
                <div className="code-demo code-demo-position">
                    <div class="demo">
                        <div style={{marginLeft: 70, whiteSpace: 'nowrap'}}>
                            <Popup 
                            position="top left"
                            trigger="click"
                            title="TL"
                            content="top left"
                            >
                            <Button>TL</Button>
                            </Popup>

                            <Popup 
                            position="top"
                            trigger="click"
                            title="TOP"
                            content="top"
                            >
                            <Button>Top</Button>
                            </Popup>

                            <Popup 
                            position="top right"
                            trigger="click"
                            title="TR"
                            content="top right"
                            >
                            <Button>TR</Button>
                            </Popup>
                        </div>
                        <div style={{width: 70, float: 'left'}}>
                            <Popup 
                            position="left top"
                            trigger="click"
                            title="LT"
                            content="left top"
                            >
                            <Button>LT</Button>
                            </Popup>
                            <Popup 
                            position="left"
                            trigger="click"
                            title="LEFT"
                            content="left"
                            >
                            <Button>Left</Button>
                            </Popup>
                            <Popup 
                            position="left bottom"
                            trigger="click"
                            title="LB"
                            content="left bottom"
                            >
                            <Button>LB</Button>
                            </Popup>
                        </div>
                        <div style={{width: 70, marginLeft: 304}}>
                            <Popup 
                            position="right top"
                            trigger="click"
                            title="RT"
                            content="right top"
                            >
                            <Button>RT</Button>
                            </Popup>
                            <Popup 
                            position="right"
                            trigger="click"
                            title="Right"
                            content="right"
                            >
                            <Button>Right</Button>
                            </Popup>
                            <Popup 
                            position="right bottom"
                            trigger="click"
                            title="RB"
                            content="right bottom"
                            >
                            <Button>RB</Button>
                            </Popup>
                        </div>
                        <div style={{marginLeft: 70, clear: 'both', whiteSpace: 'nowrap'}}>
                            <Popup 
                            position="bottom left"
                            trigger="click"
                            title="BL"
                            content="bottom left"
                            >
                            <Button>BL</Button>
                            </Popup>
                            <Popup 
                            position="bottom"
                            trigger="click"
                            title="Bottom"
                            content="bottom"
                            >
                            <Button>Bottom</Button>
                            </Popup>
                            <Popup 
                            position="bottom right"
                            trigger="click"
                            title="BR"
                            content="bottom right"
                            >
                            <Button>BR</Button>
                            </Popup>
                        </div>
                    </div>
                </div>
            )
        })

        this.setState({childs})
    }

    render() {
        const {childs} = this.state;

        return <Layout {...this.props} 
            className="main-popup-box"
            title="Popup"
            desc="Popup的说明"
            childs={childs}
        />
    }
}
            