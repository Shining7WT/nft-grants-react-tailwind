import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { DateRangePicker, isInclusivelyBeforeDay } from 'react-dates';
import { INFO_POSITION_BEFORE } from 'react-dates/constants';
import 'react-dates/initialize';
import "react-dates/lib/css/_datepicker.css";
import moment from 'moment';

import './FundingLedger.scss';
import FundingLedgerTable from './components/FundLedgerTable';
import { fetchMilestonesAction } from '../../redux/actions/MilestoneAction';
import Pagination from '../../Shared/Pagination';
import useDebounce from '../../Shared/UseDebounce';
import DateOptions from "../../Shared/CustomDate";

const FundingLedger = ({
  milestones, total, loading, fetchMilestones
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateSelected, setDateSelected] = useState(false);
  const [orderBy, setOrderBy] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [filterBy, setFilter] = useState(null);
  const [highlightedDates, setHighlightedDates] = useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 600);

  const onSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (data) => {
    if (data.length) {
      if (data[0].desc)
        setOrderBy(`-${data[0].id}`);
      else
        setOrderBy(`${data[0].id}`);
    }
  };

  const handleFilter = (data) => {
    if (data.length) {
      setFilter({ column: data[0].id, value: data[0].value });
    }
  };

  const setDates = (date) => {
    setStartDate(date.startDate);
    setEndDate(date.endDate);
	}

  useEffect(() => {
    if (startDate && endDate) setDateSelected(!dateSelected);
  }, [startDate, endDate]);

  useEffect(() => {
    fetchMilestones({
      params: {
        date: startDate ? JSON.stringify({
          from: startDate && new Date(startDate.format('MM-DD-YYYY')).getTime(),
          to: endDate && new Date(endDate.format('MM-DD-YYYY')).getTime(),
        }) : undefined,
        page: searchTerm !== '' ? 0 : currentPage,
        ...(filterBy && {'filterRelated[grant.fund_with_usd.=]': filterBy.value === 'USD' ? true : false }),
        'filter[funded]': true,
        orderBy: '-date_funded_timestamp',
        related: 'grant',
      },
      ...(searchTerm !== '' && {
        searchValue: searchTerm.trim(),
        'searchRelated[grant]': searchTerm.trim(),
      }),
    })
  }, [debouncedSearchTerm, currentPage, orderBy, filterBy, dateSelected]);

  return (
    <>
      <div className="block xl:flex justify-between items-center px-5 lg:px-10 xl:px-20 bg-white py-12">
        <div className="text-black font-bold text-4xl leading-10">Funding Ledger</div>
        <div className="block md:flex justify-between xl:justify-end items-center mt-5 xl:mt-0">
          <div className="mt-5 lg:mt-0 w-auto lg:w-72 p-1 rounded-md shadow-md border border-gray-300">
            <div className="date-container ">
              <DateRangePicker
                startDate={startDate}
                startDateId="startDate"
                endDate={endDate}
                endDateId="endDate"
                onDatesChange={({ startDate, endDate }) => {
                  setStartDate(startDate);
                  setEndDate(endDate);
                }}
                focusedInput={focusedInput}
                onFocusChange={setFocusedInput}
                isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
                initialVisibleMonth={() => moment().subtract(1, "month")}
                orientation={"horizontal"}
              />
            </div>
          </div>
          <div className="flex items-center justify-center mt-5 lg:mt-0 px-4 md:px-9 h-12 py-4 md:ml-5 bg-indigo-600 shadow rounded-lg cursor-pointer">
            <div className="flex w-28 md:w-32  items-center justify-center md:justify-around flex-1 h-full">
              <div className="text-white text-lg mr-2 md:mr-0">
                <i className="fal fa-download" />
              </div>
              <p className="text-base md:text-lg font-medium text-white">Export</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 bg-white rounded-lg shadow-md border border-gray-200 overflow-x-auto mx-5 lg:mx-10 xl:mx-20">
        <FundingLedgerTable
          inputData={milestones}
          loading={loading}
          handleSort={handleSort}
          handleFilter={handleFilter}
          setFilter={setFilter}
          filterBy={filterBy}
        />
      </div>
      <div className="mt-7 w-full inline-flex justify-end items-center px-5 lg:px-10 xl:px-20">
        {
          total > 20 && (
            <Pagination
              total={total}
              dataPerPage={20}
              setCurrentPage={setCurrentPage}
              currentLength={milestones}
            />
          )
        }
      </div>
    </>
  );
};

export default connect(state => {
  return {
    milestones: state.milestones.milestones,
    total: state.milestones.total,
    loading: state.milestones.loading,
  }
}, dispatch => {
  return {
    fetchMilestones: data => dispatch(fetchMilestonesAction(data)),
  }
})(FundingLedger)