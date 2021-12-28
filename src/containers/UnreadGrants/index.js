import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import useDebounce from '../../Shared/UseDebounce';
import Pagination from '../../Shared/Pagination';
import UnreadGrantsTable from './components/UnreadGrantsTable';
import { fetchQueuedGrantsAction, updateQueuedGrantAction } from '../../redux/actions/GrantAction';

const UnreadGrants = ({
  queued_grants, queued_grants_total, loading, fetchQueuedGrants, updateQueuedGrant
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
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

  useEffect(() => {
    fetchQueuedGrants({
      params: {
        related: 'milestones',
        ...(orderBy && {order: orderBy}),
        page: searchTerm !== '' ? 0 : currentPage
      },
      ...(searchTerm !== '' && {
        searchValue: searchTerm.trim(),
      }),
    })
  }, [debouncedSearchTerm, currentPage, orderBy]);
  
  return (
    <>
      <div className="block lg:flex justify-between items-center px-5 lg:px-10 xl:px-20 bg-white py-12">
        <div className="text-black font-bold text-4xl leading-10">Unread Notifications</div>
        <div className="flex items-center justify-start mt-5 lg:mt-0 w-auto lg:w-72 h-12 py-4 pl-5 bg-white shadow-md border border-gray-300 rounded-lg">
          <p className="text-lg text-center text-gray-800">
            <i className="far fa-search" />
          </p>
          <input type="text" className="pl-2 md:pl-5 text-base md:text-lg text-gray-600 outline-none" placeholder="Search" onChange={onSearch} />
        </div>
      </div>
      <div className="mt-12 bg-white rounded-lg shadow-md border border-gray-200 overflow-x-auto mx-5 lg:mx-10 xl:mx-20">
        <UnreadGrantsTable
          inputData={queued_grants}
          handleSort={handleSort}
          loading={loading}
        />
      </div>
      <div className="mt-7 w-full inline-flex justify-end items-center px-5 lg:px-10 xl:px-20">
        {
          queued_grants_total > 20 && (
            <Pagination
              total={queued_grants_total}
              dataPerPage={20}
              setCurrentPage={setCurrentPage}
              currentLength={queued_grants.length}
            />
          )
        }
      </div>
    </>
  );
};

export default connect(state => {
  return {
    queued_grants: state.grants.queued_grants,
		queued_grants_total: state.grants.queued_grants_total,
		loading: state.grants.loading
  }
}, dispatch => {
  return {
    fetchQueuedGrants: data => dispatch(fetchQueuedGrantsAction(data)),
		updateQueuedGrant: data => dispatch(updateQueuedGrantAction(data)),
  }
})(UnreadGrants)