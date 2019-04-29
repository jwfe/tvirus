import React from 'react'
import ReactDOM from 'react-dom'

import { Component, PropTypes, Portal, noop, Animation } from '@Libs';
import Dialog from './Dialog';

class Alert extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false
        }
    }
    onShow(){
        const { onClose } = this.props;

        this.setState({
            visible: true,
        }, () => {
            onClose();
        });
    }

    onClose(){
        const { onClose } = this.props;
        this.setState({
            visible: false,
        }, () => {
            onClose();
        });
    }
    render(){
        const { children, visible, onUpdateEnd, ...other } = this.props;
        return <Dialog type="alert" onClose={this.onClose.bind(this)} visible={this.state.visible} {...other}>{children}</Dialog>
    }
}


const reWrite = function (contentType, content, properties) {
    const { ...props } = properties || {};
    props.contentType = contentType;
    let div;

    div = document.createElement('div');
    document.body.appendChild(div);

    return ReactDOM.render(<Alert {...props}>{ content }</Alert>, div);
};

export default {
    info: (content, options) => {
        return reWrite('info', content, options);
    },
    success: (content, options) => {
        return reWrite('success', content, options);
    },
    warning: (content, options) => {
        return reWrite('warning', content, options)
    },
    error: (content, options) => {
        return reWrite('danger', content, options)
    }
}
