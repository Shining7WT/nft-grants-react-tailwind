import React, { useEffect, useState } from 'react';
import moment from "moment";
import { useForm } from 'react-hook-form';
import { DateRangePicker, isInclusivelyBeforeDay } from 'react-dates';

import STXImg from '../../../../img/activity/stx.svg';
import DollarImg from '../../../../img/activity/dollar.svg';
import 'react-dates/initialize';
import "react-dates/lib/css/_datepicker.css";
import './MiniConverter.scss';

const MiniConverter = ({ getStackPrice, isCollapsed, setIsCollapsed }) => {
  const [stxVal, setSTXVal] = useState(0);
  const [usdVal, setUSDVal] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [hasDateError, setHasDateError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [customDays, setCustomDays] = useState(null);

  const [highlightedDates, setHighlightedDates] = useState([]);

  const {
    handleSubmit,
    register,
    errors,
    watch,
    setValue,
    getValues,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onSubmit'
  });
  const formDollar = watch('usd_amt')
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
      setSTXVal(convertedAmount)
      setIsFetching(false)
    }
  };

  const validateNumber = (e) => {
    let n = e.target.value;
    e.target.value = (n.indexOf(".") >= 0) ? (n.substr(0, n.indexOf(".")) + n.substr(n.indexOf("."), 3)) : n;
  };

  const validateStxNumber = (e) => {
    let n = e.target.value;
    e.target.value = (n.indexOf(".") >= 0) ? (n.substr(0, n.indexOf(".")) + n.substr(n.indexOf("."), 5)) : n;
  }

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

  useEffect(() => {
    setUSDVal(Number(getValues('usd_amt')))
  }, [formDollar]);

  return (
    <div className="w-full">
      {
        !isCollapsed &&
          <div className='flex items-center mb-4'>
            <p className="text-xl md:text-2xl font-bold text-black w-full">
              Converter
            </p>
            <button className="float-right flex rounded-lg py-3 px-5 bg-gray-200 hover:bg-gray-300 text-sm text-gray-500 font-semibold" onClick={() => setIsCollapsed(prev => !prev)}>
              <span className="pr-3">
                { isCollapsed ? <i class="far fa-minus" /> : <i class="far fa-plus" /> }
              </span>
              Collapse
            </button>
          </div>
      }
      <div className={`p-5 bg-white ${isCollapsed ? 'rounded-r-lg' : 'rounded-lg' }`}>
        <div className="flex items-center justify-between py-2 converter-item mb-2">
          <div className="w-6/12 xl:w-6/12 flex justify-start items-center">
            <img src={STXImg} className="item-img" />
            <p className="block pl-3">STX</p>
          </div>
          <div className="w-6/12 flex justify-end">
            <input
              type="number"
              className="converter-input"
              min="0"
              value={stxVal ? Number(stxVal).toFixed(4) : 0}
              onInput={(e) => validateStxNumber(e)}
              onChange={(e) => {
                setSTXVal(e.target.value);
              }}
            />
            <div className="input-arrow ml-2">
              <button onClick={() => {
                setSTXVal(Number(stxVal) + 1);
              }}>
                <i className="fas fa-chevron-up"></i>
              </button>
              <button onClick={() => {
                if (stxVal > 0) {
                  setSTXVal((Number) - 1);
                }
              }}>
                <i className="fas fa-chevron-down"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between py-2 converter-item mb-2">
          <div className="w-6/12 xl:w-6/12 flex justify-start items-center">
            <img src={DollarImg} className="item-img" />
            <p className="block pl-3">USD</p>
          </div>
          <div className="w-6/12 flex justify-end">
            <input
              type="number"
              className="converter-input"
              min="0"
              value={usdVal}
              onInput={(e) => validateNumber(e)}
              onChange={(e) => {
                setUSDVal(e.target.value);
              }}
            />
            <div className="input-arrow ml-2">
              <button onClick={() => {
                setUSDVal(Number(usdVal) + 1);
              }}>
                <i className="fas fa-chevron-up"></i>
              </button>
              <button onClick={() => {
                if (usdVal > 0) {
                  setUSDVal(Number(usdVal) - 1);
                }
              }}>
                <i className="fas fa-chevron-down"></i>
              </button>
            </div>
          </div>
        </div>
        <form className="">
          <div className="py-5 converter-form">
            <div className="flex flex-col justify-center items-start">
              <p className="date-range-title">Date Range</p>
              <div className={`p-1 border ${hasDateError ? 'border-red-600' : 'border-gray-300'} rounded-lg`}>
                <div className="date-container flex flex-col converter-date-container">
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
                    isDayHighlighted={(day) => {
                      return highlightedDates.includes(day.format('DD-MM-YYYY'))
                    }}
                  />
                </div>
                {hasDateError &&
                  <span className="p-1 text-red-600 text-sm">
                    Please enter the date range
                  </span>
                }
              </div>
            </div>
            <div className="flex flex-col justify-center items-start converter-usd-input">
              <p>USD Amount</p>
              <div className={`border rounded-lg ${errors && errors.usd_amt && errors.usd_amt.message ? 'border-red-600' : 'border-gray-300'} converter-input-container`}>
                <input
                  name="usd_amt"
                  ref={register({
                    required: "This field is required",
                  })}
                  errors={errors}
                  type="number"
                  placeholder="$USD Amount"
                  onInput={(e) => validateNumber(e)}
                />
                {errors && errors.usd_amt &&
                  errors.usd_amt.message ?
                  <span className="p-1 text-red-600 text-sm">{errors.usd_amt.message}</span> :
                  <></>
                }
              </div>
            </div>
          </div>
          <button type="submit" className="w-full flex items-center justify-center rounded-lg py-3.5 converter-submit" onClick={handleSubmit(d => onSubmit(d))}>
            {!isFetching ? 'Convert' : 'Converting...'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default MiniConverter;
