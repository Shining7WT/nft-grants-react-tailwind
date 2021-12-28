import React, { useState, useEffect } from 'react';

import './RoadMapForm.scss'
import WordCount from './WordCount';

const RoadMapForm = ({
  register,
  errors,
  control,
  watch,
  activeMilestones,
  setActiveMilestones,
  setRemoveMilestoneIndex,
  setDeleteMilestoneModal,
  milestoneCount,
  setMilestoneCont,
  milestoneValidation,
}) => {
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  const handleDeleteMilestone = (e) => {
    setRemoveMilestoneIndex(e);
    setDeleteMilestoneModal(true);
  };

  const handleDropdownClick = (item) => {
    if (activeMilestones.includes(item)) {
      const index = activeMilestones.indexOf(item);
      const filteredMilestones = activeMilestones;
      filteredMilestones.splice(index, 1);
      setActiveMilestones([...filteredMilestones]);
    } else {
      setActiveMilestones([...activeMilestones, item])
    }
  };

  const validateNumber = (e) => {
    let n = e.target.value;
    e.target.value = (n.indexOf(".") >= 0) ? (n.substr(0, n.indexOf(".")) + n.substr(n.indexOf("."), 3)) : n; 
  };

  useEffect(() => {
    if (milestoneValidation === false) setShowErrorMsg(true);
    else setShowErrorMsg(false);
  }, [milestoneValidation]);

  return (
    <>
      <p className="text-gray-400 font-semibold mb-5">New Grant Information</p>
      <p className="font-bold text-4xl mb-10">Roadmap</p>
      <p className="">
        Break your project down into a simple list of milestones and include the approximate timeline within which you plan to complete them as well as your budget for each of them.
      </p>
      {showErrorMsg ? <span className="p-1 text-red-600 text-sm">Please add the milestone</span> : <></>}
      {
        milestoneCount.map((item, index) => (
          <div className="mt-5 border border-gray-200 rounded-lg" key={item + index}>
            <div className={`px-4 py-4 rounded-t-lg ${(activeMilestones.includes(item)) ? 'bg-gray-100' : 'bg-white'} border-b border-gray-300 flex justify-between items-center`}>
              <div className="text-gray-800">Milestone {item}</div>
              <div className="flex justify-end items-center">
                <div className="pr-4 font-bold hover:text-red-600 cursor-pointer" onClick={() => handleDeleteMilestone(index)}>
                  <i className="far fa-trash" />
                </div>
                <div
                  className={`w-10 h-10 flex items-center ${(!activeMilestones.includes(item)) ? 'bg-white border border-gray-300 text-gray-300' : 'bg-gray-700 text-white'} font-medium cursor-pointer rounded-full`}
                  onClick={() => handleDropdownClick(item)}
                >
                  <i className={`fal ${(!activeMilestones.includes(item)) ? 'fa-angle-down' : 'fa-angle-up'} w-full text-center`} />
                </div>
              </div>
            </div>
            {
              activeMilestones.includes(item) &&
              <>
                <div className="px-4 py-5">
                  <div className="my-3 flex justify-end items-center w-full">
                    <div className={`px-4 ${(WordCount(watch(`milestone_description${item}`) || '')) > 100 ? 'bg-red-600' : 'bg-gray-300'} rounded-md py-1 text-white`}>{(WordCount(watch(`milestone_description${item}`) || '')) || 0}/{100}</div>
                  </div>
                  <div>
                    <textarea
                      id="milestone_description"
                      name={`milestone_description${item}`} 
                      ref={register({
                        required: "This field is required",
                        validate: value => WordCount(value) > 100 ? 'Max length is 100' : true,
                      })}
                      errors={errors}
                      onInput={e => e.target.value = (e.target.value.trim() === '' ? e.target.value.trim() : e.target.value)}
                      placeholder="Description"
                      rows={5}
                      className={`shadow-sm focus:ring-indigo-500 p-4 focus:border-indigo-500 block w-full sm:text-sm border ${errors && errors[`milestone_description${item}`] && errors[`milestone_description${item}`].message ? 'border-red-600' : 'border-gray-200'} rounded-md`}
                      defaultValue={''}
                    />
                    {errors && errors[`milestone_description${item}`] && errors[`milestone_description${item}`].message ? <span className="p-1 text-red-600 text-sm">{errors[`milestone_description${item}`].message}</span> : <></>}
                  </div>
                  <div className="mt-3">
                    <div className={`w-full flex items-center rounded-lg border ${errors && errors[`milestone_budget${item}`] && errors[`milestone_budget${item}`].message ? 'border-red-600' : 'border-gray-200'} text-sm font-medium text-gray-700`}>
                      <p className="px-4 py-4 rounded-l-lg bg-gray-100 border-r border-gray-300">Budget</p>
                      <span className="pl-4">{(watch(`milestone_budget${item}`) || '') && '$'}</span>
                      <input
                        name={`milestone_budget${item}`}
                        type="number"
                        className="outline-none w-full pr-4 py-4 rounded-r-lg"
                        placeholder="($ USD)"
                        ref={register({
                          required: "This field is required",
                        })}
                        errors={errors}
                        onInput={(e) => validateNumber(e)}
                      />
                    </div>
                  </div>
                  <div className="">
                    <div>
                      {errors && errors[`milestone_budget${item}`] && errors[`milestone_budget${item}`].message ? <span className="p-1 text-red-600 text-sm">{errors[`milestone_budget${item}`].message}</span> : <></>}
                    </div>
                  </div>
                </div>
              </>
            }
          </div>
        ))
      }
    </>
  );
};

export default RoadMapForm;