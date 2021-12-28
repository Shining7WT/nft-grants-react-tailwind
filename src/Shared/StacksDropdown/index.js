import React, { useRef, useEffect, useState } from 'react';

export default function StacksDropdown({ dropdownTitle, onSelect, dropdownArray, width }) {
  const [showDropDown, setShowDropdown] = useState(false);
  const filterRef = useRef(null);

  const handleClickOutside = (event) => {
    if (!filterRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  const handleSelect = (item) => {
    onSelect(item);
    setShowDropdown(false);
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div ref={filterRef}>
      <div className={`cursor-pointer ${width ? width : ''}`} onClick={() => setShowDropdown(!showDropDown)}>
        <div className="flex justify-between items-center h-full pl-7 pr-6 py-4 bg-white rounded-lg shadow-md border border-gray-300">
          <p className="text-sm font-medium leading-none text-gray-700">{dropdownTitle}</p>
          <p className="text-sm leading-none text-gray-400">
            <i className="fal fa-angle-down" />
          </p>
        </div>
      </div>
      {
        showDropDown
        ? (
          <div className={`origin-top-right absolute bg-white border border-gray-300 mt-4 z-10 rounded-lg shadow-md ${width ? width : ''}`}>
            <div>
              <div className="absolute w-4 h-4 bg-white transform rotate-45 ml-40 -mt-4 border-l border-t border-gray-300" />
              <div className="mt-2"/>
              {
                dropdownArray.map((item, index) => (
                  <div className="text-sm text-gray-700 px-5 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleSelect(item)} key={index}>{item.label}</div>
                ))
              }
              <div className="mb-2"/>
            </div>
          </div>
        )
        : null
      }
    </div>
  );
}