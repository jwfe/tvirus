import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Component extends React.Component{
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
    };
    classNames(...args) {
        return classnames(args);
    }

    className(...args) {
        let newClassNames = args.concat([this.props.className]);
        return this.classNames.apply(this, newClassNames);
    }

    style(args) {
        return Object.assign({}, args, this.props.style)
    }
}
