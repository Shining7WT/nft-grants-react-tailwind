import React, { Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { connect } from 'react-redux';
import history from './@history';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loading from "./common/Loading";
import PageNotFound from "./common/PageNotFound";
import RequireAuthWithLayout from "./RequireAuthWithLayout";
import RequireAuth from "./RequireAuth";

import { MyAccount , UserEdit } from "./containers/UserProfile";

const Login = React.lazy(() => import("./containers/Auth/Login"));
const Dashboard = React.lazy(() => import("./containers/Dashboard"));
const PaymentDue = React.lazy(() => import("./containers/PaymentDue"));
const FundingLedger = React.lazy(() => import("./containers/FundingLedger"));
const Reporting = React.lazy(() => import("./containers/Reporting"));
const StaleGrants = React.lazy(() => import("./containers/StaleGrants"));
const Converter = React.lazy(() => import("./containers/Converter"));
const MilestoneForm = React.lazy(() => import("./containers/MilestoneForm"));
const NewGrantForm = React.lazy(() => import("./containers/NewGrantForm"));
const UnreadGrants = React.lazy(() => import("./containers/UnreadGrants"));
const SingleGrant = React.lazy(() => import("./containers/SingleGrant"));
const ConfirmPage = React.lazy(() => import("./common/Confirmation"));
const ErrorPage = React.lazy(() => import("./common/ErrorPage"));
const NoGrant = React.lazy(() => import("./common/NoGrant"));
const GrantApplication = React.lazy(() => import("./containers/GrantApplication"));
const Recipients = React.lazy(() => import("./containers/Recipients"));
const SingleRecipient = React.lazy(() => import("./containers/SingleRecipient"));
const MyDashboard = React.lazy(() => import("./containers/MyDashboard"));
const GrantOverview = React.lazy(() => import("./containers/GrantOverview"));

function DashBoardLoader () {
  return (
    <div className="grid place-items-center h-screen bg-black bg-opacity-70">
      <Loading />
    </div>
  );
}

let Notification = (props) => {
  useEffect(() => {
    if (props.notification.id) {
      if (props.notification.success)
        toast.dark(props.notification.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      else
        toast.error(props.notification.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
    }
  }, [props.notification && props.notification.id]);
  return <></>
};
Notification = connect(state => {
  return {
    notification: state.global.notification
  }
})(Notification)

function App() {
  return (
    <>
      <Router history={history}>
        <Suspense fallback={<DashBoardLoader />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={ <RequireAuthWithLayout> <Dashboard /> </RequireAuthWithLayout> } />
            <Route path="/dashboard/grants/:id" element={ <RequireAuthWithLayout> <SingleGrant /> </RequireAuthWithLayout> } />
            <Route path="/my-dashboard" element={ <RequireAuthWithLayout> <MyDashboard /> </RequireAuthWithLayout> } />
            <Route path="/ready-for-funding" element={ <RequireAuthWithLayout> <PaymentDue /> </RequireAuthWithLayout> } />
            <Route path="/funding-ledger" element={ <RequireAuthWithLayout> <FundingLedger /> </RequireAuthWithLayout> } />
            <Route path="/report" element={ <RequireAuthWithLayout> <Reporting /> </RequireAuthWithLayout> } />
            <Route path="/grants/stale" element={ <RequireAuthWithLayout> <StaleGrants /> </RequireAuthWithLayout> } />
            <Route path="/converter" element={ <RequireAuthWithLayout> <Converter /> </RequireAuthWithLayout> } />
            <Route path="/grants/unread" element={ <RequireAuthWithLayout> <UnreadGrants /> </RequireAuthWithLayout> } />
            <Route path="/recipients" element={ <RequireAuthWithLayout> <Recipients /> </RequireAuthWithLayout> } />
            <Route path="/recipient/:id" element={ <RequireAuthWithLayout> <SingleRecipient /> </RequireAuthWithLayout> } />
            <Route path="/grant-application" element={ <RequireAuth> <GrantApplication /> </RequireAuth> } />
            <Route path="/milestone-checkin" element={ <RequireAuth> <MilestoneForm /> </RequireAuth> } />
            <Route path="/onboard" element={ <RequireAuth> <NewGrantForm /> </RequireAuth> } />
            <Route path="/olvis" element={ <RequireAuth> <GrantOverview /> </RequireAuth> } />
            <Route path="/confirmation" element={<ConfirmPage />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/user-edit" element={<UserEdit />} />
            <Route path="/error-page" element={<ErrorPage />} />
            <Route path="/no-grants" element={<NoGrant />} />
            <Route path="*" element={<RequireAuthWithLayout> <PageNotFound /> </RequireAuthWithLayout>} />
          </Routes>
          <ToastContainer />
          <Notification />
        </Suspense>
      </Router>
    </>
  );
}

export default App;