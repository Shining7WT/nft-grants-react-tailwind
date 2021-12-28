import React, { useRef } from 'react';
import logo from "../../img/logo.svg";

const VerticalStepper = ({ steps, activeStep }) => {
  const tableContainerRef = useRef();

  const handleScroll = (event, type) => {
    tableContainerRef.current.scrollLeft = event.target.scrollLeft;
  };

  return (
    <>
      <div className="flex flex-col justify-center lg:hidden">
        <div className="inline-flex justify-center w-full mb-4">
          <img className="w-48 h-20 text-black" src={logo} alt="logo"/>
        </div>
        <div className="inline-flex justify-center w-full">
          <div ref={tableContainerRef} className="overflow-x-auto scrollbar scrollbar-thumb-gray-800 scrollbar-thumb-rounded-md scrollbar-track-gray-200" style={{ maxWidth: '600px' }}>
            <div className="flex justify-between items-center w-createIssueStepperWidth">
              {
                steps.map((step, index) => (
                  <div className="flex items-center">
                    <div className={`w-9 h-9 inline-flex items-center justify-center rounded-full border-2 text-lg text-gray-500 ${activeStep > index ? 'bg-gray-300 border-gray-300' : activeStep === index ? 'bg-indigo-600 border-indigo-600' : 'border-gray-500'}`}>
                      {
                        (activeStep > index)
                          ? <div className="text-white"><i className="far fa-check" /></div>
                          : <div className={activeStep === index ? 'text-white' : 'text-gray-500'}>{index + 1}</div>
                      }
                    </div>
                    <div className={`pl-3 ${activeStep > index ? 'text-gray-400' : activeStep === index ? 'text-indigo-600 font-bold' : 'text-gray-500'}`}>{step}</div>
                  </div>
                ))
              }
            </div>
            <div onScroll={handleScroll}>
              <div className="inline-block rounded-md h-3" style={{ maxWidth: '600px' }} />
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block w-56">
        <div className="-ml-5 mb-4 -mt-4">
          <img className="w-48 h-20 text-black" src={logo} alt="logo"/>
        </div>
        {
          steps.map((step, index) => (
            <div className="flex items-center align-middle mb-4">
              <div className={`w-9 h-9 inline-flex items-center justify-center rounded-full border-2 text-lg text-gray-500 ${activeStep > index ? 'bg-gray-300 border-gray-300' : activeStep === index ? 'bg-indigo-600 border-indigo-600' : 'border-gray-500'}`}>
                {
                  (activeStep > index)
                    ? <div className="text-white"><i className="far fa-check" /></div>
                    : <div className={activeStep === index ? 'text-white' : 'text-gray-500'}>{index + 1}</div>
                }
              </div>
              <div className={`pl-3 ${activeStep > index ? 'text-gray-400' : activeStep === index ? 'text-indigo-600 font-bold' : 'text-gray-500'}`}>{step}</div>
            </div>
          ))
        }
      </div>
    </>
  );
};

export default VerticalStepper;