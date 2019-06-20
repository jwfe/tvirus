import React from 'react';
import { Component, PropTypes, noop, Util } from '@Libs';

const { getMonthDaysArray, weekOfYear, parse, format } = Util.date;
const clearHours = function (time) {
    const cloneDate = new Date(time);
    cloneDate.setHours(0, 0, 0, 0);
    return cloneDate.getTime();
};

const modes = {
    WEEK: 'week',
    YEAR: 'year',
    MONTH: 'month',
    DAY: 'day'
}

const RANGE = 'range';

export default class WeekTable extends Component {
    static propTypes = {
        /** 自定义样式 */
        className: PropTypes.string,
        key: PropTypes.string,
        date: PropTypes.instanceOf(Date),
        disabledDate: PropTypes.func,
        onChange: PropTypes.func
    };

    static defaultProps = {
        disabled: false,
        disabledDate: noop
    };

    constructor(props) {
        super(props);
    }
    objToDateStr(obj){
        return `${obj.year}-${obj.month}-${obj.day}`
    }
    objToDate(obj){
        return parse(this.objToDateStr(obj))
    }

    isSelected(cell){
        const { rangeKey, maxDate, range, minDate } = this.props;
        if(range !== RANGE){
            return cell.week === weekOfYear(format(date)).number;
        }
        if(rangeKey === 'left'){
            return cell.week === weekOfYear(format(minDate)).number; 
        }
        return maxDate && cell.week === weekOfYear(format(maxDate)).number; 
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

            dateObj.selected = this.isSelected(dateObj);

            rows[rowIndex].push(dateObj);
        });

        return { head, rows };
    }

    getRow(){
        let {showWeekNumber, minDate, range, rangeState} = this.props;

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
            }
        }

        return { head, rows };
    }

    handleClick(cell){
        let { range, onChange, rangeKey, name, rangeState, minDate, maxDate } = this.props;

        if(cell.disabled){
            return;
        }

        const min = clearHours(minDate);
        const max = clearHours(maxDate);

        if(range === 'range'){
            if (rangeState.ing) {
                if (cell.date < min) {
                    rangeState.ing = true;
                    onChange({ minDate: cell.date, maxDate: null }, rangeKey, name, false)
                } else if (cell.date >= min) {
                    rangeState.ing = false;
                    onChange({ minDate, maxDate: cell.date }, rangeKey, name, true)
                }
            }else {
                if (min && max || !min) {
                    rangeState.ing = true;
                    onChange({ minDate: cell.date, maxDate: null }, rangeKey, name, false)
                }
            }
            return;
        }

        onChange(cell.date, rangeKey, name);
    }

    getEnabled(row){
        let temp;
        row.forEach((item) => {
            if(!item.disabled){
                temp = item;
            }
        })
        return temp;
    }

    handleMouseMove(cell){
        const { onMoveRange, rangeState, range } = this.props;

        if (!(range === RANGE && rangeState.ing) || cell.disabled) return;

        rangeState.endDate = cell.date;
        onMoveRange(rangeState)
    }

    render(){
        const { rows } = this.getRow();

        return (
            <div className={this.className('tv-datepicker-week-table')} style={this.style()}>
                {
                    rows.map((row) => {
                        const data = this.getEnabled(row);
                        return (
                            <div className={this.classNames(['tv-datepicker-week-item', {
                                'isDisabled': data.disabled,
                                'inRange': data.inRange,
                                'isSelected': data.selected
                            }])} 
                            onMouseMove={this.handleMouseMove.bind(this, data)}
                            onClick={this.handleClick.bind(this, data)}
                            >
                                第{data.week}周{row[0].dateString} ~ {row[6].dateString}
                            </div>
                        )
                    })
                }
            </div>
        )
    }

}