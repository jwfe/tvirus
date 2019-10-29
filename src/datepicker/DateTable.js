import React from 'react';
import { Component, PropTypes, noop, Util } from '@Libs';
const { getMonthDaysArray, weekOfYear, parse, format } = Util.date;

const modes = {
    WEEK: 'week',
    YEAR: 'year',
    MONTH: 'month',
    DAY: 'day'
}

const RANGE = 'range';
const DAY_DURATION = 86400000;

const clearHours = function (time) {
    if(!time){
        return null;
    }
    const cloneDate = new Date(time);
    cloneDate.setHours(0, 0, 0, 0);
    return cloneDate.getTime();
};
/**
 * 该组件为内部组件，不对外暴露
 */
export default class DateTable extends Component {
    static propTypes = {
        /** 自定义样式 */
        className: PropTypes.string,
        date: PropTypes.instanceOf(Date),
        mode: PropTypes.string,
        disabled: PropTypes.bool,

        showWeekNumber: PropTypes.bool,
        rangeState: PropTypes.object,

        disabledDate: PropTypes.func,
        onChange: PropTypes.func,
        onMoveRange: PropTypes.func,
    };

    static defaultProps = {
        disabled: false,
        showWeekNumber: true,
        disabledDate: noop,
        onMoveRange: noop
    };

    constructor(props) {
        super(props);
        this.state = {
            date: props.date ? props.date : clearHours(format(new Date()))
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        let date = new Date()
        if (nextProps.date){
            date = date
        }

        return { date }
    }

    objToDateStr(obj){
        return `${obj.year}-${obj.month}-${obj.day}`
    }
    objToDate(obj){
        return parse(this.objToDateStr(obj))
    }

    isSelected(dateObj){
        const { mode, date, range } = this.props
        if(mode !== modes.DAY || range === RANGE || !date){
            return false;
        }

        return date.getTime() === dateObj.getTime();
    }

    getStartDate() {
        const { year, month } = weekOfYear(format(this.props.date));

        const result = parse(`${year}-${month}-1`);
        result.setTime(result.getTime() - DAY_DURATION * 7);
        return result;
    }
    getRowsDays(){
        let { date, disabledDate, showWeekNumber, minDate, maxDate, mode, lang, langConfig } = this.props;
        const min = clearHours(minDate);
        const max = clearHours(maxDate);

        const dateArray = getMonthDaysArray(date);
        const head = [];
        const rows = [];

        dateArray.forEach((dateObj, index) => {
            const rowIndex = Math.floor(index/7);
            if(index%7 === 0){
                rows.push([]);
            }

            if(!rowIndex){
                head.push(dateObj.weekDay);
            }

            dateObj.dateString = this.objToDateStr(dateObj);
            const { number, season } = weekOfYear(dateObj.dateString);
            dateObj.date = this.objToDate(dateObj);
            dateObj.selected = this.isSelected(dateObj.date);

            dateObj.disabled = disabledDate(dateObj.date);
            dateObj.week = number;
            dateObj.season = season;
            if(dateObj.today){
                dateObj.text = langConfig['今天']
            }

            const time = clearHours(dateObj.date);

            dateObj.inRange = time >= min && time <= max;
            dateObj.start = min && time === min;
            dateObj.end = max && time === max;

            // 周视图下第一列展示对应的周
            if(mode === modes.WEEK && index%7 === 0 && showWeekNumber){
                const obj = JSON.parse(JSON.stringify(dateObj));
                obj.isWeekNumber = true;
                obj.isNotClick = true;
                obj.text = obj.week;
                rows[rowIndex].push(obj);
            }

            rows[rowIndex].push(dateObj);
        });

        return { head, rows };
    }

    getRow(){
        let {showWeekNumber, minDate, range, rangeState, rangeKey} = this.props;

        const { head, rows } = this.getRowsDays();
        if (!(range === RANGE && rangeState.ing && rangeState.endDate)) {
            return { head, rows };
        }

        let maxDate = rangeState.endDate
        const min = clearHours(minDate);
        const max = clearHours(maxDate);

        for (let i = 0, k = rows.length; i < k; i++) {
            const row = rows[i];
            for (let j = 0, l = row.length; j < l; j++) {
                if (showWeekNumber && j === 0) continue;

                const cell = row[j];
                const time = clearHours(cell.date);

                cell.inRange = min && time >= min && time <= max;
                cell.start = min && time === min;
                cell.end = max && time === max;
                console.log('========2', rangeKey, max, time, cell.end, max && time === max);
            }
        }

        return { head, rows };
    }

    isWeekActive(cell){
        const { mode, date, range, rangeKey, maxDate, minDate } = this.props;
        if(mode !== modes.WEEK){
            return false;
        }

        if(range !== RANGE){
            return cell.week === weekOfYear(format(date)).number;
        }

        if(rangeKey === 'left'){
            return cell.week === weekOfYear(format(minDate)).number; 
        }
        return cell.week === weekOfYear(format(maxDate)).number; 
    }
    handleMouseMove(cell){
        const { onMoveRange, rangeState, range, disabledDate } = this.props;

        if (!(range === RANGE && rangeState.ing) || cell.disabled) return;

        rangeState.endDate = cell.date;
        onMoveRange(rangeState)
    }
    handleDateClick(cell){
        if(cell.isNotClick){
            return;
        }

        let { range, onChange, rangeKey, rangeState, minDate, maxDate } = this.props;

        if(cell.disabled){
            return;
        }

        const min = clearHours(minDate);
        const max = clearHours(maxDate);

        if(range === RANGE){
            if (rangeState.ing) {
                if (cell.date < min) {
                    rangeState.ing = true;
                    onChange({ minDate: cell.date, maxDate: null }, false, rangeKey)
                } else if (cell.date >= min) {
                    rangeState.ing = false;
                    onChange({ minDate, maxDate: cell.date }, true, rangeKey)
                }
            }else {
                if (min && max || !min) {
                    rangeState.ing = true;
                    onChange({ minDate: cell.date, maxDate: null }, false, rangeKey)
                }
            }
            return;
        }

        onChange(cell.date, cell);
    }

    renderHead(head){
        const { mode, langConfig } = this.props;

        if(mode === modes.WEEK){
            head.unshift(' ');
        }

        return (
            <thead key="thead">
                <tr>
                {
                    head.map((item, index) => {
                        return (
                            <th key={index.toString()} title={`周${item}`} className="tv-datepicker-column-header">
                                <span key={index.toString()} className="tv-datepicker-column-header-inner">{langConfig['WeekNum'][index]}</span>
                            </th>
                        )
                    })
                }
                </tr>
            </thead>
        )
    }

    render(){
        const { mode, lang, langConfig } = this.props;
        const isWeek = mode === modes.WEEK;
        const { head, rows } = this.getRow();
        return (
            <table className="tv-datepicker-table" cellSpacing="0" style={this.style()}>
                { this.renderHead(head) }
                <tbody className="tv-datepicker-tbody" key="tbody">
                    {
                        rows.map((row, index) => {
                            const isWeekActive = this.isWeekActive(row[1]);
                            return (
                                <tr key={index.toString()} className={this.className({
                                    'tv-datepicker-active-week': isWeekActive
                                })}>
                                    {
                                        row.map((cell, index2) => {
                                            if(!cell.isThisMonth){
                                                return <td 
                                                key={index2}
                                                className={this.className('tv-datepicker-cell')}>
                                                </td>
                                            }
                                            return (
                                                <td 
                                                key={index2}
                                                onClick={this.handleDateClick.bind(this, cell)}
                                                onMouseMove={this.handleMouseMove.bind(this, cell)}
                                                title={`${cell.year}年${cell.month}月${cell.day}日`} 
                                                className={this.className('tv-datepicker-cell', {
                                                    'tv-datepicker-cell-weeknumber': cell.isWeekNumber,
                                                    'tv-datepicker-cell-selected': !isWeek && (cell.start || cell.end || cell.selected),
                                                    'tv-datepicker-cell-in-range': !isWeek && cell.inRange,
                                                    'tv-datepicker-cell-today': cell.today,
                                                    'tv-datepicker-cell-nonmonth': !cell.isThisMonth,
                                                    'tv-datepicker-cell-disabled': cell.disabled
                                                })}>
                                                    <div key={index2 + index} className="tv-datepicker-date">{cell.text || cell.day}</div>
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
        )
    }

}