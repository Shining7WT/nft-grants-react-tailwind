import React, { useState, useEffect } from 'react';

import WordCount from './WordCount';

const ImpactForm = ({ register, errors, control, watch }) => {
  const impact = watch('impact') || ''
  const benefits = watch('benefits') || ''
  return (
    <>
      <p className="text-gray-400 font-semibold mb-5">New Grant Information</p>
      <p className="font-bold text-4xl mb-5">Impact</p>
      <div className="mb-10 mt-10">
        <div className="flex">
          <p className="w-full">
            Why is this project important to you?
          </p>
          <div className="flex justify-end w-1/6 ml-5">
            <div className={`inline-flex items-center px-4 ${WordCount(impact) > 250 ? 'bg-red-600' : 'bg-gray-300'} rounded-md h-9 text-white`}>{WordCount(impact) || 0}/{250}</div>
          </div>
        </div>
        <div className="mt-5">
          <textarea
            id="impact"
            name="impact"
            ref={register({
              required: "This field is required",
              validate: value => WordCount(value) > 250 ? 'Max length is 250' : true,
            })}
            errors={errors}
            onInput={e => e.target.value = (e.target.value.trim() === '' ? e.target.value.trim() : e.target.value)}
            placeholder="Type here..."
            rows={8}
            className={`shadow-sm focus:ring-indigo-500 p-4 focus:border-indigo-500 block w-full sm:text-sm border ${errors && errors.impact && errors.impact.message ? 'border-red-600' : 'border-gray-300'} rounded-md`}
            defaultValue={''}
          />
          {errors && errors.impact && errors.impact.message ? <span className="p-1 text-red-600 text-sm">{errors.impact.message}</span> : <></>}
        </div>
      </div>
      <div className="flex">
        <p className="w-full">
          How do you think it will benefit members of the Stacks community?
        </p>
        <div className="flex justify-end w-1/6 ml-5">
          <div className={`inline-flex items-center px-4 ${WordCount(benefits) > 250 ? 'bg-red-600' : 'bg-gray-300'} rounded-md h-9 text-white`}>{WordCount(benefits) || 0}/{250}</div>
        </div>
      </div>
      <div className="mt-5">
        <textarea
          id="benefits"
          name="benefits"
          ref={register({
            required: "This field is required",
            validate: value => WordCount(value) > 250 ? 'Max length is 250' : true,
          })}
          errors={errors}
          onInput={e => e.target.value = (e.target.value.trim() === '' ? e.target.value.trim() : e.target.value)}
          placeholder="Type here..."
          rows={8}
          className={`shadow-sm focus:ring-indigo-500 p-4 focus:border-indigo-500 block w-full sm:text-sm border ${errors && errors.benefits && errors.benefits.message ? 'border-red-600' : 'border-gray-300'} rounded-md`}
          defaultValue={''}
        />
        {errors && errors.benefits && errors.benefits.message ? <span className="p-1 text-red-600 text-sm">{errors.benefits.message}</span> : <></>}
      </div>
    </>
  );
};

export default ImpactForm;