import React, { useState, useEffect } from 'react';

import WordCount from './WordCount';

const BackgroundForm = ({ register, errors, control, watch }) => {
  const overview = watch('overview') || ''
  const title = watch('title') || ''

  return (
    <>
      <p className="text-gray-400 font-semibold mb-5">New Grant Information</p>
      <p className="font-bold text-4xl mb-5">Project Overview</p>
      <div className="mb-10 mt-10">
        <div className="flex">
          <p className="w-full">
            What is the title of this project?
          </p>
          {/* <div className="flex justify-end w-1/6 ml-5">
            <div className={`inline-flex items-center px-4 ${WordCount(title) > 150 ? 'bg-red-600' : 'bg-gray-300'} rounded-md h-9 text-white`}>{WordCount(title) || 0}/{150}</div>
          </div> */}
        </div>
        <div className="mt-5">
          <input
            name="title"
            className={`shadow-sm focus:ring-indigo-500 p-4 focus:border-indigo-500 block w-full sm:text-sm border ${errors && errors.title && errors.title.message ? 'border-red-600' : 'border-gray-300'} rounded-md`}
            placeholder="Type here..."
            type="text"
            ref={register({
              required: "This field is required",
              validate: value => WordCount(value) > 250 ? 'Max length is 250' : true,
            })}
            errors={errors}
            onInput={e => e.target.value = (e.target.value.trim() === '' ? e.target.value.trim() : e.target.value)}
          />
          {errors && errors.title && errors.title.message ? <span className="p-1 text-red-600 text-sm">{errors.title.message}</span> : <></>}
        </div>
      </div>
      <div className="flex">
        <p className="w-full">
          Describe what you plan to contribute to the Stacks community, e.g. a whitepaper, a series of developer tools, a promotional community campaign, etc.
        </p>
        <div className="flex justify-end w-1/6 ml-5">
          <div className={`inline-flex items-center px-4 ${WordCount(overview) > 250 ? 'bg-red-600' : 'bg-gray-300'} rounded-md h-9 text-white`}>{WordCount(overview) || 0}/{250}</div>
        </div>
      </div>
      <div className="mt-5">
        <textarea
          id="overview"
          name="overview"
          ref={register({
            required: "This field is required",
            validate: value => WordCount(value) > 250 ? 'Max length is 250' : true,
          })}
          errors={errors}
          onInput={e => e.target.value = (e.target.value.trim() === '' ? e.target.value.trim() : e.target.value)}
          placeholder="Type here..."
          rows={8}
          className={`shadow-sm focus:ring-indigo-500 p-4 focus:border-indigo-500 block w-full sm:text-sm border ${errors && errors.overview && errors.overview.message ? 'border-red-600' : 'border-gray-300'} rounded-md`}
          defaultValue={''}
        />
        {errors && errors.overview && errors.overview.message ? <span className="p-1 text-red-600 text-sm">{errors.overview.message}</span> : <></>}
      </div>
    </>
  );
};

export default BackgroundForm;