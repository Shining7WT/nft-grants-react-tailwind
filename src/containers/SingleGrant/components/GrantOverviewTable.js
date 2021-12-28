import React from "react";

export default function GrantOverviewTable({ grant, onClose, type }) {
  return (
    <div className="z-50">
      <div className="flex items-center bg-black rounded-t-md">
        <div className="p-5 w-full">
          <div className="text-gray-300 text-sm font-semibold">Total Approved</div>
          <div className="text-white font-bold text-2xl md:text-3xl pt-1">
            { (grant && grant.approved) ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(grant.approved / 100) : '$0'}
          </div>
        </div>
        <div className="p-5 w-full">
          <div className="text-gray-300 text-sm font-semibold">Total Funded</div>
          <div className="text-white font-bold text-2xl md:text-3xl pt-1">
            { (grant && grant.funded) ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(grant.funded / 100) : '$0'}
          </div>
        </div>
      </div>

      <div className={`bg-white border-l border-r border-b border-gray-300 rounded-b-md ${type === "modal" ? 'max-h-96 overflow-y-scroll scrollbar scrollbar-w-2 scrollbar-track-gray-300 scrollbar-thumb-gray-800 scrollbar-thumb-rounded-full' : ''}`}>
        <div className="p-5 border-b border-gray-300">
          <div className="text-sm md:text-lg text-gray-400 pb-1">Project Name</div>
          <div className="text-sm md:text-lg text-black">{grant.title || <span className="text-gray-300">No Data</span>}</div>
        </div>

        <div className="p-5 border-b border-gray-300">
          <div className="flex items-center">
            <div className="w-full">
              <div className="text-sm md:text-lg text-gray-400 pb-1">First Name</div>
              <div className="text-sm md:text-lg text-black">{grant.first_name || <span className="text-gray-300">No Data</span>}</div>
            </div>
            <div className="w-full">
              <div className="text-sm md:text-lg text-gray-400 pb-1">Last Name</div>
              <div className="text-sm md:text-lg text-black">{grant.last_name || <span className="text-gray-300">No Data</span>}</div>
            </div>
          </div>
        </div>

        {
          !grant.fund_with_usd &&
          <div className="p-5 border-b border-gray-300">
            <div className="text-sm md:text-lg text-gray-400 pb-1">STX Wallet Address</div>
            <div className="text-sm md:text-lg text-black">{grant.wallet_address || <span className="text-gray-300">No Data</span>}</div>
          </div>
        }

        <div className="p-5 border-b border-gray-300">
          <div className="text-sm md:text-lg text-gray-400 pb-1">Email Address</div>
          <div className="text-sm md:text-lg text-black">{grant.email || <span className="text-gray-300">No Data</span>}</div>
        </div>

        {
          grant.docusign_envelop_id
          ? (
            <div className="p-5 border-b border-gray-300">
              <div className={`flex ${type === "modal" ? 'flex-col' : 'flex-col lg:flex-row'} items-center`}>
                <div className={`w-full ${type === "modal" ? 'pb-5' : ''}`}>
                  <div className="text-sm md:text-lg text-gray-400 pb-1">Github Issue URL</div>
                  <div className="text-sm md:text-lg text-black cursor-pointer" onClick={() => window.open(grant.github_issue_url, "_blank")}>{grant.github_issue_url || <span className="text-gray-300">No Data</span>}</div>
                </div>
                <div className="w-full">
                  <div className="text-sm md:text-lg text-gray-400 pb-1">Docusign Document</div>
                  <div className="text-sm md:text-lg text-black cursor-pointer" onClick={() => window.open(`https://app.docusign.com/documents/details/${grant.docusign_envelop_id}`, "_blank")}>{`https://app.docusign.com/documents/details/${grant.docusign_envelop_id}`}</div>
                </div>
              </div>
            </div>
          )
          : (
            <div className="p-5 border-b border-gray-300">
              <div className="text-sm md:text-lg text-gray-400 pb-1">Github Issue URL</div>
              <div className="text-sm md:text-lg text-black cursor-pointer" onClick={() => window.open(grant.github_issue_url, "_blank")}>{grant.github_issue_url || <span className="text-gray-300">No Data</span>}</div>
            </div>
          )
        }
        
        <div className="p-5 border-b border-gray-300">
          <div className="flex items-center">
            <div className="w-full">
              <div className="text-sm md:text-lg text-gray-400 pb-1">Company Name</div>
              <div className="text-sm md:text-lg text-black">{grant.company_name || <span className="text-gray-300">No Data</span>}</div>
            </div>
            <div className="w-full">
              <div className="text-sm md:text-lg text-gray-400 pb-1">Country</div>
              <div className="text-sm md:text-lg text-black">{grant.country || <span className="text-gray-300">No Data</span>}</div>
            </div>
          </div>
        </div>
      </div>
      {
        type === "modal" &&
        <button className="bg-black w-full text-center text-white" onClick={onClose}>Close</button>
      }
    </div>
  );
}
