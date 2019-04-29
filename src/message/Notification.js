import React from 'react';
import ReactDOM from 'react-dom';
import { Component, PropTypes, noop } from '@Libs';

import Message from './Message'

class Notification extends Component {
    static propTypes = {
        prefixCls: PropTypes.string,
    }
    static defaultProps = {
        prefixCls: 'tv-message',
    }
    constructor (props) {
        super(props);
        this.state = {
            notices: [], 
            hasMask: true,
        }
    }
    add (notice) {
        const {notices} = this.state;
        const key = notice.key ? notice.key : notice.key = getUUID();
        const mask = notice.mask ? notice.mask : false;
        const temp = notices.filter((item) => item.key === key).length;

        if(!temp){
            notices.push(notice);
            this.setState({
                notices: notices,
                hasMask: mask
            });
        }
    }
    remove (key) {
        this.setState(previousState => ({
                notices: previousState.notices.filter(notice => notice.key !== key)
            })
        );
    }
    getNoticeDOM () {
        const {notices} = this.state;
        const result = [];

        notices.map((notice)=>{
            const closeCallback = () => {
                this.remove(notice.key);
                if(notice.onClose) notice.onClose();
            };

            result.push(
                <Message
                    key={notice.key} 
                    {...notice}
                    onClose={closeCallback}
                />
            );
        });

        return result;
    }
    getMaskDOM () {
        const {notices, hasMask} = this.state;
        if(notices.length > 0 && hasMask === true) return <div className="tv-message-mask" />;
    }
    render () {
        const {prefixCls} = this.props;
        const noticesDOM = this.getNoticeDOM();
        const maskDOM = this.getMaskDOM();

        return (
            <div className={prefixCls}>
                {maskDOM}
                <div className={`${prefixCls}-wraper`}>
                    {noticesDOM}
                </div>
            </div>
        )
    }
}

let noticeNumber = 0;

const getUUID = () => {
    return 'tv-message-' + new Date().getTime() + '-' + noticeNumber++;
};

Notification.reWrite = function (properties) {
    const { ...props } = properties || {};

    const div = document.createElement('div');
    document.body.appendChild(div);

    const notification = ReactDOM.render(<Notification {...props} />, div);

    return {
        notice(noticeProps) {
            notification.add(noticeProps);
        },
        removeNotice(key) {
            notification.remove(key);
        },
        destroy() {
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
        },
        component: notification
    }
};

export default Notification