import React from 'react';
import { Component, PropTypes, Portal, noop } from '@Libs';
import Popup from '@popup';

export default class SliderBar extends Component {
    static propTypes = {
        className: PropTypes.string,
        disabled: PropTypes.bool,
        min: PropTypes.number,
        max: PropTypes.number,
        value: PropTypes.number,
        format: PropTypes.func,
        onChange: PropTypes.func
    };

    static defaultProps = {
        disabled: false,
        step: 1,
        value: 0,
        min: 0,
        max: 100,
        onChange: noop
    };

    constructor(props) {
        super(props);
        this.slider = React.createRef();
        this.state = {
            showPopup: false,
            value: props.value,
            dragging: false,
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            startPosition: 0,
            newPosition: 0
        }
    }

    onEnter(){
        clearTimeout(this.timer);
        this.setState({
            showPopup: true
        })
    }

    onLeave(){
        this.timer = setTimeout(() => {
            this.setState({
                showPopup: false
            })
        }, 200);
    }
    
    onButtonDown (event) {
        if (this.props.disabled) return;
        this.onDragStart(event);

        window.addEventListener('mousemove', this.onDragging.bind(this));
        window.addEventListener('mouseup', this.onDragEnd.bind(this));
    }

    currentPosition() {
        const { min, max, value } = this.props;
        return `${ (value - min) / (max - min) * 100 }%`;
    }

    onDragStart(event) {
        this.setState({
            dragging: true,
            startX: event.clientX,
            startY: event.clientY,
            startPosition: parseInt(this.currentPosition(), 10)
        });
    }

    onDragging(event) {
        if (this.state.dragging) {
            this.state.currentX = event.clientX;
            this.state.currentY = event.clientY;

            let diff;

            if (this.props.vertical) {
                diff = (this.state.startY - this.state.currentY) / this.sliderSize() * 100;
            } else {
                diff = (this.state.currentX - this.state.startX) / this.sliderSize() * 100;
            }

            this.state.newPosition = this.state.startPosition + diff;

            this.setPosition(this.state.newPosition);
        }
    }

    onDragEnd() {
        if (this.state.dragging) {
            setTimeout(() => {
                this.setState({
                    dragging: false
                }, () => {
                    this.setPosition(this.state.newPosition);
                });
            }, 0);
            window.removeEventListener('mousemove', this.onDragging.bind(this));
            window.removeEventListener('mouseup', this.onDragEnd.bind(this));
        }
    }

    setPosition(newPosition) {
        const { max, min, step, onChange, name } = this.props;

        if (newPosition < 0) {
            newPosition = 0;
        } else if (newPosition > 100) {
            newPosition = 100;
        }

        const lengthPerStep = 100 / ((max - min / step));
        const steps = Math.round(newPosition / lengthPerStep);
        const value = steps * lengthPerStep * (max - min) * 0.01 + min;

        this.setState({
            value: value
        }, () => {
            onChange(value, name);
        })
    }

    sliderSize(){
        const slider = this.slider;
        return parseInt(this.props.vertical ? slider.offsetHeight : slider.offsetWidth, 10);
    }

    handleSliderClick(event){
        if (this.props.disabled || this.state.dragging) return;
        const { left, bottom } = this.slider.getBoundingClientRect()

        if (this.props.vertical) {
            this.setPosition((bottom - event.clientY) / this.sliderSize() * 100);
        } else {
            this.setPosition((event.clientX - left) / this.sliderSize() * 100);
        }
    }

    render() {
        let { format, vertical, disabled } = this.props;
        let { value, showPopup } = this.state;
        const styleValue = `${value}%`;

        value = format ? format(value) : styleValue;
        let style = {
            bar: {width: styleValue},
            btn: {left: styleValue}
        }

        if(vertical){
            style = {
                bar: {height: styleValue},
                btn: {bottom: styleValue}
            }
        }

        return (
            <div 
                ref={el => this.slider = el}
                className={this.className('tv-sliderbar', {
                    'tv-sliderbar-disabled': disabled,
                    'tv-sliderbar-vertical': vertical,
                })}
                onClick={this.handleSliderClick.bind(this)}
            >
                <div className="tv-sliderbar-bar" style={style.bar}></div>
                <div className="tv-sliderbar-button" style={style.btn} 
                    onMouseDown={this.onButtonDown.bind(this)}
                    onMouseEnter={this.onEnter.bind(this)}
                    onMouseLeave={this.onLeave.bind(this)}
                 />
                <div className={this.className('tv-popup tv-popup-top', {
                    'tv-popup-show': showPopup
                })} style={style.btn}>
                    <div className="tv-popup-arrow"></div>
                    <div className="tv-popup-inner">
                        <div className="tv-popup-content">{value}</div>
                    </div>
                </div>
            </div>
        );
    }
}