import React from 'react';
import { Component, PropTypes, noop, Util } from '@Libs';

import DateTable from './DateTable';
import YearTable from './YearTable';
import MonthTable from './MonthTable';
import WeekTable from './WeekTable';

import zhCN from './lang/zh.js';  //导入 中英文配置文件
import enUS from './lang/en.js';
import Icon from '@icon';
import Button from '@button';
import Popup from '@popup';
const langMap = {
    'zh': zhCN,
    'en': enUS
};

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
        /** 日期面板的状态，可以选'day', 'week', 'month', 'season', 'halfofyear', 'year' 或不设，不设时默认 day */
        mode: PropTypes.oneOf(['day', 'week', 'month', 'season', 'halfofyear', 'year']),
        /** 增加自定义拓展，会放在日历面板的左侧。例：[{"text":"按日", onClick: function(index){this.update({mode: 'day'}, index)}},{"text":"按月"},{"selected":true,"text":"按周"},{"text":"按年"}] */
        expand: PropTypes.array,
        /** 默认填充的值 */
        placeholder: PropTypes.string,
        /** 是否禁用 */
        disabled: PropTypes.bool,
        /** 禁用某些规则的日期，该方法可以接收一个日期对象，需要返回true/false */
        disabledDate: PropTypes.func,
        /** 数据变化的回调 */
        onChange: PropTypes.func,
        /**接受语言 zh中文，en英文 默认中文 */
        lang:PropTypes.string
    };

    static defaultProps = {
        position: "bottom left",
        mode: 'day',
        trigger: 'click',
        disabledDate: noop,
        lang:'zh'
    };

    constructor(props) {
        super(props);
        const date = props.value ? parse(props.value) : parse(format(new Date()));
        console.log(date)
        this.state = {
            mode: props.mode,
            format: props.format,
            view: 'day',
            date: date,
            currentDateObj: weekOfYear(format(date)),
            lang:props.lang,
            langConfig:langMap[props.lang]
        }
    }


    onChange = () => {
        const { onChange } = this.props;
        const { date, name, mode, expandSelectedIndex } = this.state;

        if(!maxDate){
            return;
        }

        this.setState({
            changed: true,
            visible: false,
            selected: {
                expandSelectedIndex,
                mode,
                date
            }
        }, () => {
            let _date = date;
            if(mode === 'week'){
                _date = new Date(date.getTime() - (6 * 24 * 60 * 60 * 1000));
            }
            onChange(_date, true, name, mode);
        })
    }

    onReset = () => {
        const propsMode = this.props.mode;
        const { selected: { minDate, maxDate, mode, expandSelectedIndex }, name } = this.state;
        this.setState({
            visible: false,
            ...this.reset(expandSelectedIndex)
        }, () => {
            this.props.onChange([minDate, maxDate], false, name, mode || propsMode);
        });
    }
    getView(mode){
        const view = {};
        ['day', 'week', 'month', 'season', 'halfofyear', 'year'].forEach((key) => {
            view[key] = mode === key;
        })
        return view
    }
    reset(selectedIndex) {
        const props = this.props;
        const state = this.state || {};
        const selected = state.selected || {}
        const mode = selected.mode || props.mode
        const now = new Date();

        const dateStr = selected.date ? format(selected.date) : null;

        let date = parse(dateStr || props.date || format(now));

        let expandIndex;
        (props.expand || []).forEach((item,index) => { item.selected && (expandIndex = index)});
        return {
            expandSelectedIndex: typeof selectedIndex == 'undefined' ? expandIndex : selected.expandSelectedIndex,
            mode,
            format: props.format,
            view: this.getView(mode),
            date: parse(format(date)),
            selected: {
                expandSelectedIndex: selected.expandSelectedIndex,
                mode,
                date: parse(format(selected.date || date)),
            }
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

    setOtherRange(cell, currMode, name, isClose, rangeKey){
        const { mode } = this.state;
        let { date } = cell;
        const view = this.getView(mode);

        if (!isClose){
            this.setState({ 
                visible: true, 
                view, 
                date
            });
            return;
        };

        this.setState({ 
            visible: true, 
            view, 
            date
        });
    }
    handleYearDate = (cell, key, name, isClose) => {
        const { view, mode } = this.state;
        if(mode === 'day' || mode === 'week' || mode === 'month'){
            let date = parse(format(this.state[`date`]));
            let { dirtyYear } = weekOfYear(format(cell));

            date.setFullYear(dirtyYear);
            // 把当前打开的辅助层关掉
            this.setState({
                visible: true, 
                view: {
                    ...view, 
                    [mode]: true
                },
                date
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
            let date = parse(format(this.state[`date`]));
            const { dirtyYear, month } = weekOfYear(format(cell));
            const array  = fixedYM(dirtyYear, month - 1);

            date.setFullYear(array[0]);
            date.setMonth(array[1]);
            return this.setState({
                visible: true, 
                view: {
                    ...view, 
                    [mode]: true
                },
                date
            });
        }
        this.setOtherRange(cell, 'month', name, isClose, rangeKey)
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
            view: this.getView(mode)
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
        const { date, view, langConfig } = this.state;
        const { year, month } = weekOfYear(format(date));
        return (
            <div className={this.className('tv-datepicker-header')}>
                    <div className="tv-datepicker-header-wraper">
                    <a className="tv-datepicker-prev-year-btn" title="上一年" onClick={this.handlePrevYearClick.bind(this)}></a>
                    <a className="tv-datepicker-prev-month-btn" title="上个月" onClick={this.handlePrevMonthClick.bind(this)}></a>
                    <span className="tv-datepicker-ym-select">
                        <a className="tv-datepicker-year-select" title="选择年份" onClick={this.showPicker.bind(this, 'year')}>{year}{langConfig['年']}</a>
                        <a style={{display: view === 'day' ? '' : 'none'}} className="tv-datepicker-month-select" title="选择月份" onClick={this.showPicker.bind(this, 'month')}>{month}{langConfig['月']}</a>
                    </span>
                    <a className="tv-datepicker-next-month-btn" title="下个月" onClick={this.handleNextMonthClick.bind(this)}></a>
                    <a className="tv-datepicker-next-year-btn" title="下一年" onClick={this.handleNextYearClick.bind(this)}></a>
                </div>
            </div>
        )
    }

    renderTable(){
        let { view, mode, lang, langConfig } = this.state;
        let date = this.state[`date`];
        return (
            <div className={this.className('tv-datepicker-body')}>
                <YearTable 
                disabledDate={this.disabledDate} 
                date={date} 
                onChange={this.handleYearDate} 
                lang={lang}
                langConfig={langConfig}
                style={{display: view['year'] ? '' : 'none'}} />

                {mode !== 'year' && <MonthTable 
                    disabledDate={this.disabledDate} 
                    date={date} 
                    onChange={this.handleMonthDate} 
                    lang={lang}
                    langConfig={langConfig}
                    style={{display: (view['month'] && !view['year']) ? '' : 'none'}} />}

                {(mode === 'day' || mode === 'week') && <DateTable 
                    disabledDate={this.disabledDate} 
                    style={{display: (!view['year'] && !view['month']) ? '' : 'none'}}
                    mode={mode}
                    date={date} 
                    lang={lang}
                    langConfig={langConfig}
                    onChange={this.handleDate}
                />}
            </div>
        );
    }
    formatShowContent(date){
        const { mode } = this.state;
        const defaultFormat = {
            'day': 'yyyy-MM-dd',
            'year': 'yyyy',
            'month': 'yyyy-MM'
        }
        
        if(mode === 'week'){
            const _dateStr = format(date);
            const [year] = _dateStr.split(/\W+/);
            const obj = weekOfYear(_dateStr);
            let lang = this.state.lang == 'zh';
            if(lang){
                return `${year}年第${obj.number}周`;
            } else {
                return `${obj.number} week ${year}`;
            }
            
        }

        return format(date, this.state.format || defaultFormat[mode]);
    }
    renderFooterExtra(){
        const { footerExtra } = this.props;
        if(footerExtra){
            return footerExtra();
        }
        if(!this.state.date){
            return null;
        }
        const date = this.formatShowContent(this.state.date);
        return date
    }
    render(){
        const { position, placeholder, footer, children, trigger } = this.props;
        const { disabled, visible, date, langConfig } = this.state;
        const content = [
            <div className="tv-datepicker-wrapper">
                {this.renderExpand()}
                <div className="tv-datepicker">
                    { this.renderSearch() }
                    <div className={this.className('tv-datepicker-body')}>
                        { this.renderTable() }
                    </div>
                </div>
            </div>,
            <div className={this.classNames(['tv-datepicker-footer'])}>
                <div className="tv-datepicker-footer-btn">
                    <div className="tv-datepicker-footer-extra">
                        {this.renderFooterExtra()}
                    </div>
                    <Button size="small" className="tv-datepicker-cancel-btn" onClick={this.onReset}>{langConfig['取 消']}</Button>
                    <Button type="primary" size="small" className="tv-datepicker-ok-btn" onClick={this.onChange}>{langConfig['确 定']}</Button>
                </div>
            </div>
        ]

        let dateString = date ? format(date, this.state.format) : placeholder;

        return (
            <div className={this.className('tv-datepicker-wraper')}>
                <Popup 
                className="tv-datepicker-single-popup"
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