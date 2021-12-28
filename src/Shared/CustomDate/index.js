import { useState } from 'react';
import { START_DATE, END_DATE, INFO_POSITION_BEFORE } from 'react-dates/constants';
import moment from 'moment';
import './date.scss';
export default ({ onClick, updateDates, setHighlightedDates }) => {
    const getRange = (startDate, endDate, type) => {
        let fromDate = startDate
        let toDate = endDate
        let diff = toDate.diff(fromDate, type)
        let range = []
        for (let i = 0; i < diff; i++) {
            range.push(moment(startDate).add(i, type).format('DD-MM-YYYY'))
        }
        return range
    }
    const handleClick = (type) => {
        let firstDate = moment()
        let secondDate
        if (type === 'last_seven') {
            secondDate = moment().subtract(6, 'days')
        } else if (type === 'last_thirty') {
            secondDate = moment().subtract(29, 'days')
        } else if (type === 'month_to_date') {
            secondDate = moment().startOf('month')
        } else if (type === 'year_to_date') {
            secondDate = moment().startOf('year')
        } else if (type === 'quarter_to_date') {
            secondDate = moment().startOf('quarter')
        }
        updateDates({
            startDate: secondDate,
            endDate: firstDate
        });
        setHighlightedDates(getRange(secondDate.clone().add(1, 'days'), firstDate, 'days'))
    }

    return (<div className="flex flex-col w-110 ml-6 ">
        <button type="button" className="option text-left focus:text-stxblue" onClick={() => handleClick('last_seven')} >Last 7 Days</button>
        <button type="button" className="option text-left focus:text-stxblue" onClick={() => handleClick('last_thirty')} >Last 30 Days</button>
        <button type="button" className="option text-left focus:text-stxblue" onClick={() => handleClick('month_to_date')} >Month to date</button>
        <button type="button" className="option text-left focus:text-stxblue" onClick={() => handleClick('year_to_date')} >Year to date</button>
        <button type="button" className="option text-left focus:text-stxblue" onClick={() => handleClick('quarter_to_date')} >Quarter to date</button>
    </div>)
}