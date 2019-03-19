import React, { Component } from 'react';
import * as echarts from 'echarts';
import throttle from 'Libs/throttle';
import { getOptions } from './dataSet';

export default class Chart extends Component {
    constructor(props) {
        super(props);
        this.chart = null;
    }

    static defaultProps = {
        theme: null,
        option: {},
        renderer: 'canvas',
        notMerge: true,
        lazyUpdate: false,
        showLoading: false,
        loadingOption: null,
        width: '100%',
        height: '500px',
        onChartReady: () => { }
    };

    componentDidMount() {
        this.rerender();
        this.resizeHandle = throttle(this.resize, 100)
        window.addEventListener('resize', this.resizeHandle);
    }
    componentDidUpdate() {
        // 每次更新组件都重置
        this.renderEchartDom();
    }
    componentWillUnmount() {
        // 组件卸载前卸载图表
        this.dispose();
    }
    initChart = el => {
        const { renderer } = this.props;

        return new Promise(resolve => {
            setTimeout(() => {
                (this.chart && echarts.getInstanceByDom(el)) || (this.chart = echarts.init(el, this.props.theme, {
                    renderer,
                    width: 'auto',
                    height: 'auto'
                }));
                resolve();
            }, 0);
        });
    };
    // 重新渲染
    rerender() {
        this.renderEchartDom();
        if (typeof onChartReady === 'function') this.props.onChartReady(this.chart);
    }
    async renderEchartDom() {
        await this.initChart(this.el);
        this.setOption(this.props.option);
        if (this.props.showLoading) {
            this.chart.showLoading(this.props.loadingOption || null);
        } else {
            this.chart.hideLoading();
        }
    }
    setOption = option => {
        if (!this.chart) {
            return;
        }
        let newOptions = getOptions(option);
        const { notMerge, lazyUpdate } = this.props;
        this.chart.setOption(newOptions, notMerge, lazyUpdate);
    }
    dispose = () => {
        if (!this.chart) {
            return;
        }
        window.removeEventListener('resize', this.resizeHandle);
        this.chart.dispose();
        this.chart = null;
    }
    resize = () => {
        this.chart && this.chart.resize();
    }
    getInstance = () => {
        return this.chart;
    }

    render() {
        const { width, height } = this.props;

        return (
            <div
                className="default-chart"
                ref={el => (this.el = el)}
                style={{ width, height }}
            />
        );
    }
}
