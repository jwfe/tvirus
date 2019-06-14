export default {
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
}