import React, { useEffect, useState, useRef } from 'react';

const ApprovalDropdown = ({ value, onAction, isDisabled}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const wrapperRef = useRef(null);

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
    <div className="relative" ref={wrapperRef}>
      <div className={`w-full flex items-center justify-between border border-gray-400 rounded-lg p-2 ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`} onClick={() => !isDisabled && setShowDropdown(prev => !prev)}>
        <div className="text-xs md:text-base text-gray-700 font-semibold py-1 pl-0 md:pl-2">{value}</div>
        <div>
          <i className="fal fa-angle-down text-gray-400 text-lg py-1 px-0 md:px-2" />
        </div>
      </div>
      <div className="absolute -top-2 left-4 tracking-widest text-xs bg-white text-gray-400">APPROVAL</div>
      {
        showDropdown &&
        <div className="absolute top-18 w-full">
          <div className="relative w-full bg-black rounded-lg p-3">
            <div className="absolute w-4 h-4 bg-black transform rotate-45 right-8 -top-2" />
            <div className="flex justify-between items-center w-full border-2 border-white rounded-lg">
              <div
                className="text-center w-full font-semibold border-r-2 border-white text-white py-2 cursor-pointer hover:bg-green-600 hover:text-white rounded-l-lg"
                onClick={() => onAction('Approve')}
              >
                Approve
              </div>
              <div
                className="text-center w-full font-semibold text-white py-2 cursor-pointer hover:bg-red-600 hover:text-white rounded-r-lg"
                onClick={() => onAction('Deny')}
              >
                Deny
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default ApprovalDropdown;