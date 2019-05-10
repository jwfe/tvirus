import React, { Component } from 'react';
import Layout from '../../../common/compLayout';

import { Cascader, Row, Col } from 'tvirus';

import './index.less'

export default class CascaderDemo extends Component{
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

        const options1 = [
			{
				value: 'zhejiang',
				label: 'Zhejiang',
				children: [{
					value: 'hangzhou',
					label: 'Hangzhou',
					children: [{
						value: 'xihu',
						label: 'West Lake',
					}],
				}],
			}, 
			{
				value: 'jiangsu',
				label: 'Jiangsu',
				children: [{
					value: 'nanjing',
					label: 'Nanjing',
					children: [{
						value: 'zhonghuamen',
						label: 'Zhong Hua Men',
					}],
				}],
			}
		];

        childs.push({
            title: '正常',
            children: (
                <div className="code-demo">
                    <Row>
                      <Col span={12}><Cascader options={options1} /></Col>
                      <Col span={12}><Cascader options={options1} changeOnSelect /></Col>
                    </Row>
                    
                </div>
            )
        });


		const options2 = [
			{
				value: 'zhejiang',
				label: 'Zhejiang',
				children: [{
					value: 'hangzhou',
					label: 'Hangzhou',
					children: [{
						value: 'xihu',
						label: 'West Lake',
					}],
				}],
			}, 
			{
				value: 'jiangsu',
				label: 'Jiangsu',
				disabled: true,
				children: [{
					value: 'nanjing',
					label: 'Nanjing',
					children: [{
						value: 'zhonghuamen',
						label: 'Zhong Hua Men',
					}],
				}],
			}
		];

        childs.push({
          title: '自主定义节点/禁用',
          children: (
              <div className="code-demo">
                  <Row>
                    <Col span={12}>
						<Cascader options={options2}>
							<span>city</span>
						</Cascader>
					</Col>
                    <Col span={12}><Cascader options={options2} /></Col>
                  </Row>
                  
              </div>
          )
      });

        this.setState({childs})
    }

    render() {
        const {childs} = this.state;

        return <Layout {...this.props} 
            className="main-cascader-box"
            title="Cascader"
            desc="级联选择器"
            childs={childs}
        />
    }
}
            