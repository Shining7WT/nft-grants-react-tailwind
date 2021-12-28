import React from 'react';
import { toast } from 'react-toastify';

import ReactTable from '../../../Shared/ReactTable';

const PaymentDueTable = ({ inputData, handleSort, loading, setShowSTXAddress, setMarkAsFundedModal, handleRowClick, setActive, setActiveSTXAddress }) => {
  const onCopy = (e, address, isMemo) => {
    e.stopPropagation();
    navigator.clipboard.writeText(address)
    toast.dark(isMemo ? 'Memo copied to clipboard' : 'Wallet address copied to clipboard')
  };

  const COLUMNS = [
    {
      Header: 'Project Name',
      accessor: 'title',
      width: '25%',
      disableFilters: true,
      disableSortBy: true,
      Cell: ({ row }) =>
        <div className="text-sm font-semibold text-gray-800">
          {/* <i className="far fa-eye cursor-pointer" onClick={() => {setActiveInfo(row.original); setShowInfoModal(true);}}></i> */}
          {row.original && row.original.grant && row.original.grant.title}
        </div>
    },
    {
      Header: 'Milestone',
      accessor: 'milestone_number',
      width: '10%',
      disableFilters: true,
      disableSortBy: true,
      Cell: ({ row }) =>
        <div className="text-center text-sm font-semibold text-gray-800">
          {`${(row && row.original && row.original.milestone_number)}/${(row && row.original && row.original.total_milestones)}`}
        </div>
    },
    {
      Header: 'USD',
      accessor: 'amount',
      disableFilters: true,
      disableSortBy: true,
      width: '15%',
      Cell: (row) => (
        <div className="text-center text-sm font-semibold text-gray-800">
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format((row && row.value) / 100)}
        </div>
      ),
    },
    {
      Header: 'STX',
      id: 'stx',
      width: '15%',
      disableFilters: true,
      disableSortBy: true,
      Cell: ({ row }) => (
        <div className="text-center text-sm font-semibold text-gray-800">
          {
            row.original && row.original.grant && row.original.grant.fund_with_usd
              ? '-'
              : ((row.original.amount / row.original.stx_price) / 100).toFixed(6)}
        </div>
      ),
    },
    {
      Header: 'STX Address',
      accessor: 'grant',
      width: '15%',
      disableFilters: true,
      disableSortBy: true,
      Cell: ({ row }) => (
        <div className="flex justify-center items-center">
          {
            row.original?.grant?.wallet_address &&
            <div
              className="w-8 h-8 rounded-md inline-flex justify-center items-center bg-indigo-700 hover:bg-indigo-500 cursor-pointer"
              onClick={(e) => { e.stopPropagation(); setActiveSTXAddress(row.original.grant && row.original.grant.wallet_address); setShowSTXAddress(true) }}
            >
              <i className="far fa-eye text-white" />
            </div>
          }
          <div
            className="w-8 h-8 ml-2 rounded-md inline-flex justify-center items-center bg-indigo-700 hover:bg-indigo-500 cursor-pointer"
            onClick={(e) => onCopy(e, (row.original.grant && row.original.grant.wallet_address), false)}
          >
            <i className="far fa-copy text-white" />
          </div>
          {
            (row.original.grant && row.original.grant.wallet_memo) &&
            <div
              className="w-8 h-8 ml-2 rounded-md inline-flex justify-center items-center bg-indigo-700 hover:bg-indigo-500 cursor-pointer"
              onClick={(e) => { e.stopPropagation(); setShowSTXAddress(row.original.grant && row.original.grant.wallet_address) }}
            >
              <i className="far fa-scroll text-white" />
            </div>
          }
        </div>
      ),
    },
    {
      Header: '',
      id: 'action',
      disableFilters: true,
      disableSortBy: true,
      width: '20%',
      Cell: ({ row }) => {
        return (
        <div className="inline-flex justify-end items-center w-full">
          <button
            className="w-36 p-2 text-sm text-center rounded-md text-white bg-indigo-700 hover:bg-indigo-500"
            onClick={(e) => { e.stopPropagation(); setActive(row.original); (!row.original.funded && setMarkAsFundedModal(true)) }}
          >
            {row.original.funded ? 'Funded' : 'Mark as Funded'}
          </button>
        </div>
      )},
    },
  ];
  return (
    <div className="w-tableWidth xl:w-full">
      <ReactTable
        inputData={inputData}
        inputColumns={COLUMNS}
        leftAlignHeadings={['title']}
        handleSort={handleSort}
        noRecordTitle="We can’t seem to find any records."
        backButton
        refreshButton
        loading={loading}
        pointerOnRow
        handleRowClick={handleRowClick}
      />
    </div>
  );
};

export default PaymentDueTable;