import React from 'react';
import PropTypes from 'prop-types';
import {
    CSSTransition as Transition
} from 'react-transition-group';

function noop () {console.log(...arguments)};

export default class Animation extends React.Component{
    static propTypes = {
        /** 自定义样式 */
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
        let { 
            children,
            defaultProps,
            inProp,
            unmountOnExit,
            onEnter,
            onEntering,
            onEntered,
            onExit,
            onExiting,
            onExited,
            animatedStart,
            animatedEnd,
            animatedIn,
            animatedOut,
            exitDone,
            duration
        } = this.props;

        animatedStart = animatedStart ? [animatedStart] : [];        
        animatedEnd = animatedEnd ? [animatedEnd] : [];        
        animatedStart.unshift('animated');
        animatedEnd.unshift('animated');
        let childrenClone = children;
        if(defaultProps === inProp){
            childrenClone = React.cloneElement(children, {className: exitDone})
        }

        return (
            <Transition
                timeout={(duration || 1) * 1000}
                in={inProp}
                unmountOnExit={typeof unmountOnExit === 'undefined' ? true : false}
                classNames={{
                    enter: animatedStart.join(' '),
                    enterActive: animatedIn,
                    exit: animatedEnd.join(' '),
                    exitActive: animatedOut,
                    exitDone
                }}
                onEnter={() => { onEnter()}}
                onEntering={() => onEntering()}
                onEntered={() => onEntered()}
                onExit={() => onExit()}
                onExiting={() => onExiting()}
                onExited={() => { 
                    onExited()
                }}
                >
                {childrenClone}
            </Transition>
        )
    }
}
