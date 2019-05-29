import React, { Component } from 'react';

import { Menu } from 'tvirus';
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
export default class Layout extends Component{
    constructor(props){
        super(props);
        this.state = {
            children: null
        }
    }
    
    onClick(index, to, openMaps){
        if(!to){
            return;
        }

        openMaps[index] = true;
        this.props.history.push({ pathname: to, state: { openMaps } });
    }
    opened(query){
        const currQuery = this.props.location.pathname.split('/')[2];
        console.log(currQuery , query)
        return currQuery === query;
    }
    
    render() {
        const { children, className, title, desc } = this.props;
        return (
            <section style={style.right} className="main-spec">
                <article className={className}>
                    <h1>{title}</h1>
                    <p>{desc}</p>
                    <section className="main-body">
                        {children}
                    </section>
                </article>
            </section>   
        )
    }
}