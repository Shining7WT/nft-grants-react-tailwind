import React from 'react';

export default function ReportingTab({ setActiveFilter, activeFilter, totalStxUsdFunded, totalStxGrants, totalUsdGrants, totalUsdFunded, totalStxFunded }) {
  return (
    <>
      <div className="hidden mt-16 xl:flex justify-between items-center border-t border-gray-300 bg-gray-100">
        <div
          className={`border-l border-r flex flex-col justify-center border-gray-300 h-44 w-44 xl:w-full cursor-pointer ${activeFilter === 'STX+USD' ? 'bg-gray-50' : 'bg-gray-100 border-b'}`}
          onClick={() => setActiveFilter('STX+USD')}
        >
          <p className={`text-xl text-center pb-1.5 font-bold ${activeFilter === 'STX+USD' ? 'text-indigo-600' : 'text-black'}`}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalStxUsdFunded / 100)}</p>
          <p className="text-sm text-center leading-tight text-gray-400">Total STX+USD Funded</p>
        </div>
        <div
          className={`border-r flex flex-col justify-center border-gray-300 h-44 w-44 xl:w-full cursor-pointer ${activeFilter === 'STX GRANTS' ? 'bg-gray-50' : 'bg-gray-100 border-b'}`}
          onClick={() => setActiveFilter('STX GRANTS')}
        >
          <p className={`text-xl text-center pb-1.5 font-bold ${activeFilter === 'STX GRANTS' ? 'text-indigo-600' : 'text-black'}`}>{new Intl.NumberFormat('en-US', { currency: 'USD' }).format(totalStxGrants)}</p>
          <p className="text-sm text-center leading-tight text-gray-400">Total # STX Grants</p>
        </div>
        <div
          className={`border-r flex flex-col justify-center border-gray-300 h-44 w-44 xl:w-full cursor-pointer ${activeFilter === 'USD GRANTS' ? 'bg-gray-50' : 'bg-gray-100 border-b'}`}
          onClick={() => setActiveFilter('USD GRANTS')}
        >
          <p className={`text-xl text-center pb-1.5 font-bold ${activeFilter === 'USD GRANTS' ? 'text-indigo-600' : 'text-black'}`}>{new Intl.NumberFormat('en-US', { currency: 'USD' }).format(totalUsdGrants)}</p>
          <p className="text-sm text-center leading-tight text-gray-400">Total # USD Grants</p>
        </div>
        <div
          className={`border-r flex flex-col justify-center border-gray-300 h-44 w-44 xl:w-full cursor-pointer ${activeFilter === 'USD FUNDED' ? 'bg-gray-50' : 'bg-gray-100 border-b'}`}
          onClick={() => setActiveFilter('USD FUNDED')}
        >
          <p className={`text-xl text-center pb-1.5 font-bold ${activeFilter === 'USD FUNDED' ? 'text-indigo-600' : 'text-black'}`}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalUsdFunded / 100)}</p>
          <p className="text-sm text-center leading-tight text-gray-400">Total USD Funded</p>
        </div>
        <div
          className={`border-r flex flex-col justify-center border-gray-300 h-44 w-44 xl:w-full cursor-pointer ${activeFilter === 'STX FUNDED' ? 'bg-gray-50' : 'bg-gray-100 border-b'}`}
          onClick={() => setActiveFilter('STX FUNDED')}
        >
          <p className={`text-xl text-center pb-1.5 font-bold ${activeFilter === 'STX FUNDED' ? 'text-indigo-600' : 'text-black'}`}>{new Intl.NumberFormat('en-US', { currency: 'USD' }).format(totalStxFunded.toFixed(2))}</p>
          <p className="text-sm text-center leading-tight text-gray-400">Total STX Funded</p>
        </div>
      </div>

      <div className="xl:hidden grid grid-cols-2 mx-4 lg:mx-0 xl:mx-20 mt-16">
        <div
          className={`border-l border-t border-r border-gray-300 p-8 md:p-14 cursor-pointer ${activeFilter === 'STX+USD' ? 'bg-white shadow-md  border-white' : 'bg-gray-100 border-b'}`}
          style={activeFilter === 'STX+USD' ? { borderBottom: '4px solid #6366F1' } : {}}
          onClick={() => setActiveFilter('STX+USD')}
        >
          <p className={`text-xl font-bold ${activeFilter === 'STX+USD' ? 'text-indigo-600' : 'text-black'}`}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalStxUsdFunded / 100)}</p>
          <p className="text-sm leading-tight text-gray-400 pt-2">Total STX+USD Funded</p>
        </div>
        <div
          className={`border-r border-t border-gray-300 p-8 md:p-14 cursor-pointer ${activeFilter === 'STX GRANTS' ? 'bg-white shadow-md  border-white' : 'bg-gray-100 border-b'}`}
          onClick={() => setActiveFilter('STX GRANTS')}
          style={activeFilter === 'STX GRANTS' ? { borderBottom: '4px solid #6366F1' } : {}}
        >
          <p className={`text-xl font-bold ${activeFilter === 'STX GRANTS' ? 'text-indigo-600' : 'text-black'}`}>{new Intl.NumberFormat('en-US', { currency: 'USD' }).format(totalStxGrants)}</p>
          <p className="text-sm leading-tight text-gray-400 pt-2">Total # STX Grants</p>
        </div>
        <div
          className={`border-l border-r border-gray-300 p-8 md:p-14 cursor-pointer ${activeFilter === 'USD GRANTS' ? 'bg-white shadow-md  border-white' : 'bg-gray-100 border-b'}`}
          onClick={() => setActiveFilter('USD GRANTS')}
          style={activeFilter === 'USD GRANTS' ? { borderBottom: '4px solid #6366F1' } : {}}
        >
          <p className={`text-xl font-bold ${activeFilter === 'USD GRANTS' ? 'text-indigo-600' : 'text-black'}`}>{new Intl.NumberFormat('en-US', { currency: 'USD' }).format(totalUsdGrants)}</p>
          <p className="text-sm leading-tight text-gray-400 pt-2">Total # USD Grants</p>
        </div>
        <div
          className={`border-r border-gray-300 p-8 md:p-14 cursor-pointer ${activeFilter === 'USD FUNDED' ? 'bg-white shadow-md  border-white' : 'bg-gray-100 border-b'}`}
          onClick={() => setActiveFilter('USD FUNDED')}
          style={activeFilter === 'USD FUNDED' ? { borderBottom: '4px solid #6366F1' } : {}}
        >
          <p className={`text-xl font-bold ${activeFilter === 'USD FUNDED' ? 'text-indigo-600' : 'text-black'}`}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalUsdFunded / 100)}</p>
          <p className="text-sm leading-tight text-gray-400 pt-2">Total USD Funded</p>
        </div>
        <div
          className={`border-l border-r border-gray-300 p-8 md:p-14 cursor-pointer ${activeFilter === 'STX FUNDED' ? 'bg-white shadow-md  border-white' : 'bg-gray-100 border-b'}`}
          onClick={() => setActiveFilter('STX FUNDED')}
          style={activeFilter === 'STX FUNDED' ? { borderBottom: '4px solid #6366F1' } : {}}
        >
          <p className={`text-xl font-bold ${activeFilter === 'STX FUNDED' ? 'text-indigo-600' : 'text-black'}`}>{new Intl.NumberFormat('en-US', { currency: 'USD' }).format(totalStxFunded.toFixed(2))}</p>
          <p className="text-sm leading-tight text-gray-400 pt-2">Total STX Funded</p>
        </div>
      </div>
    </>
  );
}