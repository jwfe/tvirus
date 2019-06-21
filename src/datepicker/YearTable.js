import React from 'react';
import { Component, PropTypes, noop, Util } from '@Libs';
const { fixedYM, weekOfYear, parse, format } = Util.date;
const clearHours = function (time) {
    const cloneDate = new Date(time);
    cloneDate.setMonth(0);
    cloneDate.setDate(1);
    cloneDate.setHours(0, 0, 0, 0);
    return cloneDate.getTime();
};

const RANGE = 'range';

export default class YearTable extends Component {
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

    isSelected(d){
        const { range, rangeKey, maxDate, minDate, date } = this.props;
        if(range !== RANGE){
            return clearHours(d) === clearHours(date);
        }

        if(rangeKey === 'left'){
            return clearHours(d) === clearHours(format(minDate)); 
        }
        return maxDate && clearHours(d) === clearHours(format(maxDate)); ; 
    }

    getRowsDays(){
        const { date, disabledDate, rangeKey } = this.props

        const yearTables = [];
        const { year } = weekOfYear(format(date));

        const yearArray = [];
        const f = (year.toString()).substring(0, 3);
        const firstYear = f + '0';
        for(let i=0; i<10; i++){
            yearArray.push(parseInt(firstYear) + i);
        }

        yearArray.unshift(yearArray[0] - 1);
        yearArray.push(yearArray[10] + 1);

        for(let i=0; i<12; i++){
            const rowIndex = Math.floor(i/3);
            let value =  yearArray[i];
            if(i%3 === 0){
                yearTables.push([]);
            }

            const time = date.getTime();
            const _date = new Date(time);
            _date.setFullYear(value);
            _date.setMonth(1);
            _date.setDate(1);

            yearTables[rowIndex].push({
                nonmonth: i === 0 || i === 11,
                selected: this.isSelected(_date),
                disabled: disabledDate(_date, rangeKey),
                year: value,
                date: _date,
                text: value + '年'
            });
        }
        return yearTables;
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

    render(){
        return (
            <table className="tv-datepicker-year-table" style={this.style()}>
                <tbody>
                    {
                        this.getRowsDays().map((row, index) => {
                            return (
                                <tr key={index}>
                                    {
                                        row.map((cell, index2) => {
                                            return (
                                                <td 
                                                key={index2}
                                                onClick={this.handleClick.bind(this, cell)}
                                                title={`${cell.year}年`} 
                                                className={this.className('tv-datepicker-cell', {
                                                    'tv-datepicker-cell-selected': cell.selected,
                                                    'tv-datepicker-cell-today': cell.today,
                                                    'tv-datepicker-cell-nonmonth': cell.nonmonth,
                                                    'tv-datepicker-cell-disabled': cell.disabled
                                                })}>
                                                    <div key={index2} className="tv-datepicker-date">{cell.text}</div>
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