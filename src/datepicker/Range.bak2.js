import React from 'react';
import { Component, PropTypes, noop } from '@Libs';
import DateTable from './DateTable';
import YearTable from './YearTable';
import MonthTable from './MonthTable';
import WeekTable from './WeekTable';
import Button from '@button';
import Popup from '@popup';

import { weekOfYear, parse, fixedYM, format, nextMonth } from './utils';

export default class Range extends Component {
    static propTypes = {
        /** 自定义样式 */
        className: PropTypes.string,
        /** 默认填充的值 */
        placeholder: PropTypes.string,
        /** 设置日期格式，默认 yyyy-MM-dd */
        format: PropTypes.string,
        /** 日期面板的状态，可以选'day', 'week', 'year', 'month' 或不设，不设时默认 day */
        mode: PropTypes.string,
        /** 表单name */
        name: PropTypes.string,
        /** 事件名：默认click */
        trigger: PropTypes.string,
        disabled: PropTypes.bool,
        /** 增加自定义拓展，会放在日历面板的左侧。例：[{"text":"按日", onClick: function(index){this.update({mode: 'day'}, index)}},{"text":"按月"},{"selected":true,"text":"按周"},{"text":"按年"}] */
        expand: PropTypes.array,
        /** 禁用某些规则的日期，该方法可以接收一个日期对象，需要返回true/false */
        disabledDate: PropTypes.func,
        /** 数据变化的回调 */
        onChange: PropTypes.func
    };

    static defaultProps = {
        mode: 'day',
        trigger: 'click',
        position: "bottom left",
        disabledDate: noop,
        onChange: noop
    };

    constructor(props) {
        super(props);
        const now = new Date();

        let left_date = parse(props.minDate || format(now));
        let right_date = parse(props.maxDate || format(now));
        
        this.state = {
            mode: props.mode,
            format: props.format,
            view: {
                ['day']: props.mode === 'day',
                ['leftyear']: props.mode === 'year',
                ['rightyear']: props.mode === 'year',
                ['leftmonth']: props.mode === 'month',
                ['rightmonth']: props.mode === 'month',
                ['leftweek']: props.mode === 'week',
                ['rightweek']: props.mode === 'week'
            },
            left_date: left_date,
            right_date: right_date,
            minDate: parse(format(left_date)),
            maxDate: parse(props.maxDate || format(left_date)),
            selected: {
                minDate: parse(format(left_date)),
                maxDate: parse(props.maxDate || format(left_date)),
            },
            rangeState: {
                endDate: null,
                selecting: false,
            }
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { left_date, right_date, mode, currSelectKey } = prevState;
        const left = format(left_date).split(/\W+/);
        const right = format(right_date).split(/\W+/);
        // 左右时间互换
        // if(left_date > right_date){
        //     return {
        //         left_date: right_date,
        //         right_date: left_date,
        //     }
        // }

        if(mode === 'month'){
            const leftStr = `${parseInt(left[0]) - 1}-${left[1]}-${left[2]}`;
            const rightStr = `${parseInt(right[0]) + 1}-${right[1]}-${right[2]}`;
            if(currSelectKey === 'left' && left[0] === right[0]){
                const rightDate = parse(rightStr);
                return {
                    right_date: rightDate,
                }
            }else if(left[0] === right[0]){
                const leftDate = parse(leftStr);
                return {
                    left_date: leftDate
                }
            }
        }

        const leftStr = `${left[0]}-${left[1]}-${left[2]}`;
        const leftDate = parse(leftStr);
        leftDate.setMonth(left[1] - 2);

        const rightStr = `${right[0]}-${right[1]}-${right[2]}`;
        const rightDate = parse(rightStr);
        rightDate.setMonth(right[1]);

        // 相同年月的视图下，往前挪一月
        if(currSelectKey === 'left' && left[0] === right[0] && left[1] === right[1]){
            return {
                left_date,
                right_date: rightDate
            }
        }else if(left[0] === right[0] && left[1] === right[1]){
            return {
                left_date: leftDate,
                right_date
            }
        }

        return null;
    }

    handlePopupChange = (showPopup) => {
        const { disabled } = this.props;
        const { changed } = this.state;

        if(!changed){
            this.reset();
        }

        if(disabled){
            this.setState({visible: false});
            return;
        }
        if(disabled){
            showPopup = false
        }
        this.setState({visible: showPopup});
    }

    
    handleMoveRange = ({ endDate }) => {
        const { mode } = this.state;
        // if(mode == 'week'){
        //     return;
        // }
        const { rangeState, minDate } = this.state
        if (endDate <= minDate) endDate = null

        rangeState.endDate = endDate
        this.setState({
            maxDate: endDate,
        })
    }

    onChange = () => {
        const { onChange } = this.props;
        const { minDate, maxDate, name } = this.state;
        this.setState({
            changed: true,
            visible: false,
            selected: {
                minDate, maxDate,
            }
        }, () => {
            onChange([minDate, maxDate], false, name);
        })
    }

    reset = () => {
        const { onChange } = this.props;
        const { selected: { minDate, maxDate }, name } = this.state;
        this.setState({
            changed: false,
            visible: false,
            [`left_date`]: minDate, 
            [`right_date`]: maxDate,
            minDate, maxDate,
            selected: {
                minDate, maxDate
            }
        }, () => {
            onChange([minDate, maxDate], false, name);
        })
    }
    handleDate = ({ minDate, maxDate }, isClose, rangeKey) => {
        const { onChange, name, mode } = this.props;
        minDate = parse(format(minDate || this.state['left_date']));
        let max = maxDate ? parse(format(maxDate)): this.state['right_date'];
        const otherKey = rangeKey === 'left' ? 'right' : 'left';
        if (!isClose){
            this.setState({ 
                currSelectKey: rangeKey,
                visible: true, 
                view: {[mode]: true},
                minDate, 
                maxDate: null, 
                [`${rangeKey}_date`]: minDate,
                [`${otherKey}_date`]: max
            });
            return;
        };
        this.setState({ 
            currSelectKey: rangeKey,
            visible: true, 
            view: {[mode]: true}, 
            minDate, 
            maxDate, 
            left_date: minDate
            , right_date: maxDate,
            rangeState: {
                endDate: null,
                selecting: false,
            }
        });
        
    }
    setOtherRange(cell, currMode, name, isClose, rangeKey){
        const { view, mode } = this.state;
        let { minDate, maxDate } = cell;
        minDate = parse(format(minDate));
        maxDate = maxDate ? parse(format(maxDate)) : null;
        const otherKey = rangeKey === 'left' ? 'right' : 'left';

        if (!isClose){
            this.setState({ 
                currSelectKey: rangeKey,
                visible: true, view: mode === currMode ? view : {...view, 'day': true}, 
                minDate, 
                maxDate, 
                [`${rangeKey}_date`]: minDate
            });
            return;
        };
        this.setState({ 
            visible: true, 
            currSelectKey: rangeKey,
            view: mode === currMode ? view : {...view, 'day': true}, 
            minDate, maxDate, 
            [`${rangeKey}_date`]: minDate,
            [`${otherKey}_date`]: maxDate,
            rangeState: {
                endDate: null,
                selecting: false,
            }
        });
    }
    handleYearDate = (cell, key, name, isClose) => {
        const { view, mode } = this.state;
        if(mode === 'day' || mode === 'week' || mode === 'month'){
            let date = parse(format(this.state[`${key}_date`]));
            let { year } = weekOfYear(format(cell));

            date.setFullYear(year);
            // 把当前打开的辅助层关掉
            this.setState({
                visible: true, 
                view: {...view, [`${key}year`]: false, [mode]: true},
                [`${key}_date`]: date
            });
            return;
        }

        this.setOtherRange(cell, 'month', name, isClose, key)
    }
    handleWeekDate = (cell, rangeKey, name, isClose) => {
        this.setOtherRange(cell, 'month', name, isClose, rangeKey)
    }
    handleMonthDate = (cell, rangeKey, name, isClose) => {
        const { view, mode } = this.state;

        if(mode === 'day' || mode === 'week'){
            let date = parse(format(this.state[`${rangeKey}_date`]));
            const { year, month } = weekOfYear(format(cell));
            const array  = fixedYM(year, month - 1);

            date.setFullYear(array[0]);
            date.setMonth(array[1]);
            return this.setState({
                visible: true, 
                view: {...view, [`${rangeKey}month`]: false, [mode]: true},
                [`${rangeKey}_date`]: date
            });
        }
        this.setOtherRange(cell, 'month', name, isClose, rangeKey)
    }
    // 上年
    handlePrevYearClick(key){
        let date = parse(format(this.state[`${key}_date`]));

        let { year } = weekOfYear(format(date));
        year = year - 1;

        date.setFullYear(year);

        this.setState({
            [`${key}_date`]: date
        });
    }

    // 下年
    handleNextYearClick(key){
        let date = parse(format(this.state[`${key}_date`]));
        let { year } = weekOfYear(format(date));
        year = year + 1;

        date.setFullYear(year);

        this.setState({
            [`${key}_date`]: date
        });
    }

    // 上月
    handlePrevMonthClick(key){
        let date = parse(format(this.state[`${key}_date`]));
        const { year, month } = weekOfYear(format(date));
        const array  = fixedYM(year, month - 1);

        date.setFullYear(array[0]);
        date.setMonth(array[1] - 1);

        this.setState({
            [`${key}_date`]: date
        });
    }

    // 下月
    handleNextMonthClick(key){
        let date = parse(format(this.state[`${key}_date`]));
        const { year, month } = weekOfYear(format(date));
        const array  = fixedYM(year, month + 1);

        date.setFullYear(array[0]);
        date.setMonth(array[1] - 1);

        this.setState({
            [`${key}_date`]: date
        });
    }

    showYearPicker(key){
        const { view } = this.state;
        this.setState({
            visible: true, 
            view: {...view, [key + 'year']: true}
        })
    }

    showMonthPicker(key){
        const { view } = this.state;
        this.setState({
            visible: true, 
            view: {...view, [key + 'month']: true}
        })
    }

    disabledDate = (value, key) => {
        let { view, mode } = this.state;
        let { disabledDate } = this.props;

        const otherKey = key === 'left' ? 'right' : 'left';
        const otherDate = this.state[`${otherKey}_date`];

        let dateObj = weekOfYear(format(value));
        let otherDateObj = weekOfYear(format(otherDate));
        // 月视图下是不允许同一年选择的
        if(view[`${key}year`] && mode === 'month'){
            if(key === 'left' && dateObj.year < otherDateObj.year){
                return false
            }
            if( key === 'right' && otherDateObj.year < dateObj.year){
                return false
            }
            return true;
        }
        // 周视图和日视图支持同一年
        if(mode !== 'year' && view[`${key}year`] && mode !== 'month'){
            if(key === 'left' && dateObj.year <= otherDateObj.year){
                return false
            }
            if( key === 'right' && otherDateObj.year <= dateObj.year){
                return false
            }
            return true;
        }

        const dateObjMonth = parse(`${dateObj.year}-${dateObj.month}-01`);
        const otherDateObjMonth = parse(`${otherDateObj.year}-${otherDateObj.month}-01`);

        if(mode !== 'month' && view[`${key}month`]){
            if(key === 'left'){
                if(dateObjMonth < otherDateObjMonth){
                    return false
                }
            } else {
                if(otherDateObjMonth < dateObjMonth){
                    return false
                }
            }
    
            return true;
        }
        return disabledDate(value);
    }

    renderSearch(key){
        const { view, mode } = this.state;
        let date = this.state[`${key}_date`];
        let { year, month } = weekOfYear(format(date));
        const array = fixedYM(year, month);

        const isHideRight = key === 'left';
        const isHideLeft = key === 'right';
        const isHideMonth = !view[`${key}year`];

        return (
            <div className={this.className('tv-datepicker-header')}>
                <div className="tv-datepicker-header-wraper">
                    {!isHideLeft && <a className="tv-datepicker-prev-year-btn" title="上一年" onClick={this.handlePrevYearClick.bind(this, key)}></a>}
                    {(!isHideLeft && isHideMonth) && <a className="tv-datepicker-prev-month-btn" title="上个月" onClick={this.handlePrevMonthClick.bind(this, key)}></a>}
                    <span className="tv-datepicker-ym-select">
                        <a className="tv-datepicker-year-select" title="选择年份" onClick={this.showYearPicker.bind(this, key)}>{array[0]}年</a>
                        <a style={{display: (!view[key + 'year'] && !view[key + 'month']) ? '' : 'none'}} className="tv-datepicker-month-select" title="选择月份" onClick={this.showMonthPicker.bind(this, key)}>{array[1]}月</a>
                    </span>
                    {(!isHideRight && isHideMonth) && <a className="tv-datepicker-next-month-btn" title="下个月" onClick={this.handleNextMonthClick.bind(this, key)}></a>}
                    {!isHideRight && <a className="tv-datepicker-next-year-btn" title="下一年" onClick={this.handleNextYearClick.bind(this, key)}></a>}
                </div>
            </div>
        )
    }

    isSigle(){
        let { mode } = this.state;
        if(mode === 'day' || mode === 'week'){
            return 'sigle';
        }
        return 'range'
    }

    renderTable(key){
        let rangeMode = 'range';
        let { view, rangeState, minDate, maxDate, mode } = this.state;
        let date = this.state[`${key}_date`];
        const monthMode = this.isSigle();
        const yearMode = mode !== 'year' ? 'sigle' : rangeMode;
        return (
            <div className={this.className('tv-datepicker-body')}>
                <YearTable 
                range={yearMode}
                rangeState={rangeState}
                minDate={minDate}
                maxDate={maxDate}
                disabledDate={this.disabledDate} 
                rangeKey={key} 
                date={date} 
                onChange={this.handleYearDate} 
                style={{display: view[key + 'year'] ? '' : 'none'}} />

                {mode !== 'year' && <MonthTable 
                    range={monthMode}
                    rangeState={rangeState}
                    minDate={minDate}
                    maxDate={maxDate}
                    disabledDate={this.disabledDate} 
                    rangeKey={key} 
                    date={date} 
                    onChange={this.handleMonthDate} 
                    onMoveRange={this.handleMoveRange}
                    style={{display: (view[key + 'month'] && !view[key + 'year']) ? '' : 'none'}} />}

                {mode === 'week' && <WeekTable 
                    disabledDate={this.disabledDate} 
                    style={{display: (!view[key + 'year'] && !view[key + 'month']) ? '' : 'none'}}
                    rangeKey={key}
                    mode={mode}
                    range={rangeMode} rangeState={rangeState} 
                    date={date} 
                    minDate={minDate}
                    maxDate={maxDate}
                    onMoveRange={this.handleMoveRange}
                    onChange={this.handleWeekDate}
                />}

                {mode === 'day' && <DateTable 
                    disabledDate={this.disabledDate} 
                    style={{display: (!view[key + 'year'] && !view[key + 'month']) ? '' : 'none'}}
                    rangeKey={key}
                    mode={mode}
                    range={rangeMode} rangeState={rangeState} 
                    date={date} 
                    minDate={minDate}
                    maxDate={maxDate}
                    onMoveRange={this.handleMoveRange}
                    onChange={this.handleDate}
                />}
            </div>
        );
    }
    update({mode}, index){
        const { selected: { minDate, maxDate } } = this.state;
        this.setState({
            expandSelectedIndex: index,
            mode,
            view: {
                ['day']: mode === 'day',
                ['leftyear']: mode === 'year',
                ['rightyear']: mode === 'year',
                ['leftmonth']: mode === 'month',
                ['rightmonth']: mode === 'month',
                ['leftweek']: mode === 'week',
                ['rightweek']: mode === 'week'
            },
            [`left_date`]: minDate, 
            [`right_date`]: maxDate,
            minDate, maxDate,
            selected: {
                minDate, maxDate
            }
        })
    }
    renderExpand(){
        const { expand } = this.props;
        let { expandSelectedIndex } = this.state;
        if(!expand){
            return null;
        }
        return (
            <div className="tv-datepicker-expand">
                {expand.map((item, index) => {
                    const {text, onClick, ...other} = item;
                    const isSelected = typeof expandSelectedIndex === 'undefined' ? item.selected : index === expandSelectedIndex;
                    return <Button className={this.className({
                        'tv-datepicker-expand-selected': isSelected
                    })} {...other} onClick={onClick.bind(this, index)}>{text}</Button>
                })}
            </div>
        )
    }

    formatShowContent(date){
        const { mode } = this.state;
        const defaultFormat = {
            'day': 'yyyy-MM-dd',
            'year': 'yyyy',
            'month': 'yyyy-MM'
        }
        
        if(mode === 'week'){
            const obj = weekOfYear(format(date));
            return `${obj.year}年第${obj.number}周`;
        }

        return format(date, this.state.format || defaultFormat[mode]);
    }

    render(){
        const { position, placeholder, footer, children, trigger } = this.props;
        const { disabled, visible, selected } = this.state;
        const { minDate, maxDate } = selected;

        const content = [
            (
                <div className={this.classNames(['tv-datepicker-range'])}>
                    {this.renderExpand()}
                    {
                        ['left', 'right'] .map((key) => {
                            return (
                                <div key={key} className={this.classNames(['tv-datepicker'])}>
                                    { this.renderSearch(key) }
                                    { this.renderTable(key) }
                                </div>
                            )
                        })
                    }
                </div>
            ),
            <div className={this.classNames(['tv-datepicker-footer'])}>
                <div className="tv-datepicker-footer-btn">
                    <Button size="small" className="tv-datepicker-cancel-btn" onClick={this.reset}>取 消</Button>
                    <Button type="primary" size="small" className="tv-datepicker-ok-btn" onClick={this.onChange}>确 定</Button>
                </div>
            </div>
        ];

        // 防止反向控制的问题
        let min = minDate;
        let max = maxDate;
        if(min > max){
            min = maxDate;
            max = minDate;
        }

        min = min ? this.formatShowContent(min) : null;
        max = max ? this.formatShowContent(max) : null;

        return (
            <div className={this.className('tv-datepicker-wraper')}>
                <Popup 
                className="tv-datepicker-range-popup"
                disabled={disabled}
                showArrow={false} 
                visible={visible} 
                trigger={trigger} 
                position={position} 
                content={content}
                onChange={this.handlePopupChange}
                >
                    {children || <div className="tv-datepicker-trigger">
                        <Button>{ min && max ? `${min} ~ ${max}` : placeholder}</Button>
                    </div>}
                </Popup>
            </div>
        );
    }
}