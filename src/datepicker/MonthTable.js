import React from 'react';
import { Component, PropTypes, noop, Util } from '@Libs';

const { fixedYM, weekOfYear, parse, format } = Util.date;
const clearHours = function (time) {
    const cloneDate = new Date(time);
    cloneDate.setDate(1);
    cloneDate.setHours(0, 0, 0, 0);
    return cloneDate.getTime();
};
const RANGE = 'range';

export default class MonthTable extends Component {
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

    getDate(year, month){
        return parse(`${year}-${month}-01`)
    }

    isSelected(d){
        const { range, rangeKey, maxDate, minDate, date } = this.props;
        if(range !== RANGE){
            return clearHours(d) === clearHours(date);
        }

        const min = format(minDate);
        const max = maxDate ? format(maxDate) : null;

        if(clearHours(d) === clearHours(parse(min)) || (maxDate && clearHours(d) === clearHours(parse(max)))){
            return true;
        }
        return false;
    }

    getRowsDays(){
        const { date, disabledDate, rangeKey, minDate, maxDate, range } = this.props
        const { year, month } = weekOfYear(format(date));

        const min = clearHours(minDate);
        const max = clearHours(maxDate);

        const monthTables = [];

        for(let i=0; i<12; i++){
            const rowIndex = Math.floor(i/3);
            const value =  i + 1;
            if(i%3 === 0){
                monthTables.push([]);
            }

            const time = date.getTime();
            const _date = new Date(time);
            _date.setMonth(value - 1);
            _date.setDate(1);

            monthTables[rowIndex].push({
                inRange: range !== RANGE ? false : (_date >= min && _date <= max),
                year,
                selected: this.isSelected(_date),
                disabled: disabledDate(_date, rangeKey),
                date: _date,
                month: value,
                text: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'][i] + '月'
            });
        }
        return monthTables;
    }

    getRow(){
        let {showWeekNumber, minDate, range, rangeState} = this.props;

        const rows = this.getRowsDays();
        if (!(range === RANGE && rangeState.ing && rangeState.endDate)) {
            return rows;
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

        return rows;
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

    handleMouseMove(cell){
        const { onMoveRange, rangeState, range } = this.props;

        if (!(range === RANGE && rangeState.ing) || cell.disabled) return;

        rangeState.endDate = cell.date;
        onMoveRange(rangeState)
    }

    render(){
        return (
            <table className="tv-datepicker-month-table" style={this.style()}>
                <tbody>
                {
                    this.getRow().map((row, index) => {
                        return (
                            <tr key={index}>
                                {
                                    row.map((cell, index2) => {
                                        return (
                                            <td 
                                            key={index2}
                                            onMouseMove={this.handleMouseMove.bind(this, cell)}
                                            onClick={this.handleClick.bind(this, cell)}
                                            title={`${cell.year}年`} 
                                            className={this.className('tv-datepicker-cell', {
                                                'tv-datepicker-cell-in-range': cell.inRange,
                                                'tv-datepicker-cell-selected': cell.selected,
                                                'tv-datepicker-cell-disabled': cell.disabled
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
        )
    }

}