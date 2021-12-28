import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import moment from "moment";
import alasql from 'alasql';
import { Legend, Tooltip, LineChart, CartesianGrid, XAxis, YAxis, Line, ResponsiveContainer } from 'recharts';
import { DateRangePicker, isInclusivelyBeforeDay } from 'react-dates';
import { INFO_POSITION_BEFORE } from 'react-dates/constants';

import 'react-dates/initialize';
import "react-dates/lib/css/_datepicker.css";

import StacksDropdown from '../../Shared/StacksDropdown';
import ReportingTab from './components/ReportingTab';
import ReportingTable from './components/ReportingTable';
import useDebounce from '../../Shared/UseDebounce';
import { fetchReportsAction } from '../../redux/actions/ReportAction';
import { getReports } from "../../api/Report";
import DateOptions from "../../Shared/CustomDate";
import './Reporting.scss';

const Reporting = ({ report, loading, fetchReports, ...props }) => {
  const [activeFilter, setActiveFilter] = useState('STX+USD');
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [filterBy, setFilter] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState({label: 'All Grants', value: 'all_grants'});
  const [graphData, setGraphData] = useState([]);
	const [isExporting, setIsExporting] = useState(false);
	const [tableData, setTableData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [hasDateError, setHasDateError] = useState(false);
  const [highlightedDates, setHighlightedDates] = useState([]);
  const navigate = useNavigate();

  const debouncedSearchTerm = useDebounce(searchTerm, 600);

  const handleSort = (data) => {
    if (data.length) {
      if (data[0].desc)
        setOrderBy(`-${data[0].id}`);
      else
        setOrderBy(`${data[0].id}`);
    }
  };

  const onExport = async () => {
    setIsExporting(true)
    let allReports = await getReports({
			params: {
				payment: true,
				fund_with_usd: undefined,
				is_chapter: selectedFilter.value === 'all_grants' ? undefined : selectedFilter.value === 'only_chapter_grants' ? true : false,
				grouped_status: true,
				from_date: startDate ? startDate.format("YYYY-MM-DD") : undefined,
				to_date: endDate ? endDate.format("YYYY-MM-DD") : undefined,
				group: 'months',
				perPage: 1000000
			}
    })

    if (allReports.data.success) {
      let filename = `Report-${(new Date()).getTime()}.csv`
      let formattedData = allReports.data.records.map(m => ({
				Name: m.title,
				Status: m.grant_status,
				Funded: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(m.funded_amount / 100),
				Approved: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(m.approved_amount / 100),
				Milestone: `${m.commented_milestones}/${m.total_milestones}`,
				Created: moment(m.created_at).format('MM/DD/YY'),
      }))
      alasql('SELECT * INTO CSV("' + filename + '",{headers:true, separator : ","}) FROM ?', [formattedData]);
      setIsExporting(false)
    }
  };

  const onSubmit = () => {
		if (!startDate || !endDate) {
			setHasDateError(true)
			return
		}
		fetchReports({
			params: {
				payment: true,
				fund_with_usd: undefined,
				is_chapter: selectedFilter.value === 'all_grants' ? undefined : selectedFilter.value === 'only_chapter_grants' ? true : false,
				grouped_status: true,
				from_date: startDate ? startDate.format("YYYY-MM-DD") : undefined,
				to_date: endDate ? endDate.format("YYYY-MM-DD") : undefined,
				group: 'months'
			}
		})
	};

  const handleFilter = (data) => {
    if (data.length) {
      setFilter({ column: data[0].id, value: data[0].value });
    }
  };

  const handleRowClick = (row) => {
    navigate(`/dashboard/grants/${row.id}`)
  };

  const setDates = (date) => {
    setStartDate(date.startDate);
    setEndDate(date.endDate);
		setHasDateError(false)
	}

  const dollarFormatter = (num) => {
		return Math.abs(num) > 999
			? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Math.sign(num)*((Math.abs(num)/1000).toFixed(1))) + 'k'
			: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Math.sign(num)*Math.abs(num))
	};
	const numberFormatter = (num) => new Intl.NumberFormat('en-US', { currency: 'USD' }).format(num);

	const stx_usd = (report && report.group || [])
		.map((g) => ({ Name: (Object.keys(g)[0]).split('-')[1], STX: (Object.values(g)[0]).stx, USD: (Object.values(g)[0]).usd / 100 }));

	const stx_grants = (report && report.group || [])
		.map((g) => ({ Name: (Object.keys(g)[0]).split('-')[1], 'STX Count': (Object.values(g)[0]).stx_count || 0 }));

	const usd_grants = (report && report.group || [])
		.map((g) => ({ Name: (Object.keys(g)[0]).split('-')[1], 'USD Count': (Object.values(g)[0]).usd_count || 0 }));

	const usd_funded = (report && report.group || [])
		.map((g) => ({ Name: (Object.keys(g)[0]).split('-')[1], 'USD Funded': (Object.values(g)[0]).usd / 100 || 0 }));

	const stx_funded = (report && report.group || [])
		.map((g) => ({ Name: (Object.keys(g)[0]).split('-')[1], 'STX Funded': (Object.values(g)[0]).stx || 0 }));

	useEffect(() => {
		if (activeFilter === 'STX+USD') {
			setGraphData(stx_usd);
			setTableData(report.records);
		}
		else if (activeFilter === 'STX GRANTS') {
			setGraphData(stx_grants);
			let data = report.records && report.records.filter(record => !record.fund_with_usd);
			setTableData(data);
		}
		else if (activeFilter === 'USD GRANTS') {
			setGraphData(usd_grants);
			let data = report.records && report.records.filter(record => record.fund_with_usd);
			setTableData(data);
		}
		else if (activeFilter === 'STX FUNDED') {
			setGraphData(stx_funded);
			let data = report.records && report.records.filter(record => !record.fund_with_usd);
			setTableData(data);
		}
		else if (activeFilter === 'USD FUNDED') {
			setGraphData(usd_funded);
			let data = report.records && report.records.filter(record => record.fund_with_usd);
			setTableData(data);
		}
		else setGraphData([]);
	}, [activeFilter, report]);

  useEffect(() => {
    if (orderBy && startDate && endDate) {
      fetchReports({
        params: {
          payment: true,
          ...(orderBy && {order: orderBy}),
          fund_with_usd: undefined,
          is_chapter: selectedFilter.value === 'all_grants' ? undefined : selectedFilter.value === 'only_chapter_grants' ? true : false,
          grouped_status: true,
          from_date: startDate ? startDate.format("YYYY-MM-DD") : undefined,
          to_date: endDate ? endDate.format("YYYY-MM-DD") : undefined,
          group: 'months'
        }
      })
    }
  }, [orderBy]);

  return (
    <>
      <div className="block xl:flex items-center px-5 lg:px-10 xl:px-20 bg-white py-12">
        <div className="w-full xl:w-8/12">
          <p className="text-4xl font-bold text-black">Reporting</p>
        </div>
        <div className="block xl:flex justify-start xl:justify-end items-center w-full mt-5 xl:mt-0">
          <div className="mt-5 xl:mt-0 w-72 p-1 border border-gray-300 rounded-md shadow-md">
            <div className="date-container">
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
                renderCalendarInfo={() => <DateOptions updateDates={setDates} setHighlightedDates={setHighlightedDates} />}
                calendarInfoPosition={INFO_POSITION_BEFORE}
                isDayHighlighted={(day) => {

                  return highlightedDates.includes(day.format('DD-MM-YYYY'))
                }}
              />
              {hasDateError && <span className="p-1 text-red-600 text-sm">Please enter the date range</span>}
            </div>
          </div>
          <div className="ml-0 xl:ml-5 mt-5 xl:mt-0">
            <StacksDropdown
              dropdownTitle={selectedFilter.label}
              dropdownArray={[
                { label: 'All Grants', value: 'all_grants' },
                { label: 'Excluding chapter grants', value: 'exclude_chapter_grants' },
                { label: 'Only chapter grants', value: 'only_chapter_grants' }
              ]}
              width="w-72"
              onSelect={(item) => {
                let selected = { label: item.label, value: item.value }
                setSelectedFilter(selected);
              }}
            />
          </div>
          <div className="ml-0 xl:ml-5 mt-5 xl:mt-0">
            <button
              className="inline-flex items-center px-10 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              onClick={() => onSubmit()}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="mt-12 px-5 lg:px-10 xl:px-20">
        <ReportingTab
          setActiveFilter={setActiveFilter}
          activeFilter={activeFilter}
          totalStxUsdFunded={report.total_amount || 0}
          totalStxGrants={report.stx_funded_count || 0}
          totalUsdGrants={report.usd_funded_count || 0}
          totalUsdFunded={report.usd_amount|| 0}
          totalStxFunded={report.stx_amount || 0}
        />
      </div>
      <div className="mt-20 px-5 lg:px-10 xl:px-20">
        <div className="w-chartBoxWidth h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart width={400} height={250} data={graphData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Name" />
              {activeFilter !== 'STX+USD' && <YAxis />}
              {
                activeFilter === 'STX+USD' &&
                <>
                  <YAxis tickFormatter={dollarFormatter} yAxisId="left" />
                  <YAxis tickFormatter={numberFormatter} yAxisId="right" orientation="right" />
                </>
              }
              <Tooltip content={CustomTooltip} />
              <Legend wrapperStyle={{ bottom: "-10px" }} />
              {activeFilter === 'STX+USD' &&
                <>
                  <Line yAxisId="left" type="monotone" dataKey="USD" stroke="#0088FE" />
                  <Line yAxisId="right" type="monotone" dataKey="STX" stroke="#00C49F" />
                </>
              }
              {activeFilter === 'STX GRANTS' && <Line type="monotone" dataKey="STX Count" stroke="#00C49F" />}
              {activeFilter === 'USD GRANTS' && <Line type="monotone" dataKey="USD Count" stroke="#0088FE" />}
              {activeFilter === 'STX FUNDED' && <Line type="monotone" dataKey="STX Funded" stroke="#00C49F" />}
              {activeFilter === 'USD FUNDED' && <Line type="monotone" dataKey="USD Funded" stroke="#0088FE" />}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-10 flex justify-end items-center px-5 lg:px-10 xl:px-20">
        <div/>
        <div className="flex items-center justify-center px-4 md:px-9 h-12 py-4 md:ml-5 bg-indigo-600 hover:bg-indigo-700 shadow rounded-lg cursor-pointer">
          <div
            className="flex w-48 items-center justify-center md:justify-around flex-1 h-full"
            onClick={() => onExport()}
          >
            <div className="text-white text-lg mr-2 md:mr-0">
              <i className="fal fa-download" />
            </div>
            <p className="text-base md:text-lg font-medium text-white">{isExporting ? 'Exporting...' : 'Export Records'}</p>
          </div>
        </div>
      </div>
      <div className="mt-5 bg-white rounded-lg shadow-md border border-gray-200 overflow-x-auto mx-5 lg:mx-10 xl:mx-20">
        <ReportingTable
          inputData={tableData || []}
          handleSort={handleSort}
          handleFilter={handleFilter}
          setFilter={setFilter}
          filterBy={filterBy}
          loading={loading}
          noRecordTitle={(!startDate && !endDate) ? "Please select a date range above" : "We can’t seem to find any records."}
          handleRowClick={handleRowClick}
        />
      </div>
    </>
  );
};

export default connect(state => {
  return {
    report: state.reports.report,
		loading: state.reports.loading,
  }
}, dispatch => {
  return {
    fetchReports: data => dispatch(fetchReportsAction(data)),
  }
})(Reporting)

const CustomTooltip = ({ active, payload, label }) => {
	if (active && payload && payload.length) {
		return (
			<div className="custom-tooltip">
				{
					payload.map(p => (
						<p className="label">{`${p.name} : ${p.name.includes('STX') ? new Intl.NumberFormat('en-US', { currency: 'USD' }).format(p.value) : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(p.value)}`}</p>
					))
				}
			</div>
		);
	}

	return null;
};