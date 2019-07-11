import React, { Component } from 'react';

import Highlight from 'react-highlight' 
import reactElementToJSXString from 'react-element-to-jsx-string';

import { Tabs, Tabpanel, Card, Table } from 'tvirus';
import docJSON from './doc.json';
import './main.less';

const style = {
    main: {
        display: 'flex'
    },
    left: {
        flexGrow: 0,
        width: 299, 
        minWidth: 299,
        maxWidth: 299,
        height: 'auto',

        borderRight: '1px solid #ebebeb'
    },
    right: {
        flexGrow: 1,
        margin: '0 60px',
        width: 800
    }
}

export default class LayoutDemo extends Component{
    constructor(props){
        super(props);
        this.state = {
            docColumns: [
                {
                    key: 'param',
                    title: '参数',
                    width: 200
                },
                {
                    key: 'desc',
                    title: '描述',
                    width: 300
                },
                {
                    key: 'type',
                    title: '类型',
                    width: 200
                },
                {
                    key: 'defaultVal',
                    title: '默认值',
                    width: 150
                }
            ],
            docs: docJSON,
            childs: [],
            controlTitle: '显示',
            codebox: {}
        }
        console.log(this.state.docs)
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(JSON.stringify(nextProps.childs) !== JSON.stringify(prevState.childs)){
            return {
                childs: nextProps.childs
            };
        }
        return null;
    }

    onShowCode(index){
        const {codebox} = this.state;
        const {show} = codebox[index] || {};
        const temp = {
            [index]: {
                show: !show
            }
        }
        this.setState({
            codebox: temp
        })
    }
    getCodeDemo(child, index){
        const { keyword } = this.props;
        const { codebox } = this.state;
        const codeboxCurrent = codebox[index] || {};
        const isShow = !!codeboxCurrent.show;
        if(Array.isArray(child.children)){
            return (
                <Tabs activeKey={child.children[0]}>
                    {
                        child.children.map((item, index) => {
                            const itemCompoent = child.func(item);
                            return (
                                <Tabpanel key={index} tab={item} tabKey={item}>
                                    {itemCompoent}
                                    <div key={index} className="language-jsx" style={{display: isShow ? '' : 'none'}}>
                                        <Highlight>
                                            {reactElementToJSXString(itemCompoent, {tabStop: 4})}
                                        </Highlight>
                                    </div>
                                    <div  key={index + '_2'} className="code-block-control" onClick={this.onShowCode.bind(this, index)}>{isShow ? '隐藏' : '展示'}</div>
                                </Tabpanel>
                            )
                        })
                    }
                </Tabs>
            )
        }
        return (<div>
            {child.children}
            <div className="language-jsx" style={{display: isShow ? '' : 'none'}}>
                <Highlight>
                    {child.jsx || reactElementToJSXString(child.children, {
                        displayName(...arg){
                            const data = arg[0];
                            let text = data.type;

                            if(typeof text === 'function'){
                                text = text.displayName;
                            }
                            if(text === 'Option' && keyword === 'select'){
                                text = 'Select.Option';
                            }
                            return text
                        },
                        tabStop: 4
                    })}
                </Highlight>
            </div>
            <div className="code-block-control" onClick={this.onShowCode.bind(this, index)}>{isShow ? '隐藏' : '展示'}</div>
        </div>)
    }

    creatDoc(child){
        return (
            <div>
                {child.children}
            </div>
        )
    }
    createApi(){
        const { keyword, expand } = this.props;
        if(!this.state.docs[keyword]){
            return null;
        }
        const map = this.state.docs[keyword].map((d, index) => {
            const name = d.filename === 'index' ? keyword : d.filename;
            if(!d.data.length) return null;
            return (
                <div key={index}>
                    <h4>{name}</h4>
                    <p>{d.desc}</p>
                    <Table
                        key={index}
                        columns={this.state.docColumns}
                        data={d.data}
                    />
                </div>
            )
        })

        return (
            <div>
                <h3>API</h3>
                { map }
                { 
                    expand && (
                        <div>
                            <h4>参数示例</h4>
                            <Highlight>
                                { expand }
                            </Highlight> 
                        </div>
                    )
                }
            </div>
        )
    }
    render() {
        const { title, desc, className } = this.props;
        const { childs } = this.state;
        return (
            <section style={style.right} className="main-component">
                <article className={className}>
                    <h1>{title}</h1>
                    <p>{desc}</p>
                    <section className="main-body">
                        {
                            childs.map((child, index) => {
                                return (
                                    <div key={index}>
                                        <h2 key={index}>{child.title}</h2>
                                        {
                                            child.doc ? this.creatDoc(child, index) : <Card>{this.getCodeDemo(child, index)}</Card>
                                        }
                                    </div>
                                )
                            })
                        }
                    </section>
                    { this.createApi() }
                    
                </article>
            </section>    
        )
        
    }
}