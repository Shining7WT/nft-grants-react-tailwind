import React from "react";

import GrantFilterItem from "./GrantFilterItem";

const testData1 = [
  { id: 1, name: "All", val: "60" },
  { id: 2, name: "Open", val: "23" },
  { id: 3, name: "Completed", val: "40" },
  { id: 4, name: "Stale", val: "4" },
  { id: 5, name: "Blocked", val: "2" },
];

const testData2 = [
  { id: 1, name: "All", val: "60" },
  { id: 2, name: "Open", val: "23" },
  { id: 3, name: "Completed", val: "40" },
  { id: 4, name: "Stale", val: "4" },
  { id: 5, name: "Blocked", val: "2" },
];

const testData3 = [
  { id: 1, name: "All", val: "60" },
  { id: 2, name: "Open", val: "23" },
  { id: 3, name: "Completed", val: "40" },
  { id: 4, name: "Stale", val: "4" },
  { id: 5, name: "Blocked", val: "2" },
];

const testData4 = [
  { id: 1, name: "All", val: "60" },
  { id: 2, name: "Open", val: "23" },
  { id: 3, name: "Completed", val: "40" },
  { id: 4, name: "Stale", val: "4" },
  { id: 5, name: "Blocked", val: "2" },
];

const MainGrantFilters = () => {
  return (
    <div className="flex-none xl:flex xl:justify-between xl:space-x-3 mt-3 px-3">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 flex-1">
      <GrantFilterItem title="Grant Status" options={testData1} />
      <GrantFilterItem title="Review Status" options={testData2} />
      <GrantFilterItem title="Payment Status" options={testData3} />
      <GrantFilterItem title="Ball in Court" options={testData4} />
      </div>
      <div>
      <button className="flex w-full xl:w-20 h-14 xl:h-full mt-4 xl:mt-0 bg-bgBlack rounded-xl justify-center items-center">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.66602 6.6665L7.99935 9.99984L11.3327 6.6665"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 10V2"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      </div>
    </div>
  );
};

export default MainGrantFilters;
