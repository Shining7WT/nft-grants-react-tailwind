import React from 'react';

const ConfirmationView = ({
  values: { firstName, lastName, STXWalletAddress, email, GithubIssueLink, fund_with_usd, country, companyName },
}) => {
  return (
    <>
     <div className="my-6 py-5 border border-gray-300 rounded-lg">
        <div className="mb-3 border-b border-gray-300">
          <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-6 px-8 pb-3">
            <div className="sm:col-span-3">
              <div className="text-gray-400 text-sm font-medium">First Name</div>
              <div className="text-gray-700 mt-1 text-normal font-bold">{firstName}</div>
            </div>
            <div className="sm:col-span-3">
              <div className="text-gray-400 text-sm font-medium">Last Name</div>
              <div className="text-gray-700 mt-1 text-normal font-bold">{lastName}</div>
            </div>
          </div>
        </div>
        <div className="mb-3 border-b border-gray-300 px-8 pb-3">
          <div className="text-gray-400 text-sm font-medium">STX Wallet Address</div>
          <div className="text-gray-700 mt-1 text-normal font-bold">{STXWalletAddress}</div>
        </div>
        <div className="mb-3 border-b border-gray-300 px-8 pb-3">
          <div className="text-gray-400 text-sm font-medium">Email Address</div>
          <div className="text-gray-700 mt-1 text-normal font-bold">{email}</div>
        </div>
        <div className="mb-3 border-b border-gray-300 px-8 pb-3">
          <div className="text-gray-400 text-sm font-medium">Country</div>
          <div className="text-gray-700 mt-1 text-normal font-bold">{country && country.label}</div>
        </div>
        <div className="mb-3 border-b border-gray-300 px-8 pb-3">
          <div className="text-gray-400 text-sm font-medium">Company Name</div>
          <div className="text-gray-700 mt-1 text-normal font-bold">{companyName}</div>
        </div>
        <div className="mb-1 px-8">
          <div className="text-gray-400 text-sm font-medium">Github Issue URL</div>
          <div
            className="text-gray-700 mt-1 text-normal font-bold cursor-pointer"
            onClick={() => window.open(GithubIssueLink, "_blank")}
          >{GithubIssueLink}</div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationView;