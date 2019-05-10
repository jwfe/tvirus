import React, { Component } from 'react';

import Highlight from 'react-highlight' 
import reactElementToJSXString from 'react-element-to-jsx-string';

import { Tabs, Tabpanel } from 'tvirus';

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
    }
}


class Body extends Component{
    constructor(props){
        super(props);
        this.state = {
            childs: [],
            controlTitle: '显示',
            codebox: {}
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(JSON.stringify(nextProps.childs) !== JSON.stringify(prevState.childs)){
            return {
                childs: nextProps.childs
            };
        }
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
        const { codebox } = this.state;
        const codeboxCurrent = codebox[index] || {};
        const isShow = !!codeboxCurrent.show;
        if(Array.isArray(child.children)){
            return (
                <Tabs activeKey={child.children[0]}>
                    {
                        child.children.map((item) => {
                            const itemCompoent = child.func(item);
                            return (<Tabpanel tab={item} tabKey={item}>
                                {itemCompoent}
                                <div className="language-jsx" style={{display: isShow ? '' : 'none'}}>
                                    <Highlight>
                                        {reactElementToJSXString(itemCompoent, {tabStop: 4})}
                                    </Highlight>
                                </div>
                                <div className="code-block-control" onClick={this.onShowCode.bind(this, index)}>{isShow ? '隐藏' : '展示'}</div>
                            </Tabpanel>)
                        })
                    }
                </Tabs>
            )
        }
        return (<div>
            {child.children}
            <div className="language-jsx" style={{display: isShow ? '' : 'none'}}>
                <Highlight>
                    {child.jsx || reactElementToJSXString(child.children, {tabStop: 4})}
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
                                    <div>
                                        <h2>{child.title}</h2>
                                        {
                                            child.doc ? this.creatDoc(child, index) : <div className="code-wraper">{this.getCodeDemo(child, index)}</div>
                                        }
                                    </div>
                                )
                            })
                        }
                    </section>
                </article>
            </section>    
        )
        
    }
}

export default Body;