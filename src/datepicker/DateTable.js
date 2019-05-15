import React from 'react';
import { Component, PropTypes, noop, Util } from '@Libs';
const { getMonthDaysArray, weekOfYear, parse, format } = Util.date;

const modes = {
    WEEK: 'week',
    YEAR: 'year',
    MONTH: 'month',
    DAY: 'day',
    RANGE: 'range'
}

const DAY_DURATION = 86400000;

const clearHours = function (time) {
    const cloneDate = new Date(time);
    cloneDate.setHours(0, 0, 0, 0);
    return cloneDate.getTime();
};

export default class DateTable extends Component {
    static propTypes = {
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
        const { mode, date } = this.props
        if(mode !== modes.DAY || !date){
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
        let { date, disabledDate, showWeekNumber, minDate, maxDate, mode } = this.props;
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
                dateObj.text = '今天'
            }

            const time = clearHours(dateObj.date);

            dateObj.inRange = time >= min && time <= max;
            dateObj.start = min && time === min;
            dateObj.end = max && time === max;

            // 周视图下第一列展示对应的周
            if(mode === modes.WEEK && index%7 === 0 && showWeekNumber){
                const obj = JSON.parse(JSON.stringify(dateObj));
                obj.text = obj.week;
                rows[rowIndex].push(obj);
            }

            rows[rowIndex].push(dateObj);
        });

        return { head, rows };
    }

    getRow(){
        let {showWeekNumber, minDate, mode, rangeState} = this.props;

        const { head, rows } = this.getRowsDays();
        if (!(mode === modes.RANGE && rangeState.ing && rangeState.endDate)) {
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
            }
        }

        return { head, rows };
    }

    isWeekActive(cell){
        const { mode, value } = this.props;
        if(mode !== modes.WEEK){
            return false;
        }

        return cell.week === weekOfYear(format(value)).number;
    }
    handleMouseMove(cell){
        const { onMoveRange, rangeState, mode, disabledDate } = this.props;

        if (!(mode === modes.RANGE && rangeState.ing) || cell.disabled) return;

        rangeState.endDate = cell.date;
        onMoveRange(rangeState)
    }
    handleDateClick(cell){
        let { mode, onChange, rangeState, minDate, maxDate, disabledDate } = this.props;

        if(cell.disabled){
            return;
        }

        const min = clearHours(minDate);
        const max = clearHours(maxDate);

        if(mode === modes.RANGE){
            if (rangeState.ing) {
                if (cell.date < min) {
                    rangeState.ing = true;
                    onChange({ minDate: cell.date, maxDate: null }, false)
                } else if (cell.date >= min) {
                    rangeState.ing = false;
                    onChange({ minDate, maxDate: cell.date }, true)
                }
            }else {
                if (min && max || !min) {
                    rangeState.ing = true;
                    onChange({ minDate: cell.date, maxDate: null }, false)
                }
            }
            return;
        }

        onChange(cell.date);
    }

    renderHead(head){
        const { mode } = this.props;

        if(mode === modes.WEEK){
            head.push('');
        }

        return (
            <thead>
                {
                    head.map((item) => {
                        return (
                            <th title={`周${item}`} className="tv-datepicker-column-header">
                                <span className="tv-datepicker-column-header-inner">{item}</span>
                            </th>
                        )
                    })
                }
            </thead>
        )
    }

    renderBody(rows){
        return (
            <tbody className="tv-datepicker-tbody">
            {
                rows.map((row) => {
                    const isWeekActive = this.isWeekActive(row[1]);
                    return (
                        <tr className={this.className({
                            'tv-datepicker-active-week': isWeekActive
                        })}>
                            {
                                row.map((cell) => {
                                    return (
                                        <td 
                                        onClick={this.handleDateClick.bind(this, cell)}
                                        onMouseMove={this.handleMouseMove.bind(this, cell)}
                                        title={`${cell.year}年${cell.month}月${cell.day}日`} 
                                        className={this.className('tv-datepicker-cell', {
                                            'tv-datepicker-cell-selected': cell.start || cell.end || cell.selected,
                                            'tv-datepicker-cell-in-range': cell.inRange,
                                            'tv-datepicker-cell-today': cell.today,
                                            'tv-datepicker-cell-nonmonth': !cell.isThisMonth,
                                            'tv-datepicker-cell-disabled': cell.disabled
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
        )
    }

    render(){
        const { head, rows } = this.getRow();
        return (
            <table className="tv-datepicker-table" cellspacing="0" style={this.style()}>
                { this.renderHead(head) }
                { this.renderBody(rows) }                        
            </table>
        )
    }

}