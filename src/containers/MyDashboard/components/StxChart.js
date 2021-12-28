import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import ApexCharts from 'apexcharts';
import moment from 'moment';

const StxChart = ({ getStackPrice, isCollapsed, chartData, setChartData, currentSTXPrice, activeDateFilter, setActiveDateFilter }) => {
  const series = [{
    name: 'STX',
    data: chartData
  }];

  const options = {
    colors: ['#5546FF'],
    chart: {
      id: 'area-datetime',
      type: 'area',
      stacked: false,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 0,
      style: 'hollow',
    },
    xaxis: {
      type: 'datetime',
      labels: {
        // show: true,
        // datetimeUTC: true,
        formatter: function(value, timestamp) {
          return ''
        }
      }
    },
    yaxis: {
      show: false
    },
    tooltip: {
      x: {
        formatter: (value) => moment.unix(value/1000).format("MM/DD/YYYY")
      },
      y: {
        formatter: (value) => Number(value).toFixed(4)
      }
    },
    fill: {
      type: 'gradient',
      colors: ['#5546FF'],
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.2,
        stops: [0, 100]
      }
    },
    grid: {
      show: true,      // you can either change hear to disable all grids
      xaxis: {
        lines: {
          show: false  //or just here to disable only x axis grids
         }
       },  
      yaxis: {
        lines: { 
          show: false  //or just here to disable only y axis
         }
       },   
    },
    stroke: {
      width: 1,
    }
  };

  return (
    <>
      <div className="w-full">
        {
          !isCollapsed && <p className="text-xl md:text-2xl font-bold text-gray-900 mb-7">STX Price</p>
        }
        <div className={`w-full p-5 bg-white ${isCollapsed ? 'rounded-l-lg' : 'rounded-lg' }`}>
          <p className='font-bold text-base text-indigo-600'>{currentSTXPrice} USD</p>
          <Chart options={options} series={series} type="area" height={220}  />
          <div className='flex justify-between items-center'>
            <div className={`w-9 h-9 flex justify-center items-center text-sm rounded-lg hover:bg-indigo-600 cursor-pointer ${activeDateFilter === 'one_day' ? 'bg-indigo-600 text-white' : 'text-gray-500'} hover:text-white`} onClick={() => setActiveDateFilter('one_day')}>
              1D
            </div>
            <div className={`w-9 h-9 flex justify-center items-center text-sm rounded-lg hover:bg-indigo-600 cursor-pointer ${activeDateFilter === 'one_week' ? 'bg-indigo-600 text-white' : 'text-gray-500'} hover:text-white`} onClick={() => setActiveDateFilter('one_week')}>
              1W
            </div>
            <div className={`w-9 h-9 flex justify-center items-center text-sm rounded-lg hover:bg-indigo-600 cursor-pointer ${activeDateFilter === 'one_month' ? 'bg-indigo-600 text-white' : 'text-gray-500'} hover:text-white`} onClick={() => setActiveDateFilter('one_month')}>
              1M
            </div>
            <div className={`w-9 h-9 flex justify-center items-center text-sm rounded-lg hover:bg-indigo-600 cursor-pointer ${activeDateFilter === 'one_year' ? 'bg-indigo-600 text-white' : 'text-gray-500'} hover:text-white`} onClick={() => setActiveDateFilter('one_year')}>
              1Y
            </div>
            <div className={`w-9 h-9 flex justify-center items-center text-sm rounded-lg hover:bg-indigo-600 cursor-pointer ${activeDateFilter === 'all' ? 'bg-indigo-600 text-white' : 'text-gray-500'} hover:text-white`} onClick={() => setActiveDateFilter('all')}>
              All
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StxChart;
