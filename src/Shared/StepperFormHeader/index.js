import React from 'react';
import logo from "../../img/logo.svg";

const StepperFormHeader = ({ title, description, steps, activeStep }) => {
  return (
    <>
      <div className="mb-5">
        <img className="w-44 h-20" src={logo} alt="logo"/>
      </div>
      <p className="text-4xl font-bold text-center mb-5">{title}</p>
      <p className="text-base leading-normal text-center mb-8">
        {description}
      </p>
      <div className="w-3/4 md:w-stepperWidth">
        <div className="flex items-center align-middle">
          {
            steps.map((step, index) => (
              <>
                <div className="flex items-center text-purple-500 relative">
                  <div className={`w-10 md:w-12 lg:w-12 h-10 md:h-12 lg:h-12 transition duration-500 ease-in-out text-center ${activeStep >= index ? 'bg-indigo-600' : 'bg-gray-200'} py-2 md:py3 rounded-full text-sm md:text-lg font-bold text-white`}>
                    {index + 1}
                  </div>
                  <div className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-sm md:text-lg font-bold ${activeStep >= index ? 'text-indigo-600' : 'text-black'}`}>{step}</div>
                </div>
                {
                  steps.length > (index + 1) &&
                  <div className={`flex-auto border-t-4 transition duration-500 ease-in-out ${activeStep > index ? 'border-indigo-600' : 'border-gray-200'}`} />
                }
              </>
            ))
          }
        </div>
      </div>
    </>
  );
};

export default StepperFormHeader;