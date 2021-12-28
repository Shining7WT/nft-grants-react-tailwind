import React from 'react';

import statusColors from '../../constants/statusColors';

const StatusFilter = ({
  column: {
  filterValue, setFilter, preFilteredRows, id, splitByComma,
  },
}) => {

  const handleSelect = (item) => {
    setFilter(item.title);
  };

  return (
    <div className='relative bg-black shadow-md rounded-lg p-2'>
      <div className="max-h-44 w-52 overflow-y-scroll scrollbar scrollbar-thumb-rounded-lg scrollbar-track-transparent scrollbar-thumb-gray-500 scrollbar-w-2 relative bg-black shadow-md rounded-lg">
        {
          statusColors.map((item, index) => (
            <div key={index} className="flex items-center p-2 cursor-pointer hover:bg-gray-800 rounded-lg" onClick={() => handleSelect(item)}>
              <div className="h-4 w-4 rounded-full" style={{ backgroundColor: item.color }} />
              <div className="text-white text-sm pl-3">{item.title}</div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default StatusFilter;