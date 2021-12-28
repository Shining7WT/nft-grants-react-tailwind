import React from "react";
import CurrencyInput from 'react-currency-input-field';

import StatusColors from '../../../constants/statusColors';
import MilestoneStatusDropdown from "../../../Shared/MilestoneStatusDropdown";
import NoRecords from "../../../Shared/NoRecords";

export default function MilestoneTable({
  toggleModal,
  milestones,
  editInfo,
  setEditInfo,
  handleDelete,
  handleEdit,
  onChangeHandlerAmount,
  onChangeHandlerStatus,
  handleAddMilestone,
  grantApprovalStatus,
  isNewMilestone,
}) {
  
  return (
    <div>
      <div className="text-xl font-semibold">Milestones:</div>
      <div className="mt-5 border border-gray-300 bg-white rounded-lg">
        {
          milestones.length
          ? (
            milestones.filter(m => m.milestone_status !== 'Closed').map((m, index) => {
              let color = (StatusColors.find(f => f.title === m.milestone_status) || {}).color
              if (!color && m.milestone_status && m.milestone_status.includes('Followed Up'))
                  color = (StatusColors.find(f => f.title === 'Followed Up') || {}).color
              return (
                <div className="block lg:flex justify-between items-center border-b border-gray-300">
                  <div className="w-full inline-flex items-center text-lg">
                    <div className="py-4 px-4">M{m.milestone_number}</div>
                    <div className="py-4 px-4" style={{ color: color }}>
                      {(editInfo && editInfo.id === m.id) || m.notSaved ?
                          (
                            <CurrencyInput
                              name="milestone-amount"
                              className="w-60 border border-gray-300 rounded-lg px-3 py-1"
                              allowNegativeValue={false}
                              prefix="$"
                              decimalScale={2}
                              decimalsLimit={2}
                              decimalSeparator='.'
                              defaultValue={m.notSaved ? m.amount ? m.amount : 0 : editInfo.amount ? editInfo.amount / 100 : 0}
                              onValueChange={(value) => { onChangeHandlerAmount(value, m) }}
                            />
                          )
                          :
                          (new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(m.amount / 100))
                        }
                    </div>
                  </div>
                  <div className="w-full inline-flex justify-start pl-4 lg:pl-0 lg:justify-end items-center">
                    {((editInfo && editInfo.id === m.id)) ?
                      <div className="py-4 w-56">
                        <MilestoneStatusDropdown
                          selectedValue={m.notSaved ? m.milestone_status : editInfo.milestone_status}
                          onChangeHandler={(e) => onChangeHandlerStatus(e, m.milestone_status)}
                          isNewMilestone={isNewMilestone}
                          notSaved={m.notSaved}
                          isDisabled={((milestones.find((f, i) => i === (index - 1)) ? milestones.find((f, i) => i === (index - 1)).milestone_status !== 'Complete' : false))}
                        />
                      </div>
                      :
                        <div className="flex justify-center items-center p-1.5 rounded-md h-9 w-56 text-white text-xs md:text-base" style={{ backgroundColor: StatusColors.find(f => f.title === m.milestone_status).color }}>
                          {m.milestone_status}
                        </div>
                    }
                    <div className="py-3 pl-4">
                      {
                        (editInfo && editInfo.id === m.id) || m.notSaved ?
                          (
                            <span
                              className="bg-black"
                              onClick={m.notSaved ? () => { handleAddMilestone(m) } : handleEdit}
                            >
                              <div className="flex justify-center items-center p-1.5 rounded-md h-9 w-9 bg-gray-800 hover:bg-gray-700 cursor-pointer">
                                <i className="fal fa-check text-white" />
                              </div>
                            </span>
                          ) : (
                            <span
                              className=""
                              style={{
                                cursor: grantApprovalStatus !== "Denied" && m.milestone_status !== 'Complete' && !m.funded
                                  ? "pointer"
                                  : "not-allowed"
                                }}
                              onClick={
                                () => grantApprovalStatus !== "Denied" && m.milestone_status !== 'Complete' && !m.funded
                                  ? setEditInfo(m)
                                  : null}
                            >
                               <div className="flex justify-center items-center p-1.5 rounded-md h-9 w-9 bg-gray-800 hover:bg-gray-700">
                                  <i className="fal fa-pencil text-white" />
                               </div>
                            </span>
                          )
                        }
                    </div>
                    <div className="py-3 px-4">
                      <span
                        style={{
                          cursor: grantApprovalStatus !== "Denied" && m.milestone_status !== 'Complete' && m.milestone_status !== 'In Progress'
                            ? "pointer"
                            : "not-allowed"
                          }}
                        onClick={() => grantApprovalStatus !== "Denied" && m.milestone_status !== 'Complete' && m.milestone_status !== 'In Progress'
                          ? handleDelete(m)
                          : null
                        }
                      >
                        <div className="flex justify-center items-center p-1.5 rounded-md h-9 w-9 bg-gray-800 hover:bg-gray-700">
                          <i className="fal fa-trash text-white " />
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              )
            })
          )
          : (
            <NoRecords
              title="This grant currently has no milestones"
            />
          )
        }
      </div>
    </div>
    
  );
}
