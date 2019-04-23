import React from 'react';
import { Component, PropTypes } from '@Libs';
import I18nContext from './I18nContext';

export default class I18nReceiver extends Component{
    constructor(props){
        super(props);
    }
    static propTypes = {
        componentName: PropTypes.string,
        defaultI18n: PropTypes.func,
        children: PropTypes.element
    }

    static contextType = I18nContext;

    receive() {
        const { componentName, defaultI18n } = this.props;
        const zentI18n = this.context;
        const i18n = (zentI18n && zentI18n[componentName]) || {};

        return {
            ...(typeof defaultI18n === 'function' ? defaultI18n() : defaultI18n),
            ...(typeof i18n === 'function' ? i18n() : i18n),
            mark: (zentI18n && zentI18n.mark) || 'zh-CN'
        };
    }

    render() {
        const { children, componentName, defaultI18n, ...other } = this.props;

        return children(this.receive(), other);
    }
}