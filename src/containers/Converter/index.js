import React, { useState, useEffect } from 'react';
import { DateRangePicker, isInclusivelyBeforeDay } from 'react-dates';
import { INFO_POSITION_BEFORE } from 'react-dates/constants';
import moment from "moment";
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import 'react-dates/initialize';
import "react-dates/lib/css/_datepicker.css";
import DateOptions from "../../Shared/CustomDate";
import { getStackPrice } from "../../api/Stacks";

import '../Reporting/Reporting.scss';
import '../GrantApplication/components/RoadMapForm.scss';

const Converter = ({}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [highlightedDates, setHighlightedDates] = useState([]);
  const [focusedInput, setFocusedInput] = useState(null);
  const [hasDateError, setHasDateError] = useState(false);
  const [result, setResult] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [prevUsdAmount, setPrevUsdAmount] = useState(null);
  const [customDays, setCustomDays] = useState(null);
  const {
    handleSubmit,
    register,
    errors,
    getValues,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onSubmit'
  });

  const onSubmit = async (data) => {
    if (!startDate || !endDate) {
      setHasDateError(true);
      return
    }
    setIsFetching(true)
    let stx = await getStackPrice({
      from: startDate.unix(),
      to: endDate.unix()
    })
    if (stx.success) {
      let convertedAmount = parseFloat(getValues('usd_amt')) / stx.data.avg_price
      setResult(convertedAmount)
      setIsFetching(false)
      setPrevUsdAmount(getValues('usd_amt'));
    }
  }

  const setDates = (date) => {
    setStartDate(date.startDate);
    setEndDate(date.endDate);
		setHasDateError(false)
	};

  const validateNumber = (e) => {
    let n = e.target.value;
    e.target.value = (n.indexOf(".") >= 0) ? (n.substr(0, n.indexOf(".")) + n.substr(n.indexOf("."), 3)) : n; 
  };

  const onCopy = () => {
    if (result) {
      navigator.clipboard.writeText(Number(result).toFixed(4));
      toast.dark('STX copied to clipboard');
    }
  };

  const onCustomDaysChange = (e) => {
    if (e.target.value)
      setCustomDays(e.target.value)
    else {
      setStartDate(null)
      setCustomDays(e.target.value)
    }
  };

  const onCustomDateApply = () => {
    if (!customDays) return
    setStartDate(moment(startDate).subtract(parseInt(customDays), 'days'));
    setEndDate(startDate);
    setFocusedInput(null)
  };

  const calenderCustomInputs = () => {
    return (
      <div className="custom-calender">
        <input type="number" onChange={onCustomDaysChange} value={customDays} onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()} />
        <p>Days Before <span>{(endDate ? endDate : startDate).format('MMM Do')}</span></p>
        {customDays && <button onClick={onCustomDateApply}>Apply</button>}
      </div>
    )
  };

  return (
    <>
      <div className="block lg:flex justify-between items-center px-5 lg:px-10 xl:px-20 bg-white py-12">
        <div className="text-black font-bold text-4xl leading-10">Converter</div>
      </div>
      <div className="flex space-x-20 mt-10 px-5 lg:px-10 xl:px-20 py-12">
        <form className="">
          <div className={`w-96 p-1 border ${ hasDateError ? 'border-red-600' : 'border-gray-300'} rounded-md shadow-md`}>
            <div className="date-container flex flex-col">
              <DateRangePicker
                startDate={startDate}
                startDateId="startDate"
                endDate={endDate}
                endDateId="endDate"
                onDatesChange={({ startDate, endDate }) => {
                  setStartDate(startDate);
                  setEndDate(endDate);
                  setHasDateError(false)
                }}
                focusedInput={focusedInput}
                onFocusChange={setFocusedInput}
                isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
                initialVisibleMonth={() => moment().subtract(1, "month")}
                orientation={"horizontal"}
                renderCalendarInfo={startDate ? calenderCustomInputs : null}
                // calendarInfoPosition={INFO_POSITION_BEFORE}
                isDayHighlighted={(day) => {

                  return highlightedDates.includes(day.format('DD-MM-YYYY'))
                }}
              />
            </div>
            {hasDateError && <span className="p-1 text-red-600 text-sm">Please enter the date range</span>}
          </div>

          <div className="mt-5">
            <div className={`flex items-center border ${errors && errors.usd_amt && errors.usd_amt.message ? 'border-red-600' : 'border-gray-300'} rounded-lg shadow-md`}>
              <div className="">
                <i className="far fa-money-bill text-sm text-indigo-600 px-4" />
              </div>
              <div className="">
                <input
                  name="usd_amt"
                  ref={register({
                    required: "This field is required",
                  })}
                  errors={errors}
                  type="number"
                  className="outline-none text-sm text-black py-3.5"
                  placeholder="USD Amount"
                  onInput={(e) => validateNumber(e)}
                />
              </div>
            </div>
            {errors && errors.usd_amt && errors.usd_amt.message ? <span className="p-1 text-red-600 text-sm">{errors.usd_amt.message}</span> : <></>}
          </div>

          <div className="mt-5">
              <button type="submit" className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white text-base font-bold rounded-lg py-3.5" onClick={handleSubmit(d => onSubmit(d))}>
                {
                  !isFetching
                    ? (
                      <>
                        Convert
                        <div className="pl-3"><i className="fal fa-long-arrow-right pt-1" /></div>
                      </>
                    )
                    : 'Converting...'
                }
                
              </button>
            </div>
        </form>

        <div className="w-80 h-80 rounded-md bg-black flex flex-col justify-center items-center">
          <p className="font-medium text-2xl text-white">${prevUsdAmount ? prevUsdAmount : ` - `} USD</p>
          <p className="text-sm font-normal text-gray-400 mt-3">for the selected date is:</p>
          <p className="text-4xl font-bold text-white mt-6">{result ? Number(result).toFixed(4) : '-'}</p>
          <div className="bg-indigo-600 text-white px-3 py-1 mt-3 rounded-md">STX</div>
          <div className="text-sm text-gray-400 py-3 px-3 border-b border-gray-500 cursor-pointer mt-3" onClick={() => onCopy()}>
            <span><i className="fal fa-copy text-sm text-gray-400" /> Copy to Clipboard</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Converter;