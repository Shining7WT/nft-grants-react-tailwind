import React from 'react';
import moment from 'moment';

import ReactTable from '../../../Shared/ReactTable';
import SingleStatusBar from '../../../Shared/SingleStatusBar';

const ReportingTable = ({ inputData, handleSort, handleFilter, setFilter, filterBy, loading, handleRowClick, noRecordTitle }) => {

  const COLUMNS = [
    {
      Header: 'ID',
      accessor: 'id',
      width: '10%',
      disableFilters: true,
      disableSortBy: true,
      Cell: (row) =>
        <div className="text-sm text-gray-600">
          #{row && row.value}
        </div>
    },
    {
      Header: 'Name',
      accessor: 'title',
      width: '23%',
      disableFilters: true,
      disableSortBy: true,
      Cell: (row) =>
        <div className="text-sm font-semibold text-gray-800">
          {row && row.value}
        </div>
    },
    {
      Header: 'Status',
      accessor: 'grant_status',
      disableFilters: true,
      disableSortBy: true,
      width: '22%',
      Cell: (row) => (
        <div className="inline-flex justify-center">
          <SingleStatusBar
            text={row && row.value === null ? 'No Status' : row.value}
          />
        </div>
      ),
    },
    {
      Header: 'Funded',
      accessor: 'funded_amount',
      disableFilters: true,
      disableSortBy: true,
      width: '12%',
      Cell: (row) => (
        <div className="text-sm text-center font-semibold text-gray-800">
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format((row && row.value) / 100)}
        </div>
      ),
    },
    {
      Header: 'Approved',
      accessor: 'approved_amount',
      disableFilters: true,
      disableSortBy: true,
      width: '13%',
      Cell: (row) => (
        <div className="text-sm text-center font-semibold text-gray-800">
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format((row && row.value) / 100)}
        </div>
      ),
    },
    {
      Header: 'Milestone',
      accessor: 'milestones',
      disableFilters: true,
      disableSortBy: true,
      width: '10%',
      Cell: ({ row }) => (
        <div className="text-center font-semibold text-sm text-gray-800">
          {row.original && row.original.commented_milestones}/{row.original && row.original.total_milestones}
        </div>
      ),
    },
    {
      Header: 'Created',
      accessor: 'created_at',
      disableFilters: true,
      disableSortBy: true,
      width: '10%',
      Cell: (row) => (
        <div className="text-center font-semibold text-sm text-gray-800">
          {moment(row && row.value).format('MM/DD/YYYY')}
        </div>
      ),
    },
  ];

  return (
    <div className="w-tableWidth xl:w-full">
      <ReactTable
        inputData={inputData}
        inputColumns={COLUMNS}
        leftAlignHeadings={['id', 'title', 'grant_status', 'funded', 'approved']}
        pointerOnRow
        handleSort={handleSort}
        handleFilter={handleFilter}
        setFilter={setFilter}
        filterBy={filterBy}
        noRecordTitle={noRecordTitle}
        backButton
        refreshButton
        loading={loading}
        handleRowClick={handleRowClick}
      />
    </div>
  );
};

export default ReportingTable;