import React, { useState, useEffect } from 'react';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import AnimatedProgressProvider from './AnimatedProgressProvider';

const AttachedFileCard = ({ onRemove, fileImage, fileName, fileSize }) => {
  const [loadPercentage, setLoadPercentage] = useState(0);
  const [fileType, setFileType] = useState('doc');

  const textEllipsis = (txt) => {
    if (txt.length > 19) {
      return txt.substr(0, 15) + '...' + txt.substr(txt.length - 4, txt.length);
    }
    return txt;
  };

  useEffect(() => {
    setTimeout(() => setLoadPercentage(100), 2000);
    let file_type = fileName.split('.')[1];
    if (['jpeg', 'jpg', 'png', 'svg', 'gif'].includes(file_type && file_type.toLowerCase())) {
      setFileType('img');
    }
  }, []);

  return (
    <div className="w-full h-16 mt-2 md:mt-0 p-2 bg-white shadow-lg rounded-md">
      <div className="flex justify-between items-center align-middle">
        <div className="flex items-center">
          {
            fileType === 'img'
            ? (
              <img className="w-12 h-12 shadow rounded-md" src={fileImage} alt="file" />
            )
            : (
              <div className="w-12 h-12 shadow bg-white rounded-md">
                <i className="far fa-paperclip text-gray-400 text-center pt-2 pl-3 text-2xl" />
              </div>
            )
          }
          <div className="w-44 text-xs font-medium pl-3">
            <div className="font-bold text-black">{textEllipsis(fileName)}</div>
            <div className="">{(fileSize/100000).toFixed(2)} MB</div>
          </div>
        </div>
        <div className="w-10 h-10">
          {
            loadPercentage === 100
            ? (
              <div className="w-10 h-10 bg-gray-50 pt-2 text-center font-medium text-red-600 cursor-pointer rounded-full" onClick={onRemove}>
                <i className="fal fa-trash" />
              </div>
            )
            : (
              <AnimatedProgressProvider values={[0, 100]}>
                {percentage => (
                  <CircularProgressbarWithChildren
                    value={percentage}
                    strokeWidth={10}
                    styles={buildStyles({
                      textColor: '#E4E4E4',
                      pathColor: '#5546FF',
                      trailColor: '#E4E4E4',
                      pathTransitionDuration: 1
                    })}
                  >
                    <div className="font-medium text-xs text-indigo-600 cursor-pointer" onClick={onRemove}>
                      {`${percentage}%`}
                    </div>
                  </CircularProgressbarWithChildren>
                )}
              </AnimatedProgressProvider>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default AttachedFileCard;