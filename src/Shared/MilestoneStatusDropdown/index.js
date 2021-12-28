import React, { useEffect, useState, useRef } from 'react';

import StatusColors from '../../constants/statusColors';

const MilestoneStatusDropdown = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const wrapperRef = useRef(null);
  const filteredData = [
    {value:'Complete', label:'Complete'},
    {value:'Not Started', label:'Not Started'},
    {value:'In Progress',label:'In Progress'},
    {value:'Closed',label:'Closed'},
    {value:'Under Review',label:'Under Review'},
    {value:'Ready for Funding',label:'Ready for Funding'}
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
          className={`w-full flex items-center justify-between border border-gray-400 rounded-lg p-1 ${(props.isDisabled || props.isNewMilestone || props.notSaved) ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={() => (!props.isDisabled || props.isNewMilestone || props.notSaved) && setShowDropdown(prev => !prev)}
          style={{ backgroundColor: StatusColors.find(f => f.title === props.selectedValue).color }}
        >
          <div className="flex items-center">
            <div className="text-xs md:text-base pl-3 text-white">{props.selectedValue}</div>
          </div>
          <div>
            {
              !props.notSaved && <i className="fal fa-angle-down text-white text-lg px-2" />
            }
          </div>
        </div>
        {
          showDropdown &&
          <>
          <div className="absolute w-4 h-4 bg-black transform rotate-45 right-8 top-12" />
          <div className="absolute top-14 w-full p-2 rounded-lg bg-black">
            {
              filteredData.map((item, index) => (
                <div className="flex items-center p-2 hover:bg-gray-700 rounded-lg cursor-pointer" onClick={() => props.onChangeHandler(item.value)}>
                  <div
                    className={`w-6 h-6 inline-flex items-center align-middle bg-blue-400 rounded-full`}
                    style={{ backgroundColor: StatusColors.find(f => f.title === item.value).color }}
                  />
                  <div className="text-base font-semibold pl-3 text-white">{item.value}</div>
                </div>
              ))
            }
          </div>
          </>
        }
      </div>
    </>
  );
};

export default MilestoneStatusDropdown;