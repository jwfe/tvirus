import React from 'react';
import ReactDOM from 'react-dom'

export default class Portal extends React.Component{
    render(){
        const { children, container } = this.props;
        return ReactDOM.createPortal(
            children,
            container || document.getElementById('root') || document.body
        );
    }
}