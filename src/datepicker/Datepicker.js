import React from 'react';
import { Component, PropTypes, noop, Util } from '@Libs';
import DateTable from './DateTable';
import YearTable from './YearTable';
import MonthTable from './MonthTable';
import Icon from '@icon';
import Button from '@button';
import Popup from '@popup';

const { fixedYM, weekOfYear, parse, format } = Util.date;
/**
 * 单日历
 */
export default class Datepicker extends Component {
    static propTypes = {
        /** 自定义样式 */
        className: PropTypes.string,
        /** 表单name */
        name: PropTypes.string,
        /** 设置日期格式，默认 yyyy-MM-dd */
        format: PropTypes.string,
        /** 事件名：默认click */
        trigger: PropTypes.string,
        /** 日期面板的状态，可以选'day', 'week', 'year', 'month' 或不设，不设时默认 day */
        mode: PropTypes.oneOf(['day', 'week', 'year', 'month']),
        /** 增加自定义拓展，会放在日历面板的左侧。例：[{"text":"按日", onClick: function(index){this.update({mode: 'day'}, index)}},{"text":"按月"},{"selected":true,"text":"按周"},{"text":"按年"}] */
        expand: PropTypes.array,
        /** 默认填充的值 */
        placeholder: PropTypes.string,
        /** 是否禁用 */
        disabled: PropTypes.bool,
        /** 禁用某些规则的日期，该方法可以接收一个日期对象，需要返回true/false */
        disabledDate: PropTypes.func,
        /** 数据变化的回调 */
        onChange: PropTypes.func
    };

    static defaultProps = {
        position: "bottom left",
        mode: 'day',
        trigger: 'click',
        disabledDate: noop
    };

    constructor(props) {
        super(props);
        const date = props.value ? parse(props.value) : parse(format(new Date()));
        this.state = {
            mode: props.mode,
            format: props.format,
            view: 'day',
            date: date,
            currentDateObj: weekOfYear(format(date))
        }
    }

    handlePopupChange = (showPopup) => {
        const { disabled } = this.props;

        if(disabled){
            this.setState({visible: false});
            return;
        }
        if(disabled){
            showPopup = false
        }
        this.setState({visible: showPopup});
    }

    handleDate = (value, obj) => {
        const { onChange, name } = this.props;
        const { mode, view } = this.state;
        if(mode !== 'day'){
            onChange && onChange(obj, name);
        } else {
            onChange && onChange(value, name);
        }
        this.setState({
            visible: view !== 'day',
            view: 'day',
            date: value,
            currentDateObj: obj
        });
    }

    // 上年
    handlePrevYearClick(){
        let { date } = this.state;
        let { year } = weekOfYear(format(date));
        year = year - 1;

        date.setFullYear(year);

        this.setState({
            date
        });
    }

    // 下年
    handleNextYearClick(){
        let { date } = this.state;
        let { year } = weekOfYear(format(date));
        year = year + 1;

        date.setFullYear(year);

        this.setState({
            date
        });
    }

    // 上月
    handlePrevMonthClick(){
        let { date } = this.state;
        const { year, month } = weekOfYear(format(date));
        const array  = fixedYM(year, month - 1);

        date.setFullYear(array[0]);
        date.setMonth(array[1] - 1);

        this.setState({
            date
        });
    }

    // 下月
    handleNextMonthClick(){
        let { date } = this.state;
        const { year, month } = weekOfYear(format(date));
        const array  = fixedYM(year, month + 1);

        date.setFullYear(array[0]);
        date.setMonth(array[1] - 1);

        this.setState({
            date
        });
    }

    showPicker(view) {
        this.setState({
            visible: true,
            view
        })
    }

    update({mode}, index){
        this.setState({
            expandSelectedIndex: index,
            mode,
            view: {
                ['day']: mode === 'day',
                ['year']: mode === 'year',
                ['rightyear']: mode === 'year',
                ['month']: mode === 'month',
                ['week']: mode === 'week'
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

    renderSearch(){
        const { date, view } = this.state;
        const { year, month } = weekOfYear(format(date));
        return (
            <div className={this.className('tv-datepicker-header')}>
                    <div className="tv-datepicker-header-wraper">
                    <a className="tv-datepicker-prev-year-btn" title="上一年" onClick={this.handlePrevYearClick.bind(this)}></a>
                    <a className="tv-datepicker-prev-month-btn" title="上个月" onClick={this.handlePrevMonthClick.bind(this)}></a>
                    <span className="tv-datepicker-ym-select">
                        <a className="tv-datepicker-year-select" title="选择年份" onClick={this.showPicker.bind(this, 'year')}>{year}年</a>
                        <a style={{display: view === 'day' ? '' : 'none'}} className="tv-datepicker-month-select" title="选择月份" onClick={this.showPicker.bind(this, 'month')}>{month}月</a>
                    </span>
                    <a className="tv-datepicker-next-month-btn" title="下个月" onClick={this.handleNextMonthClick.bind(this)}></a>
                    <a className="tv-datepicker-next-year-btn" title="下一年" onClick={this.handleNextYearClick.bind(this)}></a>
                </div>
            </div>
        )
    }

    renderTable(){
        const { disabledDate } = this.props;
        const { mode, date, view } = this.state;

        return [
            <YearTable 
                disabledDate={disabledDate} 
                date={date} 
                onChange={this.handleDate} 
                style={{display: view === 'year' ? '' : 'none'}} />,
            <MonthTable 
                disabledDate={disabledDate} 
                date={date} 
                onChange={this.handleDate} 
                style={{display: view === 'month' ? '' : 'none'}} />,
            <DateTable 
                disabledDate={disabledDate} 
                style={{display: (view !== 'year' &&  view !== 'month') ? '' : 'none'}}
                mode={mode} 
                date={date} 
                onChange={this.handleDate}
            /> 
        ]
    }

    render(){
        const { position, placeholder, footer, children, trigger } = this.props;
        const { disabled, visible, date } = this.state;
        const content = (
            <div className="tv-datepicker">
                { this.renderSearch() }
                <div className={this.className('tv-datepicker-body')}>
                    { this.renderTable() }
                </div>
                {
                    footer && (
                        <div className={this.className('tv-datepicker-footer')}>
                            <div className="tv-datepicker-footer-btn">
                                <a className="tv-datepicker-time-btn">选择时间</a>
                                <a className="tv-datepicker-ok-btn">确 定</a>
                            </div>
                        </div>
                    )
                }
            </div>
        )

        let dateString = date ? format(date, this.state.format) : placeholder;

        return (
            <div className={this.className('tv-datepicker-wraper')}>
                <Popup 
                disabled={disabled}
                showArrow={false} 
                visible={visible} 
                trigger={trigger} 
                position={position} 
                content={content}
                onChange={this.handlePopupChange}
                >
                    {children || <div className="tv-datepicker-trigger">
                        <Button>{dateString}<Icon type="calendar" /></Button>
                    </div>}
                </Popup>
            </div>
        );
    }



}