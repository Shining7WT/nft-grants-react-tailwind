import React from 'react';

const NoRecords = ({ title, onBack, onRefresh }) => (
    <div className="bg-gray-50 rounded-lg py-5 md:py-20 flex flex-col justify-center items-center my-5 mx-5">
        <div className={`text-lg md:text-2xl text-black font-semibold text-center ${ (onBack || onRefresh) ? 'mb-10' : ''}`}>{title}</div>
        <div className="flex justify-center items-center space-x-5">
            {
                onBack &&
                <div className="flex items-center justify-center cursor-pointer w-32 py-3 pl-7 pr-8 bg-black rounded-lg text-white font-bold" onClick={onBack}>
                    <div>
                        <i className="fal fa-long-arrow-left" />
                    </div>
                    <p className="pl-5">Back</p>
                </div>
            }
            {
                onRefresh &&
                <div className="flex items-center justify-center w-40 py-3 pl-7 pr-8 bg-gray-50 border-2 cursor-pointer rounded-lg border-indigo-600 text-indigo-600 font-bold" onClick={onRefresh}>
                    <div><i className="far fa-sync" /></div>
                    <p className="pl-5">Refresh</p>
                </div>
            }
            
        </div>
    </div>
)

export default NoRecords;
