import moment from 'moment';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import StatusColors from '../../../constants/statusColors';

const MyGrant = ({ grantFilter, setGrantFilter, recentGrants, pastGrants, onViewMore, avatar, showViewMore }) => {
  let navigate = useNavigate();

  const findActiveMilestone = (data, grantStatus) => {
    let activeMilestone = {};
    if (data.length) {
      activeMilestone = data.find(m => ['Not Started', 'In Progress', 'Under Review'].includes(m.milestone_status))
    }

    const findColor = (status) => {
     let colorStatus = StatusColors.find(f => f.title === status)
     return colorStatus ? colorStatus.color : '#77d1f3'
    }
    return (
      <>
        {
          data.length
          ?
          <div className='flex items-center pb-3'>
            <div className=''>
              <svg width="15" height="15" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 1.71429C0 0.767512 0.767785 0 1.7149 0H6.85958C7.68324 0 8.37127 0.580461 8.53665 1.35449L11.1423 2.85831C11.9625 3.33169 12.2435 4.38014 11.77 5.20007C10.6715 7.10206 8.57448 10.7268 8.44174 10.96C8.10891 11.5446 7.55685 12 6.85958 12H1.7149C0.767785 12 0 11.2325 0 10.2857V1.71429ZM1.7149 1.71429H6.85958V10.2857H1.7149L1.7149 1.71429ZM8.57448 7.30426L10.2848 4.34292L8.57448 3.35581V7.30426Z" fill="#8E8EA1"/>
              </svg>
            </div>
            <div className='text-gray-500 text-sm pl-4 pr-4'>{grantStatus}</div>
            <div
              className='text-sm rounded-md px-2 py-1 bg-gray-100'
              // TODO: I added this && fix for this line but it feels really message to have
              // two && statements back to back like this. We should probably refactor this.
              style={{ color: findColor(activeMilestone?.milestone_status) }}
            >{activeMilestone?.title}</div>
          </div>
          :
          <div className='flex items-center pb-3'>
            <div className=''>
              <svg width="15" height="15" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 1.71429C0 0.767512 0.767785 0 1.7149 0H6.85958C7.68324 0 8.37127 0.580461 8.53665 1.35449L11.1423 2.85831C11.9625 3.33169 12.2435 4.38014 11.77 5.20007C10.6715 7.10206 8.57448 10.7268 8.44174 10.96C8.10891 11.5446 7.55685 12 6.85958 12H1.7149C0.767785 12 0 11.2325 0 10.2857V1.71429ZM1.7149 1.71429H6.85958V10.2857H1.7149L1.7149 1.71429ZM8.57448 7.30426L10.2848 4.34292L8.57448 3.35581V7.30426Z" fill="#8E8EA1"/>
              </svg>
            </div>
            <div className='text-gray-500 text-sm pl-4 pr-4'>No active milestone</div>
          </div>
        }
      </>
    )
  };

  return (
    <>
      <div className="">
        <div className="">
          <div className="flex items-center">
            <p className="text-xl md:text-2xl font-bold text-gray-900">My Grant</p>
            <p
              className={`text-sm font-medium py-1 cursor-pointer border-b ${grantFilter === 'current' ? 'border-gray-900 text-gray-900' : 'border-gray-50 text-gray-500' } hover:text-gray-600 ml-10 md:ml-16`}
              onClick={() => setGrantFilter('current')}
            >
              Current
            </p>
            <p
              className={`text-sm font-medium py-1 cursor-pointer border-b ${grantFilter === 'past' ? 'border-gray-900 text-gray-900' : 'border-gray-50 text-gray-500' } hover:text-gray-600 ml-7`}
              onClick={() => setGrantFilter('past')}
            >
              Past
            </p>

            <p
              className={`flex items-center text-sm font-medium py-1 cursor-pointer border-b border-indigo-600 text-indigo-600 hover:text-indigo-700 hover:border-indigo-700 ml-10`}
              onClick={() => navigate('/grant-application')}
            >
              <span className="pr-3">+</span><p>New Grant</p>
            </p>
          </div>
          <div className='mt-8 w-full max-h-72 overflow-y-scroll scrollbar scrollbar-thumb-rounded-lg scrollbar-track-gray-200 scrollbar-thumb-gray-500 scrollbar-w-1'>
            {
              grantFilter === 'current'
                ? (
                  <div className='pr-3'>
                    {
                      recentGrants.length
                      ?
                      recentGrants.map((item, index) => (
                        <div className='bg-white rounded-lg p-5 mb-3 shadow-md cursor-pointer' onClick={() => navigate(`/dashboard/grants/${item.id}`)}>
                          <div className='flex items-start'>
                            <div className='w-12 h-10 rounded-full mr-4 bg-cover' style={{ backgroundImage: `url(${avatar})`}} />
                            <div className='w-full'>
                              <p className='font-medium text-base pb-3'>{item.title}</p>
                              {
                                findActiveMilestone(item.milestones, item.grant_status)
                              }
                              <div className='flex items-center'>
                                <div className='pr-4'><i class="far fa-clock text-gray-500"/></div>
                                <div className='text-gray-500 text-sm pr-4'>Updated {moment(item.updated_at).format('MM/DD/YYYY h:mm A')}</div>
                              </div>
                            </div>
                            <div className=''><i class="far fa-external-link text-gray-500" /></div>
                          </div>
                        </div>
                      ))
                      : <div className='flex justify-center items-center w-full'>
                        <p className='p-3 text-gray-500 text-sm font-semibold'>No Grants Found</p>
                      </div>
                    }
                    {
                      recentGrants.length && showViewMore
                      ? (
                        <div className='flex justify-center items-center w-full'>
                          <button className='rounded-lg bg-gray-100 hover:bg-gray-200 p-3 text-gray-500 text-sm font-semibold' onClick={() => onViewMore()}>View More</button>
                        </div>
                      )
                      : null
                    }
                  </div>
                )
                : (
                  <div className='pr-3'>
                    {
                      pastGrants.length
                      ?
                      pastGrants.map((item, index) => (
                        <div className='bg-white rounded-lg p-5 mb-3 shadow-md cursor-pointer' onClick={() => navigate(`/dashboard/grants/${item.id}`)}>
                          <div className='flex items-start'>
                            <div className='w-12 h-10 rounded-full mr-4 bg-cover' style={{ backgroundImage: `url(${avatar})`}} />
                            <div className='w-full'>
                              <p className='font-medium text-base pb-3'>{item.title}</p>
                              {
                                findActiveMilestone(item.milestones, item.grant_status)
                              }
                              <div className='flex items-center'>
                                <div className='pr-4'><i class="far fa-clock text-gray-500"/></div>
                                <div className='text-gray-500 text-sm pr-4'>Updated {moment(item.updated_at).format('MM/DD/YYYY h:mm A')}</div>
                              </div>
                            </div>
                            <div className=''><i class="far fa-external-link text-gray-500" /></div>
                          </div>
                        </div>
                      ))
                      :
                      <div className='flex justify-center items-center w-full'>
                        <p className='p-3 text-gray-500 text-sm font-semibold'>No Grants Found</p>
                      </div>
                    }
                    {
                      pastGrants.length && showViewMore
                      ? (
                        <div className='flex justify-center items-center w-full'>
                          <button className='rounded-lg bg-gray-100 hover:bg-gray-200 p-3 text-gray-500 text-sm font-semibold' onClick={() => onViewMore()}>View More</button>
                        </div>
                      )
                      : null
                    }
                  </div>
                )
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default MyGrant;