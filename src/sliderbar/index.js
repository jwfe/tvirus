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

    onEnter = () => {
        clearTimeout(this.timer);
        this.setState({
            showPopup: true
        })
    }

    onLeave = () => {
        this.timer = setTimeout(() => {
            this.setState({
                showPopup: false
            })
        }, 200);
    }
    
    onButtonDown = (event) => {
        if (this.props.disabled) return;
        this.onDragStart(event);

        window.addEventListener('mousemove', this.onDragging, false);
        window.addEventListener('mouseup', this.onDragEnd, false);
    }

    currentPosition() {
        const { min, max } = this.props;
        const { value } = this.state;
        return `${ (value - min) / (max - min) * 100 }%`;
    }

    onDragStart(event) {
        const { startPosition } = this.state;
        this.setState({
            dragging: true,
            startX: event.clientX,
            startY: event.clientY,
            startPosition: parseInt(this.currentPosition(), 10)
        });
    }

    onDragging = (event) => {
        let { dragging, currentX, currentY, startY, startX, startPosition, newPosition } = this.state;
        if (dragging) {
            currentX = event.clientX;
            currentY = event.clientY;
            let diff;

            if (this.props.vertical) {
                diff = (startY - currentY) / this.sliderSize() * 100;
            } else {
                diff = (currentX - startX) / this.sliderSize() * 100;
            }

            newPosition = startPosition + diff;
            this.setState({
                currentX, currentY, newPosition
            }, () => {
                this.setPosition(newPosition);
            })
        }
    }

    onDragEnd = () => {
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

    handleSliderClick = (event) => {
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
                onClick={this.handleSliderClick}
            >
                <div className="tv-sliderbar-bar" style={style.bar}></div>
                <div className="tv-sliderbar-button" style={style.btn} 
                    onMouseDown={this.onButtonDown}
                    onMouseEnter={this.onEnter}
                    onMouseLeave={this.onLeave}
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