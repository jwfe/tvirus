import React from 'react';
import { Component, PropTypes, Portal, noop, Animation } from '@Libs';
import Button from '@button';
import Icon from '@icon';

export default class Dialog extends Component {
    static propTypes = {
        mask: PropTypes.bool,
        visible: PropTypes.bool,
        width: PropTypes.number,
        title: PropTypes.string,

        className: PropTypes.string,
        type: PropTypes.string,
        // 内容类型
        contentType: PropTypes.oneOf(['info', 'success', 'danger', 'warning']),
        style: PropTypes.object,

        ok: PropTypes.bool, 
        cancel: PropTypes.bool,
        onClose: PropTypes.func,
        onCancel: PropTypes.func,
        onOk: PropTypes.func
    };

    static defaultProps = {
        mask: true,
        ok: true, cancel: true,
        contentType: 'info',
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

    renderModal(){
        const { title, footer, children, ok, cancel, okText, cancelText } = this.props;
        return (
            <div className={this.className('tv-dialog')}>
                <div className="tv-dialog-content">
                    <Button className="tv-dialog-close" icon="close" onClick={this.handleClose.bind(this)} />
                    {title && <div className="tv-dialog-header"><div className="tv-dialog-title">{title}</div></div>}
                    <div className="tv-dialog-body">
                        {children}
                    </div>
                    {footer && <div className="tv-dialog-footer">
                        {cancel && <Button onClick={this.handleCancel.bind(this)}>{cancelText}</Button>}
                        {ok && <Button type="primary" onClick={this.handleOk.bind(this)}>{okText}</Button>}
                    </div>}
                </div>
            </div>
        )
    }

    renderAlertModal(){
        const { title, footer, children, ok, cancel, okText, cancelText, icon, contentType } = this.props;
        return (
            <div className={this.className('tv-dialog', {
                'tv-dialog-confirm': true,
                [`tv-dialog-confirm-${contentType}`]: contentType
            })}>
                <div className="tv-dialog-content">
                    <div className="tv-dialog-confirm-body">
                        <Icon type={icon} />
                        <span className="tv-dialog-confirm-title">{title}</span>
                        <div className="tv-dialog-confirm-content">
                            {children}
                        </div>
                    </div>
                    {footer && <div className="tv-dialog-footer">
                        {cancel && <Button onClick={this.handleCancel.bind(this)}>{cancelText}</Button>}
                        {ok && <Button type="primary" onClick={this.handleOk.bind(this)}>{okText}</Button>}
                    </div>}
                </div>
            </div>
        )
    }

    renderItem(){
        const { type } = this.props;
        if(!type){
            return this.renderModal();
        }
        if(type === 'alert'){
            return this.renderAlertModal();
        }
        return null;
    }

    render(){
        const { visible } = this.state;
        return (
            <Portal>
                <div className={this.className('tv-dialog-mask', {
                    'tv-dialog-mask-hidden': !visible
                })}></div>
                <Animation duration={0.5} animatedIn="fadeInDown" animatedOut="fadeOutUp" inProp={visible}>
                    { this.renderItem() }
                </Animation>
            </Portal>
        )
    }
    
}