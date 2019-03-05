import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
    Transition
  } from 'react-transition-group';

export default class Animation extends React.Component{
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
    };
    render(){
        const { children, name, apper, apperTimeout, enter, enterTimeout, leave, leaveTimeout, ...other } = this.props;
        return (
            <Transition
                transitionName={name}
                transitionAppear={apper || true}
                transitionAppearTimeout={ apperTimeout || 500 }
                transitionEnter={ enter || false }
                transitionEnterTimeout={ enterTimeout || false }
                transitionLeave={ leave || false }
                transitionLeaveTimeout={ leaveTimeout || 500 }
                {...other}
                >
                {children}
            </Transition>
        )
    }
}
