import React from 'react';
import { Component, PropTypes, noop } from '@Libs';
import DateTable from './DateTable';
import YearTable from './YearTable';
import MonthTable from './MonthTable';
import Button from '@button';
import Popup from '@popup';

import { weekOfYear, parse, fixedYM, format, nextMonth } from './utils';

export default class Range extends Component {
    static propTypes = {
        className: PropTypes.string,
        defaultValue: PropTypes.arrayOf(PropTypes.string),
        placeholder: PropTypes.string,
        name: PropTypes.string,
        disabled: PropTypes.bool,
        disabledDate: PropTypes.func,
        onChange: PropTypes.func
    };

    static defaultProps = {
        position: "bottom left",
        disabledDate: noop,
        onChange: noop
    };

    constructor(props) {
        super(props);

        this.state = {
            minDate: null,
            maxDate: null,
            rangeState: {
                endDate: null,
                selecting: false,
            },
            date: props.value ? parse(props.value) : new Date()
        }
    }

    handlePopupChange(showPopup){
        const { disabled } = this.props;

        if(disabled){
            this.setState({visible: false});
            return;
        }
        if(disabled){
            showPopup = false
        }
        this.setState({visible: showPopup});
    }

    handleDate({ minDate, maxDate }, isClose) {
        const { onChange } = this.props
        if (!isClose){
            this.setState({ visible: true, view: 'day', minDate, maxDate });
            return;
        };
        this.setState({ visible: false, view: 'day', minDate, maxDate });
        onChange([minDate, maxDate], false)
    }
    handleMoveRange({ endDate }){
        const { rangeState, minDate } = this.state
        if (endDate <= minDate) endDate = null

        rangeState.endDate = endDate
        this.setState({
            maxDate: endDate,
        })
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

    renderSearch(key){
        const { date } = this.state;
        let { year, month } = weekOfYear(format(date));
        if(key === 'right'){
            month = Number(month) + 1;
        }
        const array = fixedYM(year, month);
        return (
            <div className={this.className('tv-datepicker-header')}>
                <div className="tv-datepicker-header-wraper">
                    {key === 'left' && <a className="tv-datepicker-prev-year-btn" title="上一年 (Control键加左方向键)" onClick={this.handlePrevYearClick.bind(this)}></a>}
                    {key === 'left' && <a className="tv-datepicker-prev-month-btn" title="上个月 (翻页上键)" onClick={this.handlePrevMonthClick.bind(this)}></a>}
                    <span className="tv-datepicker-ym-select">
                        <a className="tv-datepicker-year-select" title="选择年份" onClick={this.showYearPicker.bind(this)}>{array[0]}年</a>
                        <a className="tv-datepicker-month-select" title="选择月份" onClick={this.showMonthPicker.bind(this)}>{array[1]}月</a>
                    </span>
                    { key === 'right' && <a className="tv-datepicker-next-month-btn" title="下个月 (翻页下键)" onClick={this.handleNextMonthClick.bind(this)}></a>}
                    { key === 'right' && <a className="tv-datepicker-next-year-btn" title="下一年 (Control键加右方向键)" onClick={this.handleNextYearClick.bind(this)}></a>}
                </div>
            </div>
        )
    }

    renderTable(key){
        const mode = 'range';
        let { date, view, rangeState, minDate, maxDate } = this.state;

        if(key === 'right'){
            date = nextMonth(date)
        }

        if(view === 'year'){
            return <YearTable date={date} onChange={this.handleDate.bind(this)} />
        }

        if(view === 'month'){
            return <MonthTable date={date} onChange={this.handleDate.bind(this)}/>
        }
    
        return <DateTable 
            mode={mode} rangeState={rangeState} date={date} 
            minDate={minDate}
            maxDate={maxDate}
            onMoveRange={this.handleMoveRange.bind(this)}
            onChange={this.handleDate.bind(this)}
         /> 
    }

    render(){
        const { position, placeholder, footer } = this.props;
        const { disabled, visible, minDate, maxDate } = this.state;

        const content = [
            (
                <div className={this.className('tv-datepicker-range')}>
                    {
                        ['left', 'right'] .map((key) => {
                            return (
                                <div className={this.className('tv-datepicker')}>
                                    { this.renderSearch(key) }
                                    <div className={this.className('tv-datepicker-body')}>
                                        { this.renderTable(key) }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            )
        ];

        if(footer){
            <div className={this.className('tv-datepicker-footer')}>
                <div className="tv-datepicker-footer-btn">
                    <a className="tv-datepicker-time-btn">选择时间</a>
                    <a className="tv-datepicker-ok-btn">确 定</a>
                </div>
            </div>
        }


        const min = minDate ? format(minDate) : null;
        const max = maxDate ? format(maxDate) : null;

        return (
            <div className={this.className('tv-datepicker-wraper')}>
                <Popup 
                disabled={disabled}
                showArrow={false} 
                visible={visible} 
                trigger="click" 
                position={position} 
                content={content}
                onChange={this.handlePopupChange.bind(this)}
                >
                    <div className="tv-datepicker-trigger">
                        <Button>{ min && max ? `${min} ~ ${max}` : placeholder}</Button>
                    </div>
                </Popup>
            </div>
        );
    }
}