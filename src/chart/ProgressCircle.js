import React from 'react';
import ReactDOM from 'react-dom';
import { Component, PropTypes } from '@Libs';

export default class ProgressCircle extends Component {
    static propTypes = {
        className: PropTypes.string,
        suffix: PropTypes.string,
        startColor: PropTypes.string,
        endColor: PropTypes.string,
        value: PropTypes.number,
        backgroundColor: PropTypes.string,
        radius: PropTypes.number,
        width: PropTypes.number,
        height: PropTypes.number,
        borderWidth: PropTypes.number,
    };

    static defaultProps = {
        width: 240, 
        height: 240,
        borderWidth: 4,
        backgroundColor: '#666',
        radius: 90,
        suffix: '%'
    };

    constructor(props) {
        super(props);
    }
    componentDidMount(){
        const { circleFront } = this.refs;
        const node = ReactDOM.findDOMNode(circleFront);
        const strokeDashoffset = this.calcDashOffset();
        requestAnimationFrame(()=>{
            node.style.strokeDashoffset = strokeDashoffset;
        })
    }
    calcDashOffset() {
        let { radius, value } = this.props;
        
        const circumference = (Math.PI * (2 * radius));
        return Math.floor(circumference - ((value / 100) * circumference));
    }

    render() {
        const { width, height, value, suffix, startColor, endColor, backgroundColor, borderWidth } = this.props;

        return (
            <div className={this.className('tv-progress-circle')} style={{width,height}}>
                <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" className="tv-progress-circle-svg">
                    <circle  className="tv-progress-circle-backgroud" r="90" cy={width/2} cx={height/2} stroke-width={borderWidth-1} stroke={backgroundColor} fill="none" />
                    <circle ref="circleFront" className="tv-progress-circle-front" r="90" cy={width/2} cx={height/2} stroke-width={borderWidth} stroke="url(#tvPurple)" stroke-linejoin="round" stroke-linecap="round" fill="none" />

                    <defs>
                        <linearGradient id="tvPurple" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color={endColor} />
                            <stop offset="100%" stop-color={startColor} />
                        </linearGradient>
                    </defs>

                </svg>
                <div className="tv-progress-circle-number">
                    <span className="tv-progress-circle-number-wraper">
                        <span className="tv-progress-circle-value">{ value }</span>
                        <span className="tv-progress-circle-suffix">{ suffix }</span>
                    </span>
                </div>
            </div>
        );
    }
}