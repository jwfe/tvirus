import React from 'react';
import { Component, PropTypes, noop, Util } from '@Libs';
const { fixedYM, weekOfYear, parse, format } = Util.date;

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
        const { date, disabledDate } = this.props

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

            yearTables[rowIndex].push({
                selected: Number(value) === Number(year),
                disabled: disabledDate(value),
                year: value,
                date: _date,
                text: value + '年'
            });
        }
        return yearTables;
    }

    handleClick(cell){
        const { onChange, rangeKey, name } = this.props
        onChange(cell.date, rangeKey, name);
    }

    render(){
        return (
            <table className="tv-datepicker-year-table" style={this.style()}>
            {
                this.getRowsDays().map((row) => {
                    return (
                        <tr>
                            {
                                row.map((cell) => {
                                    return (
                                        <td 
                                        onClick={this.handleClick.bind(this, cell)}
                                        title={`${cell.year}年`} 
                                        className={this.className('tv-datepicker-cell', {
                                            'tv-datepicker-cell-selected-day': cell.selected,
                                            'tv-datepicker-cell-today-day': cell.today,
                                            'tv-datepicker-cell-nonmonth-day': !cell.isThisMonth,
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
        </table>
        )
    }

}