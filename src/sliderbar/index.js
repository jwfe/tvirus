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
        this.state = {
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

    onButtonDown(event) {
        if (this.props.disabled) return;
        this.onDragStart(event);

        window.addEventListener('mousemove', this.onDragging.bind(this));
        window.addEventListener('mouseup', this.onDragEnd.bind(this));
        // window.addEventListener('contextmenu', this.onDragEnd.bind(this));
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

            console.log('[onDragging]', this.state.currentX, this.state.currentY, this.state.startX, this.state.startY);
            console.log('[onDragging]', this.state.newPosition, this.state.startPosition, diff);

            this.setPosition(this.state.newPosition);
        }
    }

    onDragEnd() {
        if (this.state.dragging) {
            /*
            * 防止在 mouseup 后立即触发 click，导致滑块有几率产生一小段位移
            * 不使用 preventDefault 是因为 mouseup 和 click 没有注册在同一个 DOM 上
            */
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
        const { max, min, step } = this.props;

        if (newPosition < 0) {
            newPosition = 0;
        } else if (newPosition > 100) {
            newPosition = 100;
        }

        const lengthPerStep = 100 / ((max - min / step));
        const steps = Math.round(newPosition / lengthPerStep);
        const value = steps * lengthPerStep * (max - min) * 0.01 + min;

        console.log('[setPosition]', lengthPerStep, steps, value);

        this.setState({
            value: value
        })
    }

    sliderSize(){
        const { slider } = this.refs;
        return parseInt(this.props.vertical ? slider.offsetHeight : slider.offsetWidth, 10);
    }

    handleSliderClick(event){
        if (this.props.disabled || this.state.dragging) return;
        const { left, bottom } = this.refs.slider.getBoundingClientRect()

        if (this.props.vertical) {
            this.setPosition((bottom - event.clientY) / this.sliderSize() * 100);
        } else {
            this.setPosition((event.clientX - left) / this.sliderSize() * 100);
        }
    }

    handleChange(evt){}

    render() {
        let { format, vertical, disabled } = this.props;
        let { value } = this.state;
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
                ref="slider"
                className={this.className('tv-sliderbar', {
                    'tv-sliderbar-disabled': disabled,
                    'tv-sliderbar-vertical': vertical,
                })}
                onClick={this.handleSliderClick.bind(this)}
            >
                <div className="tv-sliderbar-bar" style={style.bar}></div>
                <Popup 
                    trigger="hover" 
                    position='top' 
                    content={value}
                    childrenProps={{
                        'onMouseDown': this.onButtonDown.bind(this),
                        style: style.btn
                    }}
                >
                    <div className="tv-sliderbar-button"></div>
                </Popup>
            </div>
        );
    }
}