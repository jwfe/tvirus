import React from 'react';
import * as echarts from 'echarts';
import { Util, Component, PropTypes } from '@Libs';
import { getOptions } from './dataSet';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.chart = null;
    }
    static propTypes = {
        className: PropTypes.string,
        title: PropTypes.string,
        theme: PropTypes.string,
        type: PropTypes.string,
        option: PropTypes.object,
        renderer: PropTypes.string,

        notMerge: PropTypes.bool,
        lazyUpdate: PropTypes.bool,
        showLoading: PropTypes.bool,
        loadingOption: PropTypes.bool,
        width: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        height: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        onChartReady: PropTypes.func,
    };

    static defaultProps = {
        title: null,
        theme: null,
        type: 'spline',
        option: {},
        renderer: 'canvas',
        notMerge: true,
        lazyUpdate: false,
        showLoading: false,
        loadingOption: null,
        width: '100%',
        height: 500,
        onChartReady: () => { }
    };

    componentDidMount() {
        this.rerender();
        this.resizeHandle = Util.throttle(this.resize, 100)
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

        if(!echarts || !echarts.init){
            return;
        }

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
    renderEchartDom() {
        this.initChart(this.el);
        setTimeout(() => {
            this.setOption(this.props.option);
            if (this.props.showLoading) {
                this.chart.showLoading(this.props.loadingOption || null);
            } else {
                this.chart.hideLoading();
            }
        }, 0)
        
    }
    setOption = option => {
        const { notMerge, lazyUpdate, type } = this.props;
        if (!this.chart) {
            return;
        }
        let newOptions = getOptions(type, option);
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
        const { width, height, title } = this.props;

        return (
            <div className="tv-chart" style={{width, height}} ref={el => (this.el = el)}></div>
        );
    }
}


export default Chart;