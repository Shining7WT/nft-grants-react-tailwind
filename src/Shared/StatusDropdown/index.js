import React, { useEffect, useState, useRef } from 'react';
import _ from 'lodash';

import StatusColors from '../../constants/statusColors';

const StatusDropdown = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const wrapperRef = useRef(null);
  const filteredData = props.status_type === 'grant' ? [
		... (props.value === 'Pending Docusign' ? [] : _.range(0, props.grantMilestones.length).reduce((acc, r) => (
			[...acc,
			{ value: `M${r + 1} Disburse`, label: `M${r + 1} Disburse` },
			{ value: `M${r + 1}`, label: `M${r + 1}` },
			{ value: `M${r + 1} Review`, label: `M${r + 1} Review` }
			]), [])),
		{ value: 'Complete', label: 'Complete' },
		{ value: 'Closed', label: 'Closed' },
	] : [
		{ value: 'Ready for Funding', label: 'Ready for Funding' },
		{ value: 'Complete', label: 'Complete' },
		{ value: 'Not Started', label: 'Not Started' },
		{ value: 'In Progress', label: 'In Progress' },
	]

  const handleClickOutside = (event) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <>
      <div className="relative" ref={wrapperRef}>
        <div
          className={`"w-full flex items-center justify-between border border-gray-400 rounded-lg p-2 ${ props.isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={() => !props.isDisabled && setShowDropdown(prev => !prev)}
        >
          <div className="flex items-center pl-0 md:pl-2 py-1">
            <div
              className={`w-4 md:w-6 h-4 md:h-6 inline-flex items-center align-middle bg-blue-400 rounded-full`}
              style={{ backgroundColor: StatusColors.find(f => f.title === props.value).color }}
            >
              <i className="far fa-check text-white pl-0.5 md:pl-1 text-xs md:text-base" />
            </div>
            <div className="text-xs md:text-base text-gray-700 font-semibold pl-3">{props.value}</div>
          </div>
          <div>
            <i className="fal fa-angle-down text-gray-400 text-lg py-1 px-0 md:px-2" />
          </div>
        </div>
        <div className="absolute -top-2 left-4 tracking-widest text-xs bg-white text-gray-400">STATUS</div>
        {
          showDropdown &&
          <>
          <div className="absolute w-4 h-4 bg-black transform rotate-45 right-8 top-16" />
          <div className="absolute top-18 w-full p-2 rounded-lg bg-black ">
            <div className="max-h-60 overflow-y-scroll scrollbar scrollbar-thumb-rounded-lg scrollbar-track-transparent scrollbar-thumb-gray-500 scrollbar-w-2">
              {
                filteredData.map((item, index) => (
                  <div className="flex items-center p-2 hover:bg-gray-700 rounded-lg cursor-pointer" onClick={() => props.onChangeStatus(item.value)}>
                    <div
                      className={`w-6 h-6 inline-flex items-center align-middle bg-blue-400 rounded-full`}
                      style={{ backgroundColor: StatusColors.find(f => f.title === item.value).color }}
                    />
                    <div className="text-base font-semibold pl-3 text-white">{item.value}</div>
                  </div>
                ))
              }
            </div>
          </div>
          </>
        }
      </div>
    </>
  );
};

export default StatusDropdown;