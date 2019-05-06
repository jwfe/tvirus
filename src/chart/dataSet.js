export const getOptions = (data) => {
	let hasData = data.series.some(function (item) {
        if (!item) {
            return false;
        } else {
            return (item.data.length > 0)
        }
    })
    const chartConfig = {
        title: {
            text: ''
        },
        grid: data['grid'] || {
            top: 20,
            bottom: 80,
            left: 80,
            right: 30
        },
        tooltip: data.hasOwnProperty('tooltip') ? data['tooltip'] : {
            show: true,
            trigger: 'axis',
            triggerOn: 'mousemove',
            enterable: true,
            backgroundColor: '#ffffff',
            padding: 0,
            
            formatter: function (params, index) {
                let date = data.xAxis[params[0].dataIndex];
                let innerHtml = '';
                params.forEach((item, index) => {
                    let itemdata = item.data === null ? '--' : item.data
                    innerHtml += `<li>

                        <span class="toolConLeft"> ${item.seriesName}
                        </span><span class="toolConRight"><span class="toolTip" style="background:${item.color}"></span>${itemdata}</span>
                    </li>`
                })
               
                return `<ul class="compAnalysisTooltip"><li class="title"><span class="toolConLeft">${date}</span></li>${innerHtml}</ul>`;
            }
        },
        legend: data.hasOwnProperty('legend') ? Object.assign({
            bottom: 0,
            left: "center"
        }, data['legend']) : {
            bottom: 0,
            left: "center"
        },
        xAxis: data['xAxis'] || {
            data: data.xAxis,
            type: 'category',
            boundaryGap: true,
            axisTick: {
                alignWithLabel: true,
                lineStyle: {
                    color: '#d7e0e5'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#d7e0e5'
                }
            }
        },
        
        yAxis: data.yAxis,
        series: data.series
    };
    if (!hasData) {
        if (chartConfig.series.length > 0) {
            chartConfig.series[0].markArea = {};
        }
        chartConfig.graphic = [{
            type: 'text',
            left: 'center',
            top: '40%',
            style: {
                text: '暂无数据',
                font: '20px Microsoft YaHei',
                fill: '#777'
            }

        }]
    }
    else {
        chartConfig.graphic = []
    }
    return Object.assign(chartConfig, data || {});
}