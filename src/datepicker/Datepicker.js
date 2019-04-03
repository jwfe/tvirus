import React from 'react';
import { Component, PropTypes, noop } from '@Libs';
import DateTable from './DateTable';
import YearTable from './YearTable';
import MonthTable from './MonthTable';

import { weekOfYear, parse, fixedYM, format } from './utils';

export default class Datepicker extends Component {
    static propTypes = {
        className: PropTypes.string,
        defaultValue: PropTypes.arrayOf(PropTypes.string),
        name: PropTypes.string,
        model: PropTypes.string,
        disabledDate: PropTypes.func,
        onChange: PropTypes.func
    };

    static defaultProps = {
        mode: 'day',
        disabledDate: noop
    };

    constructor(props) {
        super(props);

        this.state = {
            date: props.value ? parse(props.value) : new Date()
        }
    }

    handleDate(value) {
        this.setState({
            view: 'day',
            date: value
        });
    }

    // 上年
    handlePrevYearClick(){
        let { date } = this.state;
        let { year } = weekOfYear(format(date));
        year = year - 1;

        date.setFullYear(year);

        this.setState({
            date
        });
    }

    // 下年
    handleNextYearClick(){
        let { date } = this.state;
        let { year } = weekOfYear(format(date));
        year = year + 1;

        date.setFullYear(year);

        this.setState({
            date
        });
    }

    // 上月
    handlePrevMonthClick(){
        let { date } = this.state;
        const { year, month } = weekOfYear(format(date));
        const array  = fixedYM(year, month - 1);

        date.setFullYear(array[0]);
        date.setMonth(array[1] - 1);

        this.setState({
            date
        });
    }

    // 下月
    handleNextMonthClick(){
        let { date } = this.state;
        const { year, month } = weekOfYear(format(date));
        const array  = fixedYM(year, month + 1);

        date.setFullYear(array[0]);
        date.setMonth(array[1] - 1);

        this.setState({
            date
        });
    }

    showYearPicker(){
        this.setState({
            view: 'year'
        })
    }

    showMonthPicker(){
        this.setState({
            view: 'month'
        })
    }

    renderSearch(){
        const { date } = this.state;
        const { year, month } = weekOfYear(format(date));
        return (
            <div className={this.className('tv-datepicker-header')}>
                    <div className="tv-datepicker-header-wraper">
                    <a className="tv-datepicker-prev-year-btn" title="上一年 (Control键加左方向键)" onClick={this.handlePrevYearClick.bind(this)}></a>
                    <a className="tv-datepicker-prev-month-btn" title="上个月 (翻页上键)" onClick={this.handlePrevMonthClick.bind(this)}></a>
                    <span className="tv-datepicker-ym-select">
                        <a className="tv-datepicker-year-select" title="选择年份" onClick={this.showYearPicker.bind(this)}>{year}年</a>
                        <a className="tv-datepicker-month-select" title="选择月份" onClick={this.showMonthPicker.bind(this)}>{month}月</a>
                    </span>
                    <a className="tv-datepicker-next-month-btn" title="下个月 (翻页下键)" onClick={this.handleNextMonthClick.bind(this)}></a>
                    <a className="tv-datepicker-next-year-btn" title="下一年 (Control键加右方向键)" onClick={this.handleNextYearClick.bind(this)}></a>
                </div>
            </div>
        )
    }

    renderTable(){
        const { mode } = this.props;
        const { date, view } = this.state;

        if(view === 'year'){
            return <YearTable date={date} onChange={this.handleDate.bind(this)} />
        }

        if(view === 'month'){
            return <MonthTable  date={date} onChange={this.handleDate.bind(this)}/>
        }
    
        return <DateTable mode={mode} date={date} onChange={this.handleDate.bind(this)} /> 
    }

    render(){

        return (
            <div className={this.className('tv-datepicker')}>
                { this.renderSearch() }
                <div className={this.className('tv-datepicker-body')}>
                    { this.renderTable() }
                </div>
                <div className={this.className('tv-datepicker-footer')}>
                    <div className="tv-datepicker-footer-btn">
                        <a className="tv-datepicker-time-btn">选择时间</a>
                        <a className="tv-datepicker-ok-btn">确 定</a>
                    </div>
                </div>
            </div>
        );
    }
}