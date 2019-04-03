import React from 'react';
import { Component, PropTypes, noop } from '@Libs';
import { fixedYM } from './utils';

function format(year, month, day){
    return {
        year: Number(year),
        month: month ? Number(month) : null,
        day: day ? Number(day) : null
    }
     
}

export default class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            ...format(props.year, props.month, props.day)
        }
    }
    static propTypes = {
        className: PropTypes.string,
        year: PropTypes.string,
        month: PropTypes.string,
        day: PropTypes.string,
        model: PropTypes.string,
        onChange: PropTypes.func,
        onSwitchYear: PropTypes.func,
        onSwitchMonth: PropTypes.func,
    };

    static defaultProps = {
        onChange: noop
    };
    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.year !== prevState.year || nextProps.month !== prevState.month){
            return format(nextProps.year, nextProps.month, nextProps.day);
        }
    }
    // 上年
    handlePrevYearClick(){
        let { onChange } = this.props;
        let { year, month, day } = this.state;
        year = year - 1;
        this.setState({
            year
        });
        onChange(year, month, day);
    }

    // 下年
    handleNextYearClick(){
        let { onChange } = this.props;
        let { year, month, day } = this.state;
        year = year + 1;
        this.setState({
            year
        });
        onChange(year, month, day);
    }

    // 上月
    handlePrevMonthClick(){
        let { onChange } = this.props;
        let { year, month, day } = this.state;
        const array  = fixedYM(year, month - 1);
        this.setState({
            year: array[0],
            month: array[1]
        });
        onChange(array[0], array[1], day);
    }

    // 下月
    handleNextMonthClick(){
        let { onChange } = this.props;
        let { year, month, day } = this.state;
        const array  = fixedYM(year, month + 1);
        this.setState({
            year: array[0],
            month: array[1]
        });
        onChange(array[0], array[1], day);
    }

    handleYear(){
        let { onSwitchYear } = this.props;
        onSwitchYear();
    }

    handleMonth(){
        let { onSwitchMonth } = this.props;
        onSwitchMonth();
    }

    isShowMonth(){
        const { model } = this.props;
        return model !== 'year' && model !== 'month';
    }

    render(){
        const { year, month } = this.state;
         
        return (
            <div className={this.className('tv-datepicker-header')}>
                <div className="tv-datepicker-header-wraper">
                    <a className="tv-datepicker-prev-year-btn" title="上一年 (Control键加左方向键)" onClick={this.handlePrevYearClick.bind(this)}></a>
                    { this.isShowMonth() && <a className="tv-datepicker-prev-month-btn" title="上个月 (翻页上键)" onClick={this.handlePrevMonthClick.bind(this)}></a>}
                    <span className="tv-datepicker-ym-select">
                        <a className="tv-datepicker-year-select" title="选择年份" onClick={this.handleYear.bind(this)}>{year}年</a>
                        { this.isShowMonth() && <a className="tv-datepicker-month-select" title="选择月份" onClick={this.handleMonth.bind(this)}>{month}月</a>}
                    </span>
                    { this.isShowMonth() && <a className="tv-datepicker-next-month-btn" title="下个月 (翻页下键)" onClick={this.handleNextMonthClick.bind(this)}></a>}
                    <a className="tv-datepicker-next-year-btn" title="下一年 (Control键加右方向键)" onClick={this.handleNextYearClick.bind(this)}></a>
                </div>
            </div>
        )
    }
}