import React from 'react';
import * as echarts from 'echarts';
import { Util, Component, PropTypes } from '@Libs';
import defaultOption from './echartConfig';

function deepClone (sourceObj, targetObj) {
    let cloneObj = targetObj || {}
    if(!sourceObj || typeof sourceObj !== "object"){
        return sourceObj
    }
    if(sourceObj instanceof Array){
        cloneObj = sourceObj.concat()
    } else {
        for(let key in sourceObj){
            if (typeof sourceObj[key] === 'object') {
                deepClone(sourceObj[key], cloneObj[key])
            } else {
                cloneObj[key] = cloneObj[key] || sourceObj[key]
            }
        }
    }
    return cloneObj
}

export default class Chart extends Component{
    static propTypes = {
        /** 自定义样式 */
        className: PropTypes.string,
        /** 使用canvas或者svg来渲染 */
        renderer: PropTypes.oneOf(['canvas', 'svg']),
        /** 容器宽度，chart会继承这个宽度 */
        width: PropTypes.number, 
        /** 容器高度，chart会继承这个高度 */
        height: PropTypes.number,
        /** echart 相关的配置 */
        options: PropTypes.object,
        /** echart合并选项 */
        notMerge: PropTypes.bool,
        /** echart lazyUpdate选项 */
        lazyUpdate: PropTypes.bool,
    };
    static defaultProps = {
        height: 500,
        renderer: 'canvas',
        notMerge: true, 
        lazyUpdate: false
    }

    constructor(props){
        super(props);
    }
    componentDidMount() {
        this.update();
        this.resizeHandle = Util.throttle(this.resize, 100)
        window.addEventListener('resize', this.resizeHandle);
    }
    resize = () => {
        this.chart && this.chart.resize();
    }
    update(){
        const { notMerge, lazyUpdate } = this.props;
        this.chartInit().then(() => {
            if (!this.chart) {
                return;
            }
            let newOptions = this.getOptions(this.props.option);
            this.chart.setOption(newOptions, notMerge, lazyUpdate);
        })
    }
    getOptions(option){
        return deepClone(defaultOption, option);
    }
    chartInit(){
        const { renderer } = this.props;
        return new Promise(resolve => {
            setTimeout(() => {
                (this.chart && echarts.getInstanceByDom(el)) || (this.chart = echarts.init(this.el, this.props.theme, {
                    renderer,
                    width: 'auto',
                    height: 'auto'
                }));
                resolve();
            }, 0);
        });
    }

    render(){
        const { width, height } = this.props;
        if(!window.echarts){
            return null;
        }
        return <div className="tv-chart" style={{width, height}} ref={el => (this.el = el)} />
    }
}