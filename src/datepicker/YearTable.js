import React from 'react';
import { Component, PropTypes, noop, Util } from '@Libs';
const { fixedYM, weekOfYear, parse, format } = Util.date;
const clearHours = function (time) {
    const cloneDate = new Date(time);
    cloneDate.setHours(0, 0, 0, 0);
    return cloneDate.getTime();
};
export default class DateTable extends Component {
    static propTypes = {
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

    getRowsDays(){
        const { date, disabledDate, rangeKey } = this.props

        const yearTables = [];
        const { year } = weekOfYear(format(date));

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

            const time = date.getTime();
            const _date = new Date(time);
            _date.setFullYear(value);
            _date.setMonth(1);
            _date.setDate(1);

            yearTables[rowIndex].push({
                selected: Number(value) === Number(year),
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
                                                    'tv-datepicker-cell-nonmonth': !cell.isThisMonth,
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