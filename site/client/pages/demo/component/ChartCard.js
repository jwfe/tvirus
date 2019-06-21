import React, { Component } from 'react';
import { 
     Icon, Card, Chart, Progress, Popup
} from 'tvirus';


export default class ChartCard extends Component{
    state = {}
    constructor(props){
        super(props);
    }
    renderChart(){
        const { chart } = this.props;
        if(chart.type === 'progress'){
            return <Progress status={chart.status} value={chart.value} />
        }
        if(chart.type === 'colorProgress'){
            return <Progress type="color" status={chart.status} value={chart.value} />
        }
        return <Chart height={40} option={chart} />
    }
    render(){
        const { meta, total, chart, trend } = this.props;
        return (
            <Card
                className="chart-card-wraper" 
                bordered={false} 
                style={{paddingTop: 12, paddingBottom: 12}} ref={(el) => {this.chartNode = el}}
            >
                <div className="meta-wrapper">
                    <div className="meta">
                        <span>{ meta }</span>
                        <Popup
                            content={`${meta}`}
                            position="top left"
                            showArrow
                            trigger="hover"
                            prefix="tooltip"
                            visible={false}
                        >
                            <Icon type="info-circle" />
                        </Popup>
                        
                    </div>
                    <div className="meta-totall">{ total }</div>
                </div>
                <div className="chart-wrapper">
                    {this.renderChart()}
                </div>
                <div className="trend-footer">
                    {
                        trend.map((item, index) => {
                            return (
                                <div className="trend-item" key={index}>
                                    <span>
                                        <span>{item.text}</span>
                                        {item.value && <span className="trend-item-value">{item.value}</span>}
                                    </span>
                                    {item.isUp && <span className="trend-item-up up"></span>}
                                    {item.isDown && <span className="trend-item-down down"></span>}
                                </div> 
                            )
                        })
                    }
                </div>
            </Card>
        )
    }
}