import React, { useState } from 'react';
import checkBlueIcon from '../../../../img/activity/check_blue.svg';
import checkGreenIcon from '../../../../img/activity/check_green.svg';
import messageIcon from '../../../../img/activity/message.svg';
import './Activity.scss'

const RecentActivity = ({}) => {
  const [selectTab, setSelectTab] = useState(1);

  const handleClick = (tabId) => {
    setSelectTab(tabId);
  };

  const TabsList = [
    { id: 1, name: "Last 30 days" },
    { id: 2, name: "All time" },
  ];

  const ContentsList = [
    {
      id: 1,
      type: "check",
      icon: checkBlueIcon,
      title: "Grant Approved",
      description: "Your grant was approved! Some message here to describe what to do and expect next."
    },
    {
      id: 2,
      type: "message",
      icon: messageIcon,
      commenterName: "Steve Johnson",
      externalLink: "Ocelo.Io",
      description: "We’ll need to connect more on this, please Ping me in order to complete in time...",
    },
    {
      id: 3,
      type: "check",
      icon: checkGreenIcon,
      title: "Milestone Approval Requested",
      description: "Your grant was approved! Some message here to describe what to do and expect next."
    },
    {
      id: 4,
      type: "check",
      icon: checkBlueIcon,
      title: "Grant Approved",
      description: "Your grant was approved! Some message here to describe what to do and expect next."
    },
    {
      id: 5,
      type: "message",
      icon: messageIcon,
      commenterName: "Steve Johnson",
      externalLink: "Ocelo.Io",
      description: "We’ll need to connect more on this, please Ping me in order to complete in time...",
    },
    {
      id: 6,
      type: "check",
      icon: checkGreenIcon,
      title: "Milestone Approval Requested",
      description: "Your grant was approved! Some message here to describe what to do and expect next."
    },
  ];

  return (
    <div className="">
      <div className="flex items-end justify-between pb-5 md:pb-8">
        <div className="">
          <p className="text-xl md:text-2xl font-bold text-gray-900">
            Recent Activity
          </p>
        </div>
        <div className="flex items-center justify-end">
          {TabsList.map((tab) => {
            return (
              <div
                key={tab.id}
                className={`text-sm ml-2 xl:ml-5 cursor-pointer border-b pb-1 ${(tab.id === selectTab && "border-black") || "border-transparent text-gray-400"}`}
                onClick={() => handleClick(tab.id)}
              >
                {tab.name}
              </div>
            )
          })
          }
        </div>
      </div>
      <div className='px-5 py-5 bg-white rounded-lg'>
        <div className="relative pr-5 overflow-y-scroll scrollbar scrollbar-thumb-rounded-lg scrollbar-track-gray-200 scrollbar-thumb-gray-500 scrollbar-w-1 max-h-72">
          {ContentsList.map((item) => {
            return (
              <div key={item.id} className="flex items-start justify-start activity-item">
                <div className="activity-icon">
                  <img src={item.icon} alt="icon" />
                </div>
                <div className="activity-content">
                  <div className="title pb-3">
                    {
                      item.type === "check" && item.title ||
                      <>
                        {item.commenterName}
                        <p className="text"> commented on </p>
                        <a href={item.externalLink} className="link">
                          {item.externalLink}
                        </a>
                      </>
                    }
                  </div>
                  <div className={`description ${item.type === "message" && "outline"}`}>
                    {item.description}
                  </div>
                </div>
              </div>
            )
          })
          }
        </div>
      </div>
    </div>
  )
}

export default RecentActivity;