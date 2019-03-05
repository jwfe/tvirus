
            import React, { Component } from 'react';
            import Layout from '../../../common/compLayout';
            
            import Input from '@input';
            import './index.less'
            
            export default class InputDemo extends Component{
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
                                <Input></Input>
                            </div>
                        )
                    });
            
                    this.setState({childs})
                }
            
                render() {
                    const {childs} = this.state;
            
                    return <Layout {...this.props} 
                        className="main-input-box"
                        title="Input"
                        desc="Input的说明"
                        childs={childs}
                    />
                }
            }
            