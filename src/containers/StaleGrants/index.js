import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import useDebounce from '../../Shared/UseDebounce';
import Pagination from '../../Shared/Pagination';
import StaleGrantTable from './components/StagleGrantTable';
import { fetchStaleGrantsAction, fetchGrantAction } from '../../redux/actions/GrantAction';
import { updateStaleGrantAction } from '../../redux/actions/GrantAction';
import ElementModal from '../../Shared/ElementModal';
import GrantOverviewTable from '../SingleGrant/components/GrantOverviewTable';

const StaleGrants = ({ stale_grants, stale_grants_total, loading, grant, fetchStaleGrants, updateStaleGrant, fetchGrant }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeInfo, setActiveInfo] = useState({});
  const [showInfoModal, setShowInfoModal] = useState(false);
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

  const handleRowClick = (row) => {
    setActiveInfo(row);
    setShowInfoModal(true);
  };

  const onFollow = (grant) => {
		updateStaleGrant({
			id: grant.id
		})
	};

  useEffect(() => {
    fetchStaleGrants({
      params: {
        ...(orderBy && {order: orderBy}),
        page: searchTerm !== '' ? 0 : currentPage - 1
      },
      ...(searchTerm !== '' && {
        search: searchTerm.trim(),
      }),
    })
  }, [debouncedSearchTerm, currentPage, orderBy,]);

  return (
    <>
      <div className="block lg:flex justify-between items-center px-5 lg:px-10 xl:px-20 bg-white py-12">
        <div className="text-black font-bold text-4xl leading-10">Stale Grants</div>
        <div className="flex items-center justify-start mt-5 lg:mt-0 w-auto lg:w-72 h-12 py-4 pl-5 bg-white shadow-md border border-gray-300 rounded-lg">
          <p className="text-lg text-center text-gray-800">
            <i className="far fa-search" />
          </p>
          <input type="text" className="pl-2 md:pl-5 text-base md:text-lg text-gray-600 outline-none" placeholder="Search" onChange={onSearch} />
        </div>
      </div>
      <div className="mt-12 bg-white rounded-lg shadow-md border border-gray-200 overflow-x-auto mx-5 lg:mx-10 xl:mx-20">
        <StaleGrantTable
          inputData={stale_grants}
          handleSort={handleSort}
          loading={loading}
          handleRowClick={handleRowClick}
          onFollow={onFollow}
        />
      </div>
      <div className="mt-7 w-full inline-flex justify-end items-center px-5 lg:px-10 xl:px-20">
        {
          stale_grants_total > 20 && (
            <Pagination
              total={stale_grants_total}
              dataPerPage={20}
              setCurrentPage={setCurrentPage}
              currentLength={stale_grants.length}
            />
          )
        }
      </div>
      {
        showInfoModal &&
        <ElementModal
          open={showInfoModal}
          component={<GrantOverviewTable grant={activeInfo} onClose={() => setShowInfoModal(false)} type="modal" />}
          onClose={() => setShowInfoModal(false)}
        />
      }
    </>
  );
};

export default connect(state => {
	return {
		stale_grants: state.grants.stale_grants,
		stale_grants_total: state.grants.stale_grants_total,
		loading: state.grants.loading,
		grant: state.grants.grant
	}
}, dispatch => {
	return {
		fetchStaleGrants: data => dispatch(fetchStaleGrantsAction(data)),
		updateStaleGrant: data => dispatch(updateStaleGrantAction(data)),
		fetchGrant: data => dispatch(fetchGrantAction(data)),
	}
})(StaleGrants);