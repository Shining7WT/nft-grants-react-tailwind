import React from 'react';

import StatusColors from '../../constants/statusColors';

const SingleStatusBar = ({ text }) => {
  const color = (StatusColors.find(f => f.title === text) || {}).color
  return (
    <div
      className="px-4 py-2 inline-flex text-sm leading-5 text-white rounded-lg"
      style={{ backgroundColor: color ? color : '#DEDEDE'}}
    >
      {text}
    </div>
  );
};

export default SingleStatusBar;