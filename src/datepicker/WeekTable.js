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
            const _date = weekOfYear(format(date));
            return cell.year === _date.year && cell.week === _date.number;
        }
        const min = weekOfYear(format(minDate));
        const max = maxDate ? weekOfYear(format(maxDate)) : {};
        if( (cell.week === min.number && cell.year === min.year) 
        || (max && cell.week === max.number && cell.year === max.year) ){
            return true
        }
        return false; 
    }

    getRowsDays(){
        let { date, disabledDate, showWeekNumber, minDate, maxDate, range } = this.props;
        const min = clearHours(minDate);
        const max = clearHours(maxDate);

        const dateArray = getMonthDaysArray(date);
        // 处理第一周逻辑
        if (dateArray[0].year < dateArray[1].year) {
            dateArray[0].year = dateArray[1].year;
            dateArray[0].month = 1;
            dateArray[0].day = 1;
        }
        
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
            if(range === RANGE){
                dateObj.inRange = time >= min && time <= max;
            }
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

    handleClick(minCell, maxCell){
        let { range, onChange, rangeKey, name, rangeState, minDate, maxDate } = this.props;

        if(maxCell.disabled){
            return;
        }

        const min = clearHours(minDate);
        const max = clearHours(maxDate);

        if(range === 'range'){
            if (rangeState.ing) {
                if (minCell < min) {
                    rangeState.ing = true;
                    onChange({ minDate: minCell, maxDate: null }, rangeKey, name, false)
                } else if (maxCell >= min) {
                    rangeState.ing = false;
                    onChange({ minDate, maxDate: maxCell }, rangeKey, name, true)
                }
            }else {
                if (min && max || !min) {
                    rangeState.ing = true;
                    onChange({ minDate: minCell, maxDate: null }, rangeKey, name, false)
                }
            }
            return;
        }
    }

    handleMouseMove(cell){
        const { onMoveRange, rangeState, range } = this.props;

        if (!(range === RANGE && rangeState.ing) || cell.disabled) return;

        rangeState.endDate = cell.date;
        onMoveRange(rangeState)
    }

    render(){
        const { rows } = this.getRow();

        const { lang, langConfig } = this.props;
        return (
            <div className={this.className('tv-datepicker-week-table')} style={this.style()}>
                {
                    rows.map((row, index) => {
                        const data = row[0];
                        const first = format(row[0].date, 'yyyy-MM-dd');
                        const last = format(row[6].date, 'yyyy-MM-dd');
                        let text = `第${data.week}周${first} ~ ${last}`
                        if(lang == 'en'){
                            text = `${data.week} week ${first} ~ ${last}`
                        }
                        return (
                            <div key={index} className={this.classNames(['tv-datepicker-week-item', {
                                'isDisabled': data.disabled,
                                'inRange': data.inRange,
                                'isSelected': data.selected
                            }])} 
                            onMouseMove={this.handleMouseMove.bind(this, data)}
                            onClick={this.handleClick.bind(this, row[6].date, row[6].date)}
                            >
                            {text}
                            </div>
                        )
                    })
                }
            </div>
        )
    }

}