import Notification from './Notification'

let newNotification;

const getNewNotification = () => {
    if (!newNotification) {
        newNotification = Notification.reWrite();
    }

    return newNotification;
};

const notice = (type, content, mask = false, iconClass, onClose, duration) => {
    let notificationInstance = getNewNotification();

    notificationInstance.notice({
        duration,
        contentType: type,
        mask,
        iconClass,
        content,
        onClose: () => {
            if (onClose) onClose();
        },
    });
};

export default {
    show: (content, mask, iconClass, onClose, duration) => (notice(undefined, content, mask, iconClass, onClose, duration)),
    info: (content, mask, iconClass, onClose, duration) => (notice('info', content, mask, iconClass, onClose, duration)),
    success: (content, mask, iconClass, onClose, duration) => (notice('success', content, mask, iconClass, onClose, duration)),
    warning: (content, mask, iconClass, onClose, duration) => (notice('warning', content, mask, iconClass, onClose, duration)),
    error: (content, mask, iconClass, onClose, duration) => (notice('error', content, mask, iconClass, onClose, duration)),
    loading: (content) => (notice(undefined, content || '加载中...', true, 'loading', undefined, 0)),
    hide() {
        if (newNotification) {
            newNotification.destroy();
            newNotification = null;
        }
    },
}