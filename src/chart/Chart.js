import React from 'react';
import merge from 'lodash.merge';
import * as echarts from 'echarts';
import { Util, Component, PropTypes, noop } from '@Libs';
import defaultOption from './echartConfig';

function deepObj(json = {}){
    return JSON.parse(JSON.stringify(json))
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
        /** echart 相关的配置，默认配置：@example {
        title: {
            left: 10,
            textStyle: {
                fontWeight: 'normal',
                fontSize: 16
            }
        },
        grid: {
            top: 100,
            left: 50,
            right: 0,
            bottom: 25
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            left: 10,
            top: 40,
            itemWidth: 10,
            itemHeight: 10,
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine: {
                lineStyle: {
                    color: '#e0e0e0'
                }
            },
            axisLabel: {
                color: '#333'
            }
        },
        yAxis : { 
            type : 'value',
            axisLine: {
                show: false
            },
            axisTick:{ 
                show: false
            },
            splitLine:{ 
                show: true, 
                lineStyle:{ 
                    type:'dashed',
                    color: '#E9E9E9'
                }
            } 
        }
    } */
        options: PropTypes.object,
        /** echart合并选项 */
        notMerge: PropTypes.bool,
        /** 是否默认禁用内置的默认配置 */
        notUseDefault: PropTypes.bool,
        /** echart lazyUpdate选项 */
        lazyUpdate: PropTypes.bool,
        /** 可以通过该方法获取实例化后的chart对象 */
        onChartReady: PropTypes.func
    };
    static defaultProps = {
        height: 500,
        renderer: 'canvas',
        notMerge: true, 
        lazyUpdate: false,
        notUseDefault: false,
        onChartReady: noop
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
        const { notMerge, lazyUpdate, onChartReady } = this.props;
        this.chartInit().then(() => {
            if (!this.chart) {
                return;
            }
            let newOptions = this.getOptions(this.props.option);
            this.chart.setOption(newOptions, notMerge, lazyUpdate);
            onChartReady(this.chart);
        })
    }
    getOptions(option){
        const { notUseDefault } = this.props;
        if(notUseDefault){
            return option;
        }
        return merge(deepObj(defaultOption), option);
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