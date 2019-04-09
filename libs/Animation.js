import React from 'react';
import PropTypes from 'prop-types';
import {
    CSSTransition as Transition
} from 'react-transition-group';

function noop () {console.log(...arguments)};

export default class Animation extends React.Component{
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        onEnter: PropTypes.func,
        onEntering: PropTypes.func,
        onEntered: PropTypes.func,
        onExit: PropTypes.func,
        onExiting: PropTypes.func,
        onExited: PropTypes.func,
    };
    static defaultProps = {
        onEnter: noop,
        onEntering: noop,
        onEntered: noop,
        onExit: noop,
        onExiting: noop,
        onExited: noop,
    };
    constructor(props){
        super(props);
        this.state = {
            show: false
        }
    }
    render(){
        const { 
            children,
            inProp,
            onEnter,
            onEntering,
            onEntered,
            onExit,
            onExiting,
            onExited,
            animatedIn,
            animatedOut,
            duration
        } = this.props;
        return (
            <Transition
                timeout={duration || 1000}
                in={inProp}
                unmountOnExit
                classNames={{
                    enter: "animated",
                    enterActive: animatedIn,
                    exit: "animated",
                    exitActive: animatedOut
                }}
                onEnter={() => { onEnter()}}
                onEntering={() => onEntering()}
                onEntered={() => onEntered()}
                onExit={() => onExit()}
                onExiting={() => onExiting()}
                onExited={() => { onExited()}}
                >
                {children}
            </Transition>
        )
    }
}
