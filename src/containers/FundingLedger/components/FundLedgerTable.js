import React from 'react';
import moment from 'moment';

import ReactTable from '../../../Shared/ReactTable';
import MethodFilter from '../../../Shared/ReactTable/MethodFilter';

const FundingLedgerTable = ({ inputData, handleSort, loading, handleFilter, setFilter, filterBy }) => {

  const COLUMNS = [
    {
      Header: 'Date',
      accessor: 'date_funded',
      width: '8%',
      disableFilters: true,
      disableSortBy: true,
      Cell: (row) =>
        <div className="text-sm font-semibold text-gray-800">
          {moment(row && row.value).format('MM/DD/YYYY')}
        </div>
    },
    {
      Header: 'Name',
      id: 'name',
      disableFilters: true,
      disableSortBy: true,
      width: '15%',
      Cell: ({ row }) => (
        <div className="text-sm font-semibold text-gray-800">
          {`${row.original.grant && row.original.grant.first_name} ${row.original.grant && row.original.grant.last_name}`}
        </div>
      ),
    },
    {
      Header: 'Grant Name',
      id: 'grant_name',
      disableFilters: true,
      disableSortBy: true,
      width: '15%',
      Cell: ({ row }) => (
        <div className="text-sm font-semibold text-gray-800">
          {row.original.grant && row.original.grant.title}
        </div>
      ),
    },
    {
      Header: 'Email',
      id: 'email',
      disableFilters: true,
      disableSortBy: true,
      width: '15%',
      Cell: ({ row }) => (
        <div className="text-sm font-semibold text-gray-800">
          {row.original.grant && row.original.grant.email}
        </div>
      ),
    },
    {
      Header: 'Country',
      id: 'country',
      disableFilters: true,
      disableSortBy: true,
      width: '8%',
      Cell: ({ row }) => (
        <div className="text-sm font-semibold text-gray-800">
          {row.original.grant && row.original.grant.country}
        </div>
      ),
    },
    {
      Header: 'Business Name',
      id: 'company_name',
      disableFilters: true,
      disableSortBy: true,
      width: '10%',
      Cell: ({ row }) => (
        <div className="text-sm font-semibold text-gray-800">
          {row.original.grant && row.original.grant.company_name}
        </div>
      ),
    },
    {
      Header: 'Method',
      accessor: d => d.grant && d.grant.is_usdt ? 'USDT' : d.grant && d.grant.fund_with_usd ? 'USD' : 'STX',
      Filter: MethodFilter,
      icon: 'filter',
      disableSortBy: true,
      width: '5%',
      Cell: ({ row }) => (
        <div className="text-sm font-semibold text-gray-800">
          {
            row.original.grant && row.original.grant.is_usdt
              ? 'USDT'
              : row.original.grant && row.original.grant.fund_with_usd
                ? 'USD'
                : 'STX'
          }
        </div>
      ),
    },
    {
      Header: 'USD',
      id: 'amount',
      disableFilters: true,
      disableSortBy: true,
      width: '8%',
      Cell: ({ row }) => (
        <div className="text-sm font-semibold text-gray-800">
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(row.original.amount / 100)}
        </div>
      ),
    },
    {
      Header: 'USDT Amount',
      id: 'usdt_when_funded',
      disableFilters: true,
      disableSortBy: true,
      width: '8%',
      Cell: ({ row }) => (
        <div className="text-sm font-semibold text-gray-800">
          {
            row.original.grant && !row.original.grant.is_usdt
              ? '-'
              : row.original.usdt_when_funded
          }
        </div>
      ),
    },
    {
      Header: 'STX',
      id: 'stx_when_funded',
      disableFilters: true,
      disableSortBy: true,
      width: '8%',
      Cell: ({ row }) => (
        <div className="text-sm font-semibold text-gray-800">
          {
            row.original.grant && row.original.grant.fund_with_usd
              ? '-'
              : row.original.stx_when_funded
          }
        </div>
      ),
    },
  ];
  return (
    <div className="w-tableWidth xl:w-full">
      <ReactTable
        inputData={inputData}
        inputColumns={COLUMNS}
        leftAlignHeadings={['date_funded', 'name', 'grant_name', 'email', 'country', 'company_name', 'is_usdt', 'amount', 'usdt_when_funded', 'stx_when_funded']}
        handleSort={handleSort}
        noRecordTitle="We can’t seem to find any records."
        backButton
        refreshButton
        loading={loading}
        handleFilter={handleFilter}
        setFilter={setFilter}
        filterBy={filterBy}
      />
    </div>
  );
};

export default FundingLedgerTable;