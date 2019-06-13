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

    getRowsDays(){
        const { date, disabledDate, rangeKey } = this.props
        const { year, month } = weekOfYear(format(date));

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
                year,
                selected: month === value,
                disabled: disabledDate(_date, rangeKey),
                date: _date,
                month: value,
                text: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'][i] + '月'
            });
        }
        return monthTables;
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
            <table className="tv-datepicker-month-table" style={this.style()}>
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