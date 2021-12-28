import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from 'react-loading-overlay'

const RequireAuth = ({ children, ...props }) => {
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
  }

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
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
              {children}
            </Loading>
          )
          : (
            <Navigate to="/login" replace />
          )
      }
    </>
  )
};

export default connect(state => state)(RequireAuth);