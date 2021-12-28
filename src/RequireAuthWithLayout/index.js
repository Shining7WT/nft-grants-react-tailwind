import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'querystring';
import history from '../@history';
import Loading from 'react-loading-overlay';
import jwt from 'jsonwebtoken';

import Layout from '../containers/Layout';
import { getGrants } from '../api/Grant';

const RequireAuthWithLayout = ({ children, ...props }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem('grant_app_token');
  const navigate = useNavigate();

  const findLoading = (data) => {
    let states = Object.keys(data);
    let loading = false;
    states.forEach(state => {
      if (data[state].loading) {
        loading = true;
      }
    })
    return loading;
  };

  const fetchGrants = async (userToken) => {
    let user = jwt.decode(userToken)
    const res = await getGrants({
        params: {
            'filter[github_owner_id]': user && user.github_id
        },
        headers: {
            Authorization: `bearer ${userToken}`
        }
    })
    if (res.success) {
        if (res.data.results.length === 0) {
          navigate('/no-grants')
        } else if (res.data.results.length === 1) {
          navigate(`/onboard?q=${res.data.results[0].grant_token}`)
        } else {
          navigate(`/error-page`)
        }
    }
}

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    } else if (history.location.search.includes('auth')) {
      let query = queryString.parse(history.location.search)
      if (query['?auth']) {
        localStorage.setItem('grant_app_token', query['?auth'])
        const user = jwt.decode(query['?auth'])
        if (!user.is_admin) fetchGrants(query['?auth'])
        else {navigate("/"); console.log('***redirecting to /')}
      }
    } else {
      setIsAuthenticated(false);
      navigate("/login")
    }
  }, [token]);

  return (
    <>
      {
        token
          ? (
            <Loading
              active={findLoading(props)}
              spinner
              className="h-full"
              text=""
            >
              <Layout>{children}</Layout>
            </Loading>
          )
          : (
            <Navigate to="/login" replace />
          )
      }
    </>
  )
};

export default connect(state => state)(RequireAuthWithLayout);