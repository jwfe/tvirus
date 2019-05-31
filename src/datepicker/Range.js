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
        trigger: PropTypes.string,
        disabled: PropTypes.bool,
        disabledDate: PropTypes.func,
        onChange: PropTypes.func
    };

    static defaultProps = {
        trigger: 'click',
        position: "bottom left",
        disabledDate: noop,
        onChange: noop
    };

    constructor(props) {
        super(props);
        const now = new Date();

        let left_date = parse(props.minDate || format(now));
        let right_date = parse(props.maxDate || format(now));

        if(left_date.getFullYear() === right_date.getFullYear() && left_date.getMonth() === right_date.getMonth()){
            right_date.setMonth(right_date.getMonth() + 1);
        }
        
        this.state = {
            view: 'day',
            left_date: left_date,
            right_date: right_date,
            minDate: left_date,
            maxDate: parse(props.maxDate) || left_date,
            selected: {
                minDate: left_date,
                maxDate: parse(props.maxDate) || left_date,
            },
            rangeState: {
                endDate: null,
                selecting: false,
            }
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
        const { onChange, name } = this.props
        if (!isClose){
            this.setState({ visible: true, view: 'day', minDate, maxDate });
            return;
        };
        this.setState({ visible: false, view: 'day', minDate, maxDate, selected: {
            minDate, maxDate,
        }});
        onChange([minDate, maxDate], false, name)
    }
    handleMoveRange({ endDate }){
        const { rangeState, minDate } = this.state
        if (endDate <= minDate) endDate = null

        rangeState.endDate = endDate
        this.setState({
            maxDate: endDate,
        })
    }
    handleYearDate(cell, key){
        let date = this.state[`${key}_date`];
        let { year } = weekOfYear(format(cell));

        date.setFullYear(year);

        this.setState({
            visible: true, 
            view: 'day',
            [`${key}_date`]: date
        });
    }
    handleMonthDate(cell, key){
        let date = this.state[`${key}_date`];
        const { year, month } = weekOfYear(format(cell));
        const array  = fixedYM(year, month - 1);

        date.setFullYear(array[0]);
        date.setMonth(array[1]);

        this.setState({
            visible: true, 
            view: 'day',
            [`${key}_date`]: date
        });
    }
    // 上年
    handlePrevYearClick(key){
        let date = this.state[`${key}_date`];
        let { year } = weekOfYear(format(date));
        year = year - 1;

        date.setFullYear(year);

        this.setState({
            [`${key}_date`]: date
        });
    }

    // 下年
    handleNextYearClick(key){
        let date = this.state[`${key}_date`];
        let { year } = weekOfYear(format(date));
        year = year + 1;

        date.setFullYear(year);

        this.setState({
            [`${key}_date`]: date
        });
    }

    // 上月
    handlePrevMonthClick(key){
        let date = this.state[`${key}_date`];
        const { year, month } = weekOfYear(format(date));
        const array  = fixedYM(year, month - 1);

        date.setFullYear(array[0]);
        date.setMonth(array[1] - 1);

        this.setState({
            [`${key}_date`]: date
        });
    }

    // 下月
    handleNextMonthClick(key){
        let date = this.state[`${key}_date`];
        const { year, month } = weekOfYear(format(date));
        const array  = fixedYM(year, month + 1);

        date.setFullYear(array[0]);
        date.setMonth(array[1] - 1);

        this.setState({
            [`${key}_date`]: date
        });
    }

    showYearPicker(key){
        this.setState({
            visible: true, 
            view: key + 'year'
        })
    }

    showMonthPicker(key){
        this.setState({
            visible: true, 
            view: key + 'month'
        })
    }

    renderSearch(key){
        const { view } = this.state;
        let date = this.state[`${key}_date`];
        let { year, month } = weekOfYear(format(date));
        const array = fixedYM(year, month);
        return (
            <div className={this.className('tv-datepicker-header')}>
                <div className="tv-datepicker-header-wraper">
                    <a className="tv-datepicker-prev-year-btn" title="上一年" onClick={this.handlePrevYearClick.bind(this, key)}></a>
                    <a className="tv-datepicker-prev-month-btn" title="上个月" onClick={this.handlePrevMonthClick.bind(this, key)}></a>
                    <span className="tv-datepicker-ym-select">
                        <a className="tv-datepicker-year-select" title="选择年份" onClick={this.showYearPicker.bind(this, key)}>{array[0]}年</a>
                        <a style={{display: (view !== key + 'year' &&  view !== key + 'month') ? '' : 'none'}} className="tv-datepicker-month-select" title="选择月份" onClick={this.showMonthPicker.bind(this, key)}>{array[1]}月</a>
                    </span>
                    <a className="tv-datepicker-next-month-btn" title="下个月" onClick={this.handleNextMonthClick.bind(this, key)}></a>
                    <a className="tv-datepicker-next-year-btn" title="下一年" onClick={this.handleNextYearClick.bind(this, key)}></a>
                </div>
            </div>
        )
    }

    renderTable(key){
        const mode = 'range';
        let { view, rangeState, minDate, maxDate } = this.state;
        let { disabledDate } = this.props;
        let date = this.state[`${key}_date`];

        return [
            <YearTable 
                disabledDate={disabledDate} 
                rangeKey={key} date={date} onChange={this.handleYearDate.bind(this)} 
                style={{display: view === key + 'year' ? '' : 'none'}} />,
            <MonthTable 
                disabledDate={disabledDate} 
                rangeKey={key} date={date} onChange={this.handleMonthDate.bind(this)} 
                style={{display: view === key + 'month' ? '' : 'none'}} />,
            <DateTable 
                disabledDate={disabledDate} 
                style={{display: (view !== key + 'year' &&  view !== key + 'month') ? '' : 'none'}}
                key={key}
                mode={mode} rangeState={rangeState} date={date} 
                minDate={minDate}
                maxDate={maxDate}
                onMoveRange={this.handleMoveRange.bind(this)}
                onChange={this.handleDate.bind(this)}
            /> 
        ]
    }

    render(){
        const { position, placeholder, footer, children, trigger } = this.props;
        const { disabled, visible, selected } = this.state;
        const { minDate, maxDate } = selected;

        const content = [
            (
                <div className={this.className('tv-datepicker-range')}>
                    {
                        ['left', 'right'] .map((key) => {
                            return (
                                <div key={key} className={this.className('tv-datepicker')}>
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
                trigger={trigger} 
                position={position} 
                content={content}
                onChange={this.handlePopupChange.bind(this)}
                >
                    {children || <div className="tv-datepicker-trigger">
                        <Button>{ min && max ? `${min} ~ ${max}` : placeholder}</Button>
                    </div>}
                </Popup>
            </div>
        );
    }
}