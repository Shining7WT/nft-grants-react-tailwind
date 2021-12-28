import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken';

import GrantCard from './components/GrantCard';
import GrantsTable from './components/GrantsTable';
import { fetchGrantsAction, fetchQueuedGrantsAction, fetchStaleGrantsAction } from '../../redux/actions/GrantAction';
import { fetchMilestonesAction } from '../../redux/actions/MilestoneAction';
import useDebounce from '../../Shared/UseDebounce';
import Pagination from '../../Shared/Pagination';

const Dashboard = ({
  fetchGrants,
  grants,
  total,
  fetchQueuedGrants,
  stale_grants_total,
  fetchStaleGrants,
  queued_grants_total,
  fetchMilestones,
  totalReviewMilestones,
  loading,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState('-id');
  const [currentPage, setCurrentPage] = useState(0);
  const [filterBy, setFilter] = useState(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 600);
  const user = jwt.decode(localStorage.getItem('grant_app_token'))
  const navigate = useNavigate();

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

  const handleRowClick = (row) => {
    window.scrollTo(0, 0);
    navigate(`/dashboard/grants/${row.id}`)
  };

  useEffect(() => {
    if (user && !user.is_admin) {
      localStorage.removeItem('grant_app_token')
      navigate(`/error-page`)
    }
    if (user && user.is_admin && !user.id) {
      navigate(`/logout`)
    }
  }, [user]);

  useEffect(() => {
    fetchQueuedGrants({
      params: {
        perPage: 10000000
      }
    })
    fetchStaleGrants({
      params: {
        perPage: 10000000
      }
    })
    fetchMilestones({
      params: {
        perPage: 10000000,
        'filter[ready_for_review]': true
      }
    })
  }, [])

  useEffect(() => {
    fetchGrants({
      params: {
        related: 'milestones',
        ...(orderBy && {order: orderBy}),
        ...(filterBy && {'filter[grant_status]': filterBy.value }),
        page: searchTerm !== '' ? 0 : currentPage
      },
      ...(searchTerm !== '' && {
        searchValue: searchTerm.trim(),
      }),
    })
  }, [debouncedSearchTerm, currentPage, orderBy, filterBy]);

  return (
    <>
      <div className="block lg:flex justify-between items-center pt-5 lg:pt-10 xl:pt-16 px-5 lg:px-10 xl:px-20 pb-12 bg-white">
        <div className="text-black font-bold text-4xl leading-10">Grants Overview</div>
        <div className="flex items-center justify-start mt-5 lg:mt-0 w-auto lg:w-72 h-12 py-4 pl-5 bg-white shadow-md border border-gray-300 rounded-lg">
          <p className="text-lg text-center text-gray-800">
            <i className="far fa-search" />
          </p>
          <input type="text" className="pl-2 md:pl-5 text-base md:text-lg text-gray-600 outline-none" placeholder="Search" onChange={onSearch} />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-5 xl:gap-16 px-5 lg:px-10 xl:px-20 mt-12">
        <GrantCard
          heading="Unread Update"
          count={queued_grants_total || 0}
          path="/grants/unread"
          buttonColor="#6357FE"
        />
        <GrantCard
          heading="Milestones Ready For Review"
          count={totalReviewMilestones || 0}
          path="/"
          buttonColor="#2ECC71"
        />
        <GrantCard
          heading="Stale Grants"
          count={stale_grants_total || 0}
          path="/grants/stale"
          buttonColor="#FFB648"
        />
      </div>
      <div className="mt-12 bg-white rounded-lg shadow-md border border-gray-200 overflow-x-auto mx-5 lg:mx-10 xl:mx-20">
        <GrantsTable
          inputData={grants}
          handleSort={handleSort}
          handleFilter={handleFilter}
          setFilter={setFilter}
          filterBy={filterBy}
          loading={loading}
          handleRowClick={handleRowClick}
        />
      </div>
      <div className="mt-7 w-full inline-flex justify-end items-center lg:px-10 xl:px-20">
        {
          total > 20 && (
            <Pagination
              total={total}
              dataPerPage={20}
              setCurrentPage={setCurrentPage}
              currentLength={grants.length}
            />
          )
        }
      </div>
    </>
  );
};

export default connect(state => {
  return {
    grants: state.grants.grants,
    total: state.grants.total,
    loading: state.grants.loading,
    queued: state.grants.queued_grants,
    stale_grants_total: state.grants.stale_grants_total,
    queued_grants_total: state.grants.queued_grants_total,
    totalReviewMilestones: state.milestones.total
  }
}, dispatch => {
  return {
    fetchGrants: data => dispatch(fetchGrantsAction(data)),
    fetchQueuedGrants: data => dispatch(fetchQueuedGrantsAction(data)),
    fetchStaleGrants: data => dispatch(fetchStaleGrantsAction(data)),
    fetchMilestones: data => dispatch(fetchMilestonesAction(data)),
  }
})(Dashboard)