import React from 'react';
import { Component, PropTypes, Portal, noop, Animation } from '@Libs';
import Button from '@button';

export default class Dialog extends Component {
    static propTypes = {
        mask: PropTypes.bool,
        visible: PropTypes.bool,
        width: PropTypes.number,
        title: PropTypes.string,

        className: PropTypes.string,
        style: PropTypes.object,

        onClose: PropTypes.func,
        onCancel: PropTypes.func,
        onOk: PropTypes.func
    };

    static defaultProps = {
        mask: true,
        width: 520,
        okText: '确定',
        cancelText: '取消',
        onClose: noop,
        onOk: noop,
        onCancel: noop,
    };

    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible
        }
    }
    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.visible !== prevState.visible){
            return {
                visible: nextProps.visible
            };
        }
    }

    handleClose(){
        const { onClose } = this.props;
        this.setState({
            visible: false
        })
        onClose();
    }
    handleOk(){
        const { onOk } = this.props;
        this.handleClose();
        onOk();
    }
    handleCancel(){
        const { onCancel } = this.props;
        this.handleClose();
        onCancel();
    }

    render(){
        const { visible } = this.state;
        const { title, footer, children, okText, cancelText } = this.props;
        return [
            <Portal>
                <div className={this.className('tv-dialog-mask', {
                    'tv-dialog-mask-hidden': !visible
                })}></div>
                <Animation animatedIn="fadeInDown" animatedOut="fadeOutUp" inProp={visible}>
                    <div className={this.className('tv-dialog')}>
                        
                            <div className="tv-dialog-content">
                                <Button className="tv-dialog-close" icon="close" onClick={this.handleClose.bind(this)} />
                                {title && <div className="tv-dialog-header"><div class="tv-dialog-title">{title}</div></div>}
                                <div className="tv-dialog-body">
                                    {children}
                                </div>
                                {footer && <div className="tv-dialog-footer">
                                    <Button onClick={this.handleCancel.bind(this)}>{cancelText}</Button>
                                    <Button type="primary" onClick={this.handleOk.bind(this)}>{okText}</Button>
                                </div>}
                            </div>
                    </div>
                </Animation>
            </Portal>
        ]
    }
    
}