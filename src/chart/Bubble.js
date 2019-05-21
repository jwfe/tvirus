import React from 'react';
import { Component, PropTypes } from '@Libs';

export default class Bubble extends Component {
    static propTypes = {
        className: PropTypes.string,
        data: PropTypes.array,
        width: PropTypes.number, 
        height: PropTypes.number
    };

    static defaultProps = {
        data: []
    };

    constructor(props) {
        super(props);
        this.bubble = null;
        this.total = 0;
        this.balls = [];
    }
    createCanvas(){
        const bubbleNode = this.bubble;
        const canvas = document.createElement('canvas');
        this.width = bubbleNode.clientWidth;
        this.height = bubbleNode.clientHeight;

        canvas.width = this.width;
        canvas.height = this.height;
        return canvas;
    }
    randomPrefix(value) {
        const width = this.width;
        const height = this.height;

        let range = width - height;
        let min = height;
        let max = width;
        if(range < 0){
            range = height - width;
            min = width
            max = height;
        }
        let p = value/this.total;
        let r = parseInt(min * p);
        let x = parseInt(Math.random() * (width - (r * 2))) + r;
        let y = parseInt(Math.random() * (height - (r * 2))) + r;
        return {
            x,
            y,
            r
        }
    }

    testOverlay (pointA, pointB) {
        const x = Math.abs(pointA.x - pointB.x)
        const y = Math.abs(pointA.y - pointB.y)
        const distance = Math.sqrt((x * x) + (y * y))
        if (distance >= (pointA.r + pointB.r)) {
            return false
        } else {
            return true
        }
    }
    testAvailable (pointArr, newPoint) {
        let arr = Array.from(pointArr)
        let aval = true;
        let lastPoint = newPoint;
        while(arr.length > 0) {
            lastPoint = arr.pop()
            if (this.testOverlay(lastPoint, newPoint)) {
                aval = false
                break;
            }
        }
        return {aval, point: lastPoint}
    }

    findCircle(circle) {
        const balls = this.balls;
        const { aval, point } = this.testAvailable(balls, circle);

        if(!aval){
            return;
        }

        return point
    }

    randomPostion(data){
        data.forEach((item)=> {
            let ball = this.randomPrefix(item.value);
            let count = 0;
            const isOverlap = this.findCircle({
                x: ball.x,
                y: ball.y,
                r: ball.r
            })
            while(isOverlap && count < 200){
                ball = this.randomPrefix(item.value);
                count++;
            }
            ball.data = item;
            ball.color = item.color;
            ball.textColor = item.textColor;
            this.balls.push(ball);
        })
    }

    
    randomColor() {
        return `rgba(${Math.floor(Math.random() * 256)},
        ${Math.floor(Math.random() * 256)},
        ${Math.floor(Math.random() * 256)})`;
    }

    drawCircles (ctx, circleArr) {
        let point = circleArr.pop()
        ctx.beginPath();
        ctx.moveTo(point.x + point.r, point.y)
        ctx.arc(point.x, point.y, point.r, 0, Math.PI * 2, true);
        ctx.fillStyle = point.bgcolor || this.randomColor();
        ctx.fill();
        ctx.fillStyle = point.color || '#fff';
        ctx.fillText(point.data.name, point.x - point.r / 2, point.y);
        ctx.stroke();

        if (circleArr.length > 0) {
            this.drawCircles(ctx, circleArr, point.r)
        }
    }

    componentDidMount(){
        const width = this.width;
        const height = this.height;
        const { data } = this.props;
        const bubbleNode = this.bubble;
        const canvas = this.canvas = this.createCanvas();
        bubbleNode.appendChild(canvas);
        const ctx = this.ctx = canvas.getContext('2d');

        this.total = data.reduce((t, i) => {
            return t + i.value
        }, 0);

        this.randomPostion(data);
        ctx.clearRect(0, 0, width, height);
        this.drawCircles(ctx, this.balls);
    }
    
    render() {
        const { width, height } = this.props;

        return (
            <div className={this.className('tv-chart-bubble')} ref={el => this.bubble = el} style={{width, height}}></div>
        );
    }
}