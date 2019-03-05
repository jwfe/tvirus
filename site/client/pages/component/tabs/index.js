
            import React, { Component } from 'react';
            import Layout from '../../../common/compLayout';
            
            import Tabs from '@tabs';
            import './index.less'
            
            export default class TabsDemo extends Component{
                constructor(props){
                    super(props);
                    this.state = {
                        childs: []
                    }
                }
            
                componentWillMount(){
                    this.childs([
                        {
                            title: '方向性图标',
                            list: [
                                'search'
                            ]
                        }
                    ]);
                }
            
                childs(){
                    const childs = [];
                    childs.push({
                        title: '正常',
                        children: (
                            <div className="code-demo">
                                <Tabs></Tabs>
                            </div>
                        )
                    });
            
                    this.setState({childs})
                }
            
                render() {
                    const {childs} = this.state;
            
                    return <Layout {...this.props} 
                        className="main-tabs-box"
                        title="Tabs"
                        desc="Tabs的说明"
                        childs={childs}
                    />
                }
            }
            