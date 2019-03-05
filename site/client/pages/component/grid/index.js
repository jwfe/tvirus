
            import React, { Component } from 'react';
            import Layout from '../../../common/compLayout';
            
            import Grid from '@grid';
            import './index.less'
            
            export default class GridDemo extends Component{
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
                                <Grid></Grid>
                            </div>
                        )
                    });
            
                    this.setState({childs})
                }
            
                render() {
                    const {childs} = this.state;
            
                    return <Layout {...this.props} 
                        className="main-grid-box"
                        title="Grid"
                        desc="Grid的说明"
                        childs={childs}
                    />
                }
            }
            