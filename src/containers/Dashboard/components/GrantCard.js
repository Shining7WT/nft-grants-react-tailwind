import React from 'react';
import { Link } from "react-router-dom"

const GrantCard = ({ heading, count, path, buttonColor }) => {
  return (
    <div className="h-52 p-7 flex flex-col justify-between shadow-md border border-gray-300 rounded-lg bg-white">
      <div className="text-gray-500 text-sm leading-4 text-center">{heading}</div>
      <div className="text-black text-4xl leading-10 text-center">{count}</div>
      <div className="inline-flex justify-center items-center w-full">
        <Link
          to={path}
          className="rounded-lg text-center px-6 py-1 text-white"
          style={{ backgroundColor: buttonColor }}
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default GrantCard;