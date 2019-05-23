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
        let width = bubbleNode.clientWidth;
        let height = bubbleNode.clientHeight;
        canvas.width = width;
        canvas.height = height;
        
        this.width = canvas.width;
        this.height = canvas.height;
        return canvas;
    }
    random(start, end){
        return Math.floor(Math.random() * end);
    }

    randomPrefix() {
        const width = this.width;
        const height = this.height;
        
        let x = parseInt(this.random(80, width));
        let y = parseInt(this.random(80, height));

        return {
            x,
            y
        }
    }
    // true: peng false:...
    handleEgdeCollisions(circle1, circle2) {
        let circle1X = circle1.x + circle1.r
        let circle1Y = circle1.y + circle1.r

        let circle2X = circle2.x + circle2.r
        let circle2Y = circle2.y + circle2.r
        let distance = Math.sqrt(Math.pow(circle1X - circle2X, 2) + Math.pow(circle1Y - circle2Y, 2))
        if(distance < circle1.r + circle2.r) {
            return true
        } else {
            return false
        }
    }
    // 判断两个区域是否重叠
    testOverlay (pointA, pointB) {
        return this.handleEgdeCollisions(pointA, pointB);
    }
  
    // 检查是否越界
    isOverflow(ball) {
        const { x, y, r } = ball;
        return !(x+r > this.width || x-r < 0 || y + r > this.height || y-r < 0)
    }

    findCircle(circle) {
        const balls = this.balls;
        let len = balls.length;
        let axiosBall;
        for (let i = 0; i < len; i++) {
            let x1 = balls[i].x;
            let y1 = balls[i].y;
            let r1 = balls[i].r;
            let x2 = circle.x;
            let y2 = circle.y;
            let r2 = circle.r;
            if ((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) < (r2 + r1) * (r2 + r1)) {
                axiosBall = balls[i];
                break;
            }
        }
        return axiosBall;
    }

    randomPostion(data){
        this.radiusMaps.forEach((item, index)=> {
            let count = 0
            while(count <= 200) {
                let newPoint = this.randomPrefix();
                newPoint.r = item;
                if (!this.testOverlay(this.balls, newPoint) && !this.findCircle(newPoint)) {
                    newPoint.r = item;
                    if(this.isOverflow(newPoint)){
                        const dItem = data[index];
                        newPoint.bgcolor = dItem.bgcolor;
                        newPoint.gradient = dItem.gradient;

                        newPoint.color = dItem.color;
                        newPoint.data = dItem;
                        this.balls.push(newPoint)
                        break;
                    }
                } else {
                    count += 1
                }
            }
        })
    }

    
    randomColor() {
        let r = Math.floor(Math.random()*100) + 155
        let g = Math.floor(Math.random()*100) + 155
        let b = Math.floor(Math.random()*100) + 155
        return  `rgb(${r},${g},${b})` 
    }

    radialGradient(x, y, r, gradientColors){
        const gradient = this.ctx.createRadialGradient(x, y, 5, x, y, r);

        // Add three color stops
        gradient.addColorStop(0, gradientColors.start);
        gradient.addColorStop(.9, gradientColors.end);

        return gradient;
    }

    drawCircles (ctx, circleArr) {
        let point = circleArr.pop()
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.r, 0, Math.PI * 2, true);
        const bgcolor = point.bgcolor || this.randomColor();
        ctx.fillStyle = point.gradient ? this.radialGradient(point.x, point.y, point.r, point.gradient) : bgcolor;
        ctx.fill();
        // 文本居中
        if(point.r > 15){
            ctx.fillStyle = point.color || '#fff';
            ctx.font = point.font || '12px serif'
            ctx.textAlign = point.textAlign || 'center';
            ctx.fillText(point.data.name, point.x, point.y, point.r * 2 - 10);    
        }

        if (circleArr.length > 0) {
            this.drawCircles(ctx, circleArr, point.r)
        }
    }

    componentDidMount(){
        const canvas = this.canvas = this.createCanvas();
        const width = this.width;
        const height = this.height;
        const { data } = this.props;
        const bubbleNode = this.bubble;
        bubbleNode.appendChild(canvas);
        const ctx = this.ctx = canvas.getContext('2d');


        let devicePixelRatio = window.devicePixelRatio || 1;
        let backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
                            ctx.mozBackingStorePixelRatio ||
                            ctx.msBackingStorePixelRatio ||
                            ctx.oBackingStorePixelRatio ||
                            ctx.backingStorePixelRatio || 1;
        let ratio = devicePixelRatio / backingStoreRatio;

        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';

        canvas.width = canvas.width * ratio;
        canvas.height = canvas.height * ratio;

        ctx.scale(ratio, ratio);
        ctx.translate(0.5, 0.5);


        ctx.textBaseline = 'middle'; 
        ctx.textAlign = 'center';

        this.total = data.reduce((t, i) => {
            return t + i.value
        }, 0);

        this.radiusMaps = data.map((d) => {
            return ( d.value / this.total ) * 100;
        });

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