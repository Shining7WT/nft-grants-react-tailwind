import React, { useState, useEffect, useRef } from "react";
import jwt from 'jsonwebtoken';
import moment from "moment";
import { connect } from 'react-redux';
import axios from 'axios';

import MyGrant from "./components/MyGrant";
import RecentActivity from "./components/RecentActivity";
import StxChart from './components/StxChart';
import MiniConverter from "./components/MiniConverter";
import { fetchGrantsAction } from '../../redux/actions/GrantAction';
import { getStackPrice } from "../../api/Stacks";

const MyDashboard = ({ grants, total, loading, fetchGrants }) => {
  const [grantFilter, setGrantFilter] = useState('current');
  const [notificationCount, setNotificationCount] = useState(1);
  const [showNotificationBox, setShowNotificationBox] = useState(false);
  const [greetMsg, setGreetMsg] = useState('');
  const [orderBy, setOrderBy] = useState('-id');
  const [perPage, setPerPage] = useState(10);
  const [recentGrants, setRecentGrants] = useState([]);
  const [pastGrants, setPastGrants] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [currentSTXPrice, setCurrentSTXPrice] = useState(0);
  const [activeDateFilter, setActiveDateFilter] = useState('one_day');
  const user = jwt.decode(localStorage.getItem('grant_app_token'));
  const notificationRef = useRef(null);
  const notifications = [
    {
      title: 'Grant Approved',
      description: 'Your grant was approved! Some message here to describe what to do and expect next.',
    },
    {
      title: 'Grant Approved',
      description: 'Your grant was approved! Some message here to describe what to do and expect next.',
    },
    {
      title: 'Grant Approved',
      description: 'Your grant was approved! Some message here to describe what to do and expect next.',
    },
    {
      title: 'Grant Approved',
      description: 'Your grant was approved! Some message here to describe what to do and expect next.',
    },
  ];

  const handleClickOutside = (event) => {
    if (!notificationRef.current.contains(event.target)) {
      setShowNotificationBox(false);
    }
  };

  const handleNotification = () => {
    setShowNotificationBox(prev => !prev);
    setNotificationCount(0);
  };

  const chartFilter = (timeline) => {
    const url = 'https://api.coingecko.com/api/v3/coins/blockstack/market_chart/range?vs_currency=usd&'
    switch (timeline) {
      case 'one_day':
        let one_day_from = moment().startOf('day').unix()
        let one_day_to = moment().unix()
        const oneDayURL = `${url}from=${one_day_from}&to=${one_day_to}`
        axios.get(oneDayURL)
        .then(res => setChartData(res?.data?.prices))
        .catch(err => console.log('Error', err))
        break
      case 'one_week':
        let one_week_from = moment().startOf('week').unix()
        let one_week_to = moment().unix()
        const oneWeekURL = `${url}from=${one_week_from}&to=${one_week_to}`
        axios.get(oneWeekURL)
        .then(res => setChartData(res?.data?.prices))
        .catch(err => console.log('Error', err))
        break
      case 'one_month':
        let one_month_from = moment().startOf('month').unix()
        let one_month_to = moment().unix()
        const oneMonthURL = `${url}from=${one_month_from}&to=${one_month_to}`
        axios.get(oneMonthURL)
        .then(res => setChartData(res?.data?.prices))
        .catch(err => console.log('Error', err))
        break
      case 'one_year':
        let one_year_from = moment().startOf('year').unix()
        let one_year_to = moment().unix()
        const oneYearURL = `${url}from=${one_year_from}&to=${one_year_to}`
        axios.get(oneYearURL)
        .then(res => setChartData(res?.data?.prices))
        .catch(err => console.log('Error', err))
        break
      case 'all':
        let all_from = 1572307200
        let all_to = moment().unix()
        const oneAllURL = `${url}from=${all_from}&to=${all_to}`
        axios.get(oneAllURL)
        .then(res => setChartData(res?.data?.prices))
        .catch(err => console.log('Error', err))
        break
      default:
    }
  };

  const fetchSTXPrice = async () => {
    let url = `https://api.coingecko.com/api/v3/simple/price?ids=blockstack&vs_currencies=usd`;
     axios.get(url)
      .then(res => setCurrentSTXPrice(res?.data?.blockstack?.usd))
      .catch(err => console.log('Error', err))
  };

  useEffect(() => {
    chartFilter(activeDateFilter)
  }, [activeDateFilter]);

  useEffect(() => {
    fetchSTXPrice()
  }, []);

  useEffect(() => {
    if (grants.length) {
      let past = grants.filter(item => ['Closed', 'Complete'].includes(item.grant_status))
      let pastIds = past.map(i => i.id)
      let recent = grants.filter(i => !pastIds.includes(i.id));
      setPastGrants(past);
      setRecentGrants(recent);
    }
  }, [grants]);

  useEffect(() => {
    fetchGrants({
      params: {
        ...(orderBy && {order: orderBy}),
        perPage: perPage,
        related: 'milestones',
        'filter[github_owner_id]': user && user.github_id
      },
    })
  }, [perPage]);

  useEffect(() => {
    let time = Number(moment().format('HH'));
    if (time > 3 && time < 12) setGreetMsg('Good Morning');
    else if (time > 12 && time < 17) setGreetMsg('Good Afternoon');
    else setGreetMsg('Good Evening');
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row items-center bg-white pt-5 lg:pt-10 xl:pt-16 px-5 lg:px-10 xl:px-20 pb-16">
        <div className="w-full">
          <p className="text-black text-4xl capitalize">{greetMsg}, {user?.name ? user.name.split(' ')[0] : ''}</p>
        </div>
        <div className="w-full flex justify-start md:justify-end mt-5 md:mt-0">
          <div className="flex justify-end items-center w-auto md:w-full">
            <div className="rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center p-4 text-gray-500 text-sm font-semibold cursor-pointer">
              <div><i class="fas fa-cog" /></div>
              <div className="pl-3">Account Settings</div>
            </div>
          </div>
          <div className="ml-5 relative" ref={notificationRef}>
            <div className="py-4 px-4 w-14 rounded-lg flex items-center justify-center cursor-pointer bg-gray-100 hover:bg-gray-200 text-lg" onClick={() => handleNotification()}>
              {
                showNotificationBox
                  ? <i class="fal fa-times text-indigo-600" />
                  : <i class={`far fa-bell ${notificationCount ? 'text-indigo-600' : 'text-gray-500'}`} />
              }
            </div>
            {notificationCount ? <div className="absolute rounded-full py-0.5 px-1.5 -top-1 -right-2 text-xs text-white bg-indigo-600">{notificationCount}</div> : null}
            {
              (showNotificationBox)
                ? (
                  <div className="rounded-lg z-40 bg-gray-700 shadow-md p-4 absolute top-18 -left-48 md:-left-86 lg:-left-84 xl:-left-80">
                    <div className="relative max-h-56 w-84 md:w-96 overflow-y-scroll scrollbar scrollbar-thumb-rounded-lg scrollbar-track-gray-900 scrollbar-thumb-white-light scrollbar-w-1">
                      {
                        notifications.map((item, index) => (
                          <>
                            <div className="py-4 last:border-0 flex items-start">
                              <div className="flex items-center justify-center w-12 h-8 rounded-full border border-gray-300 mr-4">
                                <div className="text-white"><i className="far fa-check text-lg" /></div>
                              </div>
                              <div className="">
                                <p className="font-semibold text-white text-sm pb-2">{item.title}</p>
                                <p className="text-gray-300 text-xs">{item.description}</p>
                              </div>
                            </div>
                          </>
                        ))
                      }
                    </div>
                    <div className="absolute w-4 h-4 bg-gray-700 transform rotate-45 right-36 md:right-4 lg:right-8 xl:right-14 -top-2" />
                  </div>
                )
                : null
            }
          </div>
        </div>
      </div>
      <div className="pt-5 lg:pt-10 xl:pt-16 px-5 lg:px-10 xl:px-20 rounded-md h-full pb-10">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-20">
          {
            isCollapsed
            ? (
              <div className="col-span-2">
                <div className="flex items-center">
                  <p className="text-xl md:text-2xl font-bold text-gray-900 mb-7 w-full">STX Price Information</p>
                  <button className="float-right flex rounded-lg py-3 px-5 bg-gray-200 hover:bg-gray-300 text-sm text-gray-500 font-semibold mb-7" onClick={() => setIsCollapsed(prev => !prev)}>
                    <span className="pr-3">
                      { isCollapsed ? <i class="far fa-minus" /> : <i class="far fa-plus" /> }
                    </span>
                    Collapse
                  </button>
                </div>
                <div className="flex">
                  <StxChart
                    getStackPrice={getStackPrice}
                    isCollapsed={isCollapsed}
                    setChartData={setChartData}
                    chartData={chartData}
                    currentSTXPrice={currentSTXPrice}
                    activeDateFilter={activeDateFilter}
                    setActiveDateFilter={setActiveDateFilter}
                  />
                  <MiniConverter
                    getStackPrice={getStackPrice}
                    isCollapsed={isCollapsed}
                    setIsCollapsed={setIsCollapsed}
                  />
                </div>
              </div>
            )
            : (
              <>
                <StxChart
                  getStackPrice={getStackPrice}
                  isCollapsed={isCollapsed}
                  setChartData={setChartData}
                  chartData={chartData}
                  currentSTXPrice={currentSTXPrice}
                  activeDateFilter={activeDateFilter}
                  setActiveDateFilter={setActiveDateFilter}
                />
                <MiniConverter
                  getStackPrice={getStackPrice}
                  isCollapsed={isCollapsed}
                  setIsCollapsed={setIsCollapsed}
                />
              </>
            )
          }
          <MyGrant
            grantFilter={grantFilter}
            setGrantFilter={setGrantFilter}
            recentGrants={recentGrants}
            pastGrants={pastGrants}
            onViewMore={() => setPerPage(prev => prev + 10)}
            avatar={user?.avatar_url}
            showViewMore={grants.length < total}
          />
          <RecentActivity/>
        </div>
      </div>
    </>
  );
};

export default connect(state => {
  return {
    grants: state.grants.grants,
    total: state.grants.total,
    loading: state.grants.loading,
  }
}, dispatch => {
  return {
    fetchGrants: data => dispatch(fetchGrantsAction(data)),
  }
})(MyDashboard)
