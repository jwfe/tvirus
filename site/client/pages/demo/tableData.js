import React, { Component } from 'react';
import { Util } from 'tvirus';
const { weekOfYear } = Util.date;

const columns = [
    {
        title: '日期', width: 150, key: 'date', fixed: 'left', align: 'center', sort: (a, b)=>{
            return Util.date.parse(a) - Util.date.parse(b);
        }
    },
    {title: '星期', width: 100, dataIndex: 'week', key: 'week', fixed: 'left', align: 'center'},
    {title: '预测', dataIndex: 'fc', key: 'fc', width: 200, align: 'center'},
    {title: '去年同星期', dataIndex: 'last_year', width: 200, align: 'center'},
    {title: '已有/实际', dataIndex: 'otb', key: 'otb', width: 200, align: 'center'},
    {
        title: 'vs 去年同星期实际', align: 'center',
        
        children: [
            {
                title: '差值',
                dataIndex: 'dv', 
                width: 200, align: 'center'
            },
            {
                title: '差异率',
                dataIndex: 'd_rate', 
                width: 200, align: 'center'
            }
        ]
    },
    {
        title: 'vs 已有/实际', align: 'center',
        children: [
            {
                title: '差值',
                dataIndex: 'otb_dv', 
                width: 200, align: 'center'
            },
            {
                title: '差异率',
                dataIndex: 'otb_d_rate', 
                width: 200, align: 'center'
            }
        ]
    },
    {
        title: 'vs 预算', align: 'center',
        children: [
            {
                title: '差值',
                dataIndex: 'budget_dv', 
                width: 200, align: 'center'
            },
            {
                title: '差异率',
                dataIndex: 'budget_d_rate', 
                width: 200, align: 'center'
            }
        ]
    }
];

const data = [];
for (let i = 0; i < 31; i++) {
    const index = i + 1;
    const _date = `2019-05-${index > 9 ? i : ('0' + index)}`;
    const { weekName } = weekOfYear(_date);
    data.push({
        date: _date,
        week: weekName,
        fc: parseInt(Math.random() * 100),
        last_year: parseInt(Math.random() * 100),
        otb: '--',
        dv: parseInt(Math.random() * 100),
        d_rate: parseInt(Math.random() * 100),
        otb_dv: parseInt(Math.random() * 100),
        otb_d_rate: parseInt(Math.random() * 100),
        budget_dv: parseInt(Math.random() * 100),
        budget_d_rate: parseInt(Math.random() * 100)
    });
}


export {
    columns,
    data
}