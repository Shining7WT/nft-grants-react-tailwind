import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotFoundImg from '../img/404.png';

const PageNotFound = () => {
  let navigate = useNavigate();
  const onBack = () => {
		navigate(-1)
	};

	const onRefresh = () => {
		window.location.reload();
	};

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
        <img src={NotFoundImg} className="pt-20" alt="Page Not Found" />
        <p className="font-bold text-2xl text-black">Page Not Found</p>
        <p className="font-normal text-2xl leading-9 text-gray-500 pt-16 text-center" style={{ width: '448px' }}>
          We’re not sure what happened, but we’ll have someone look into it.
        </p>
        <div className="flex justify-center items-center space-x-5 pt-10">
          <div className="flex items-center justify-center cursor-pointer w-32 py-3 pl-7 pr-8 bg-black rounded-lg text-white font-bold" onClick={onBack}>
            <div><i className="fal fa-long-arrow-left" /></div>
            <p className="pl-5">Back</p>
          </div>
          <div className="flex items-center justify-center w-40 py-2.5 pl-7 pr-8 bg-gray-50 border-2 cursor-pointer rounded-lg border-indigo-600 text-indigo-600 font-bold" onClick={onRefresh}>
            <div><i className="far fa-sync" /></div>
            <p className="pl-5">Refresh</p>
          </div>
        </div>
    </div>
  );
};

export default PageNotFound;