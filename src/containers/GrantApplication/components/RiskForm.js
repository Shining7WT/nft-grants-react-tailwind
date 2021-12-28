import React, { useState, useEffect } from 'react';

import WordCount from './WordCount';

const RiskForm = ({ register, errors, control, watch }) => {
  const risk_dependencies = watch('risk_dependencies') || ''
  const risk_solve_plan = watch('risk_solve_plan') || ''
  return (
    <>
      <p className="text-gray-400 font-semibold mb-5">New Grant Information</p>
      <p className="font-bold text-4xl mb-10">Risks</p>
      <div className="flex justify-between items-center">
        <p className="">
          What dependencies or obstacles do you anticipate?
        </p>
        <div className="flex justify-end w-1/6 ml-5">
          <div className={`inline-flex items-center px-4 ${WordCount(risk_dependencies) > 150 ? 'bg-red-600' : 'bg-gray-300'} rounded-md h-9 text-white`}>{WordCount(risk_dependencies) || 0}/{150}</div>
        </div>
      </div>
      <div className="mt-5">
        <textarea
          id="risk_dependencies"
          name="risk_dependencies"
          ref={register({
            required: "This field is required",
            validate: value => WordCount(value) > 150 ? 'Max length is 150' : true,
          })}
          errors={errors}
          onInput={e => e.target.value = (e.target.value.trim() === '' ? e.target.value.trim() : e.target.value)}
          placeholder="Type here..."
          rows={5}
          className={`shadow-sm focus:ring-indigo-500 p-4 focus:border-indigo-500 block w-full sm:text-sm border ${errors && errors.risk_dependencies && errors.risk_dependencies.message ? 'border-red-600' : 'border-gray-300'} rounded-md`}
          defaultValue={''}
        />
        {errors && errors.risk_dependencies && errors.risk_dependencies.message ? <span className="p-1 text-red-600 text-sm">{errors.risk_dependencies.message}</span> : <></>}
      </div>
      <div className="flex justify-between items-center mt-10">
        <p className="">
          What contingency plans do you have in place?
        </p>
        <div className="flex justify-end w-1/6 ml-5">
          <div className={`inline-flex items-center px-4 ${WordCount(risk_solve_plan) > 150 ? 'bg-red-600' : 'bg-gray-300'} rounded-md h-9 text-white`}>{WordCount(risk_solve_plan) || 0}/{150}</div>
        </div>
      </div>
      <div className="mt-5">
        <textarea
          id="risk_solve_plan"
          name="risk_solve_plan"
          ref={register({
            required: "This field is required",
            validate: value => WordCount(value) > 150 ? 'Max length is 150' : true,
          })}
          errors={errors}
          onInput={e => e.target.value = (e.target.value.trim() === '' ? e.target.value.trim() : e.target.value)}
          placeholder="Type here..."
          rows={5}
          className={`shadow-sm focus:ring-indigo-500 p-4 focus:border-indigo-500 block w-full sm:text-sm border ${errors && errors.risk_solve_plan && errors.risk_solve_plan.message ? 'border-red-600' : 'border-gray-300'} rounded-md`}
          defaultValue={''}
        />
        {errors && errors.risk_solve_plan && errors.risk_solve_plan.message ? <span className="p-1 text-red-600 text-sm">{errors.risk_solve_plan.message}</span> : <></>}
      </div>
    </>
  );
};

export default RiskForm;