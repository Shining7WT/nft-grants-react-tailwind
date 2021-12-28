import React from 'react';
import moment from 'moment';

import ReactTable from '../../../Shared/ReactTable';

const UnreadGrantsTable = ({ inputData, handleSort, loading, onFollow }) => {

  const COLUMNS = [
    {
      Header: 'Grant Name',
      accessor: 'title',
      width: '25%',
      disableFilters: true,
      disableSortBy: true,
      Cell: (row) =>
        <div className="text-sm font-semibold text-gray-800">
          {row && row.value}
        </div>
    },
    {
      Header: 'Milestone',
      accessor: 'milestone_number',
      width: '15%',
      disableFilters: true,
      disableSortBy: true,
      Cell: ({ row }) =>
        <div className="text-center text-sm font-semibold text-gray-800">
          {`${(row && row.original && row.original.closed_grants)}/${(row && row.original && row.original.milestones.length)}`}
        </div>
    },
    {
      Header: 'Last Update',
      accessor: 'updated_at',
      disableFilters: true,
      disableSortBy: true,
      width: '20%',
      Cell: (row) => (
        <div className="text-center text-sm font-semibold text-gray-800">
          {moment(row && row.value).format('MM/DD/YYYY')}
        </div>
      ),
    },
    {
      Header: 'Github',
      accessor: 'github_issue_url',
      width: '20%',
      disableFilters: true,
      disableSortBy: true,
      Cell: (row) => (
        <div className="flex items-center justify-center px-3 md:px-5 h-12 py-4 w-32 bg-gray-800 hover:bg-gray-700 shadow rounded-lg cursor-pointer">
          <div
            className="flex items-center h-full"
            onClick={() => window.open(row && row.value, "_blank")}
          >
            <div className="text-white text-lg mr-2 md:mr-0">
              <i className="fab fa-github" />
            </div>
            <p className="text-base md:text-lg pl-2 font-medium text-white">Issue</p>
          </div>
        </div>
      ),
    },
    {
      Header: 'Follow Up',
      accessor: 'followed_up',
      width: '20%',
      disableFilters: true,
      disableSortBy: true,
      Cell: (row) => (
        <div className={`flex items-center justify-center px-4 md:px-9 h-12 py-4 ${(row && !row.value) ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-800 hover:bg-gray-700'} shadow rounded-lg ${(row && !row.value) ? 'cursor-pointer' : ''}`}>
          <div
            className="flex w-48 items-center justify-center md:justify-around flex-1 h-full"
            onClick={() => row && row.value ? null : onFollow(row && row.row.original)}
          >
            <p className="text-base md:text-lg font-medium text-white">
              {(row && !row.value) ? 'Mark as Followed Up' : `Followed Up ${moment(row && row.row.original.followed_up_date).format('M/D/YY')}`}
            </p>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="w-tableWidth xl:w-full">
      <ReactTable
        inputData={inputData}
        inputColumns={COLUMNS}
        leftAlignHeadings={['title', 'github_issue_url', 'followed_up']}
        handleSort={handleSort}
        noRecordTitle="We can’t seem to find any records."
        backButton
        refreshButton
        loading={loading}
      />
    </div>
  );
};

export default UnreadGrantsTable;