import React, { Component } from 'react';
import { Link } from 'react-router-dom'

// 父组件
class App extends Component{
    constructor(){
        super();
    }
    render(){
        return (
            <section>
                <header></header>
                {this.props.children}
            </section>
        )
    }
}

export default App;
