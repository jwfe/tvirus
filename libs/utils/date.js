export const weekObj = {
    "en": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    "zh": ['日', '一', '二', '三', '四', '五', '六']
}
/**
 * 是否日期
 * @module utils/date
 * @param {Date} dirtyDate 日期对象
 * @returns {Boolean} 是否日期类型
 */
export const is = (dirtyDate) => {
    return Object.prototype.toString.call(dirtyDate) === '[object Date]';
}
/**
 * 日期格式化
 * @module utils/date
 * @param {Date} dirtyDate 日期对象
 * @param {String} dirtyFormatStr 格式化字符串
 * @returns {String} 格式化后的日期字符串
 */
export const format = (dirtyDate, dirtyFormatStr = 'yyyy-MM-dd') => {
    const o = {
        'M+': dirtyDate.getMonth() + 1,
        'd+': dirtyDate.getDate(),
        'h+': dirtyDate.getHours(),
        'm+': dirtyDate.getMinutes(),
        's+': dirtyDate.getSeconds(),
        'q+': Math.floor((dirtyDate.getMonth() + 3) / 3),
        'S': dirtyDate.getMilliseconds()
    };

    if (/(y+)/.test(dirtyFormatStr)) {
        dirtyFormatStr = dirtyFormatStr.replace(RegExp.$1, (dirtyDate.getFullYear() + '').substr(4
            - RegExp.$1.length));
    }

    for (let k in o) {
        if (new RegExp('(' + k + ')').test(dirtyFormatStr)) {
            dirtyFormatStr = dirtyFormatStr.replace(RegExp.$1, RegExp.$1.length == 1
                ? o[k]
                : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    return dirtyFormatStr;
}
/**
 * 日期字符串转为日期对象
 * @module utils/date
 * @param {String} dirtyDateString 日期字符串
 * @returns {Date} 格式化后的日期对象
 */
export const parse = (dirtyDateString) => {
    const isoExp = /^\s*(\d{4})[-\/\u4e00-\u9fa5](\d\d?)[-\/\u4e00-\u9fa5](\d\d?)[\u4e00-\u9fa5]?\s*$/;
    const dateObj = new Date();
    let month;
    const parts = isoExp.exec(dirtyDateString);
    if (parts) {
        month = +parts[2];
        dateObj.setFullYear(parts[1], month - 1, parts[3]);
        dateObj.setHours(0, 0, 0, 0);
        if (month != dateObj.getMonth() + 1) {
            dateObj.setTime(NaN);
        }
    }
    return dateObj;
}

/**
 * 日期对比毫秒数
 * @module utils/date
 * @param {String|Date|Number} start 开始日期
 * @param {String|Date|Number} end 结束日期
 * @returns {Number} 对比的毫秒数
 */
export const differenceInMilliseconds = (start, end) => {
    if(typeof start === 'string' && typeof end === 'string'){
        start = new Date(start).getTime();
        end = new Date(end).getTime();
    }

    if(is(start) && is(end)){
        start = start.getTime();
        end = end.getTime();
    }
    return end - start;
}

/**
 * 日期对比天数
 * @module utils/date
 * @param {String|Date|Number} start 开始日期
 * @param {String|Date|Number} end 结束日期
 * @returns {Number} 对比的天数,具体是不是绝对值，是否取余，业务内自己实现
 */
export const differenceInDays = (start, end) => differenceInMilliseconds(start, end) / 86400000;

/**
 * 切换日期
 * @module utils/date
 * @param {Date|String} dirtyDate 日期
 * @param {Number} days 天数
 * @returns {String} 切换后得到的时间字符串
 */
export const subDays = (dirtyDate, days) => {
    let startTime;
    if(typeof dirtyDate === 'string'){
        startTime = new Date(dirtyDate).getTime();
    } else {
        startTime = dirtyDate.getTime()
    }

    let endTime = new Date(startTime + (days * 86400000));
    let lastYear = endTime.getFullYear();
    let lastMonth = endTime.getMonth() + 1;
    // 字符串转换
    lastMonth = lastMonth < 10 ? `0${lastMonth}` : lastMonth;
    let lastDay = endTime.getDate();
    lastDay = lastDay < 10 ? `0${lastDay}` : lastDay;

    return `${lastYear}-${lastMonth}-${lastDay}`;
}

/**
 * 日期分组(以传入的日期为分界线分组)
 * @module utils/date
 * @param {String} dirtyDateString 用来分组的日期
 * @param {Array} dirtyDateArray 日期数组
 * @returns {Object} 分组后的对象
 */
export const groupBy = (dirtyDateString, dirtyDateArray) => {
    const start = [];
    const end = [];
    const now = parse(dirtyDateString);
    dirtyDateArray.forEach((date) => {
        const time = parse(date);
        if (time < now) {
            start.push(date);
        } else {
            end.push(date);
        }
    });
    return {
        start,
        end
    }
}

const getWeekOfYear = function(date, weekStart) { 
    // weekStart：每周开始于周几：周日：0，周一：1，周二：2 ...，默认为周日
    weekStart = (weekStart || 0) - 0;  
    if(isNaN(weekStart) || weekStart > 6)  
        weekStart = 0;
    var year = date.getFullYear();  
    var firstDay = new Date(year, 0, 1);  
    var firstWeekDays = 7 - firstDay.getDay() + weekStart;  
    var dayOfYear = (((new Date(year, date.getMonth(), date.getDate())) - firstDay) / (24 * 3600 * 1000)) + 1;  
    return Math.ceil((dayOfYear - firstWeekDays) / 7) + 1;  
}


/**
 * 获取日期是一年中的第几周，几
 * @module utils/date
 * @param {String} dirtyDateString - 日期
 * @param {String} [lang] - 语言zh/en
 * @param {String} [weekStart] - 语言zh/en
 * @returns {Object} year|number|season|month|week|weekName|dirtyYear
 */
export const weekOfYear = (dirtyDateString, lang='zh', weekStart=1) => {
    const dirtyDate = parse(dirtyDateString);
    let firstMonth = parse(`${dirtyDate.getFullYear()}-01-01`);
    const firstMonthWeek = firstMonth.getDay();

    if(firstMonthWeek !== 0){
        let firstMonthDay = (7 - firstMonthWeek) + weekStart;
        firstMonthDay = firstMonthDay < 10 ? ('0' + firstMonthDay) : firstMonthDay;
        if((dirtyDate - firstMonth) < 0){
            firstMonth = parse(`${dirtyDate.getFullYear() - 1}-01-01`);
        }
    }

    const number = getWeekOfYear(dirtyDate, weekStart);
    const season = {
        1: 1, 2: 1, 3: 1,
        4: 2, 5: 2, 6: 2,
        7: 3, 8: 3, 9: 3,
        10: 4, 11: 4, 12: 4
    }

    const month = dirtyDate.getMonth() + 1;
    const week = dirtyDate.getDay();
    const day = dirtyDate.getDate();
    const weekArr = weekObj[lang] || [];
    return {
        year: firstMonth.getFullYear(),
        number: number + 1,
        month: month,
        season: season[month],
        week,day,
        weekName: weekArr[week],
        dirtyYear: dirtyDate.getFullYear()
    };
}

/**
 * 是否闰年
 * @module utils/date
 * @param {String} dirtyDateString - 日期
 * @returns {Boolean} true/false
 */
export const isLeapYear = (dirtyDateString) => {
    const year = parse(dirtyDateString).getFullYear();
    return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
}

/**
 * 获取传入的时间
 * @module utils/date
 * @param {String|Date} dirtyDate - 日期
 * @returns {Boolean} true/false
 */
export const now = (dirtyDate) => {
    let str = dirtyDate;
    if(!str){
        str = format(new Date());
    }

    if(is(str)){
        str = format(dirtyDate);
    }

    return weekOfYear(str)
}

export function fixedYM(year, month) {
    if (+month === 0) {
        year = +year - 1;
        month = 12;
    };

    if (+month === 13) {
        year = +year + 1;
        month = 1;
    };
    return [year, month];
}

export function getMonthDays(year, month) {
    const YM = fixedYM(year, month);
    return new Date(YM[0], YM[1], 0).getDate();
}
/**
 * 获取当月的数组
 * @param {String} dirtyDateString 日期字符串
 * @param {String} lang 语言
 * @returns {Array} dayArrays
 */
export function getMonthDaysArray (dirtyDateString, lang="zh"){
    const { year, month, day } = now(dirtyDateString);
    const nowTime = now();
    const dayArrays = []
    const days = getMonthDays(year, month);
    const preDays = getMonthDays(year, month - 1);

    let firstDayInWeek = weekOfYear(`${year}-${month}-01`).week;
    let lastDayInWeek = weekOfYear(`${year}-${month}-${days}`).week;

    firstDayInWeek = firstDayInWeek || 7;
    lastDayInWeek = lastDayInWeek || 7;

    const prevCoverNumber = firstDayInWeek - 1;
    const nextCoverNumber = 7 - lastDayInWeek;

    //上月在当月日历面板中的排列
    for (let i = 1; i <= prevCoverNumber; i++) {
        const day = (preDays - prevCoverNumber + i);
        const pre = fixedYM(year, month - 1);
        dayArrays.push({
            year: pre[0],
            month: pre[1],
            day: day,
            weekDay: weekObj[lang][i]
        })
    }
    //当月日历面板中的排列
    for (let i = 1; i <= days; i++) {
        const weekDayFlag = (firstDayInWeek + i - 1) % 7;
        dayArrays.push({
            day: i,
            year,
            month,
            weekDay: weekObj[lang][weekDayFlag],
            today: nowTime.year === year && nowTime.month === month && i === Number(nowTime.day),
            isThisMonth: true
        })
    };
    //下月在当月日历面板中的排列
    for (let i = 1; i <= nextCoverNumber; i++) {
        const weekDayFlag = (firstDayInWeek + days + i - 1) % 7;
        const next = fixedYM(year, month + 1);
        dayArrays.push({
            year: next[0],
            month: next[1],
            day: i,
            weekDay: weekObj[lang][weekDayFlag]
        })
    };
    return dayArrays;
}

export function nextMonth(dateObj){
    const date = parse(format(dateObj));
    const month = date.getMonth();
    date.setMonth(month + 1);
    return date;
}

export function prevMonth(dateObj){
    const date = parse(format(dateObj));
    const month = date.getMonth();
    date.setMonth(month - 1);
    return date;
}
