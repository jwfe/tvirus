import React from 'react';
import { Component, PropTypes } from '@Libs';

export default class Select extends Component {
    static propTypes = {
        className: PropTypes.string,
        value: PropTypes.string,
        selected: PropTypes.bool,
        disabled: PropTypes.bool,
        onClick: PropTypes.func,
    };

    static defaultProps = {
        disabled: false
    };

    constructor(props) {
        super(props);
        this.state = {
            selected: props.selected
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.selected !== prevState.selected){
            return {
                selected: nextProps.selected
            }
        }
    }

    handleClick(){
        const { value, children, onClick, disabled} = this.props;
        if(disabled){
            return;
        }
        this.setState({
            selected: true
        }, () => {
            onClick && onClick(value, children);
        })
    }
    render() {
        const { children, disabled } = this.props;
        const { selected } = this.state;
        return (
            <li 
            className={this.className('tv-select-option', {
                'tv-select-option-disabled': disabled,
                'tv-select-option-selected': selected
            })}
            onClick={this.handleClick.bind(this)}
            >
                {children}
            </li>
        );
    }
}