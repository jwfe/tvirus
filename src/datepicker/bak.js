import React from 'react';
import { Component, PropTypes, noop } from '@Libs';
import Header from './Header';

import { getMonthDaysArray, weekOfYear, now, parse, fixedYM } from './utils';

export default class Datepicker extends Component {
    static propTypes = {
        className: PropTypes.string,
        defaultValue: PropTypes.arrayOf(PropTypes.string),
        name: PropTypes.string,
        model: PropTypes.string,
        disabled: PropTypes.bool,
        isRange: PropTypes.bool,
        disabledDate: PropTypes.func,
        onChange: PropTypes.func
    };

    static defaultProps = {
        isRange: false,
        disabled: false,
        disabledDate: noop
    };

    constructor(props) {
        super(props);

        const { year, month, day } = now();
        const dateString = this.getDateString(year, month, day);

        this.state = {
            isSwitch: false,
            model: props.model,
            currCell: {
                year, month, day,
                dateString
            },
            renderDateString: '',
            value: props.defaultValue || [dateString],
            selectValue: []
        }
    }

    getDateString(year, month, day){
        return `${year}-${month}-${day}`
    }
    getNextMonth(dateString){
        const dateArray = dateString.split(/\W+/);
        const newDateArray = fixedYM(dateArray[0], Number(dateArray[1]) + 1);
        newDateArray.push(dateArray[2]);
        return newDateArray.join('-');
    }
    // 看一下是否在数组的范围内
    isInRange(dateArray, dateString){
        const start = parse(dateArray[0]).getTime();
        const end = dateArray[1] ? parse(dateArray[1]).getTime() : start;
        const currDate = parse(dateString).getTime();
        return start <= currDate && end >= currDate;
    }

    getMonthDays(renderDateString){
        const { selectValue, model } = this.state;
        const { disabledDate } = this.props;
        const dateArray = getMonthDaysArray(renderDateString);
        const dateTables = [];
        const rowArr = [];
        dateArray.forEach((dateObj, index) => {
            const rowIndex = Math.floor(index/7);
            if(index%7 === 0){
                dateTables.push([]);
            }

            if(!rowIndex){
                rowArr.push(dateObj.weekDay);
            }
            
            const dateString = this.getDateString(dateObj.year, dateObj.month, dateObj.day);
            const { number, season } = weekOfYear(dateString);
            dateObj.dateString = dateString;
            dateObj.selected = this.isInRange(selectValue, dateString);

            dateObj.disabled = disabledDate(dateString);
            dateObj.week = number;
            dateObj.season = season;
            if(dateObj.today){
                dateObj.text = '今天'
            }
            // 周视图下第一列展示对应的周
            if(model === 'week' && index%7 === 0 ){
                const obj = JSON.parse(JSON.stringify(dateObj));
                obj.text = obj.week;
                dateTables[rowIndex].push(obj);
            }
            dateTables[rowIndex].push(dateObj);
        });

        if(model === 'week'){
            rowArr.unshift('周')
        }
        dateTables.unshift(rowArr);
        return dateTables;
    }

    getYearMonth(){
        const { currCell } = this.state;
        const { disabledDate } = this.props;
        const monthTables = [];
        const { year, month } = now();
        for(let i=0; i<12; i++){
            const rowIndex = Math.floor(i/3);
            const value =  i + 1;
            if(i%3 === 0){
                monthTables.push([]);
            }

            monthTables[rowIndex].push({
                year: currCell.year || year,
                tody: month === value,
                selected: currCell.month === value,
                disabled: disabledDate(value),
                dateString: `${ currCell.year || year}-${value}`,
                month: value,
                text: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'][i] + '月'
            });
        }
        return monthTables;
    }

    getYear(dirtyYear){
        const { disabledDate } = this.props;
        const yearTables = [];
        const { year } = now();

        const yearArray = [];

        for(let i=0; i<6; i++){
            yearArray.unshift(year - i);
        }

        for(let i=1; i<=6; i++){
            yearArray.push(year + i);
        }

        for(let i=0; i<12; i++){
            const rowIndex = Math.floor(i/3);
            let value =  yearArray[i];
            if(i%3 === 0){
                yearTables.push([]);
            }

            yearTables[rowIndex].push({
                tody: year,
                selected: Number(dirtyYear) === Number(value),
                disabled: disabledDate(value),
                year: value,
                dateString: value,
                text: value + '年'
            });
        }
        return yearTables;
    }

    handleHeader(year, month, day){
        const dateString = this.getDateString(year, month, day);
        this.setState({
            currCell: {
                year, month, day,
                dateString
            }
        });
    }

    handleDateClick(cell){
        const { isRange } = this.props;
        let { model, isSwitch, currCell, value, selectValue } = this.state;
        const dateString = `${cell.year}-${cell.month}-${cell.day}`;
        let data = {
            currCell: cell,
            value: [dateString],
            selectValue: [dateString]
        };
        if(isSwitch){
            currCell[model] = cell[model];
            const _value = [`${currCell.year}-${currCell.month}-${currCell.day}`]
            data = {
                isSwitch: false,
                model: this.props.model,
                currCell,
                value: _value,
                selectValue: _value
            }
        }

        if(isRange){
            if(selectValue.length >= 2){
                selectValue = value = [dateString];
            } else {
                value = selectValue;
                selectValue.push(dateString); 
                value.push(dateString);
            }
            data = {
                currCell: cell,
                value,
                selectValue
            }
        }

        this.setState(data)
    }
    handleSwitchYear(){
        this.setState({
            model: 'year',
            isSwitch: true
        })
    }
    onSwitchMonth(){
        this.setState({
            model: 'month',
            isSwitch: true
        })
    }
    renderThreeCell(array){
        const { currCell, model } = this.state;

        return (
            <div className={this.className('tv-datepicker')}>
                <Header {...currCell} 
                model={model}
                onChange={this.handleHeader.bind(this)}
                onSwitchYear={this.handleSwitchYear.bind(this)}
                onSwitchMonth={this.onSwitchMonth.bind(this)}
                />
                <div className={this.className('tv-datepicker-body')}>
                    <table className="tv-datepicker-month-table" cellspacing="0">
                        <tbody className="tv-datepicker-month-tbody">
                            {
                                array.map((row, index) => {
                                    return (
                                        <tr>
                                            {
                                                row.map((cell) => {
                                                    return (
                                                        <td 
                                                        onClick={this.handleDateClick.bind(this, cell)}
                                                        title={cell.month ? `${cell.year}年${cell.month}月` : `${cell.value}年`} 
                                                        className={this.className('tv-datepicker-cell', {
                                                            'tv-datepicker-cell-selected-day': cell.selected,
                                                            'tv-datepicker-cell-today-day': cell.today,
                                                            'tv-datepicker-cell-disabled-day': cell.disabled
                                                        })}>
                                                            <div className="tv-datepicker-date">{cell.text}</div>
                                                        </td>
                                                    )
                                                })
                                            }
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    renderMonth(){
        const { currCell } = this.state;
        const currentMonth = this.getYearMonth(currCell.year, currCell.month);

        return this.renderThreeCell(currentMonth);
    }

    renderYear(){
        const { currCell } = this.state;
        const currentYear = this.getYear(currCell.year);

        return this.renderThreeCell(currentYear);
    }

    renderDate(dateString) {
        const { model, currCell } = this.state;

        if(model === 'month'){
            return this.renderMonth();
        }

        if(model === 'year'){
            return this.renderYear();
        }

        const currentMonthDays = this.getMonthDays(dateString);
        const head = currentMonthDays.shift();

        const dateArray = dateString.split(/\W+/);
        const dateObj = {
            year: dateArray[0],
            month: dateArray[1],
            day: dateArray[2],
            dateString
        }

        return (
            <div className={this.className('tv-datepicker')}>
                <Header {...dateObj} onChange={this.handleHeader.bind(this)}
                    onSwitchYear={this.handleSwitchYear.bind(this)}
                    onSwitchMonth={this.onSwitchMonth.bind(this)}
                />
                <div className={this.className('tv-datepicker-body')}>
                    <table className="tv-datepicker-table" cellspacing="0">
                        <thead>
                            <tr>
                                {
                                    head.map((item) => {
                                        return (
                                            <th title={`周${item}`} className="tv-datepicker-column-header">
                                                <span className="tv-datepicker-column-header-inner">{item}</span>
                                            </th>
                                        )
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody className="tv-datepicker-tbody">
                            {
                                currentMonthDays.map((row, index) => {
                                    const isActiveWeek = row[0].week === currCell.week && model === 'week'
                                    return (
                                        <tr className={this.className({
                                            'tv-datepicker-active-week': isActiveWeek
                                        })}>
                                            {
                                                row.map((cell) => {
                                                    return (
                                                        <td 
                                                        onClick={this.handleDateClick.bind(this, cell)}
                                                        title={`${cell.year}年${cell.month}月${cell.day}日`} 
                                                        className={this.className('tv-datepicker-cell', {
                                                            'tv-datepicker-cell-selected-day': cell.selected,
                                                            'tv-datepicker-cell-today-day': cell.today,
                                                            'tv-datepicker-cell-nonmonth-day': !cell.isThisMonth,
                                                            'tv-datepicker-cell-disabled-day': cell.disabled
                                                        })}>
                                                            <div className="tv-datepicker-date">{cell.text || cell.day}</div>
                                                        </td>
                                                    )
                                                })
                                            }
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
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
    render(){
        const { isRange } = this.props;
        const { value } = this.state;
        if(isRange && value.length === 1){
            console.log(this.getNextMonth(value[0]));
            value.push(this.getNextMonth(value[0]));
        }
        return (
            <div>
                {
                    value.map((item) => {
                        return this.renderDate(item);    
                    })
                }
            </div>
        )
    }
}