import React from 'react';

const ScopeForm = ({ register, errors, control }) => {
  return (
    <div className="">
      <label htmlFor="accomplished" className="block text-base font-medium text-gray-900">
        What was accomplished in this milestone?
      </label>
      <div className="mt-5">
        <textarea
          id="accomplished"
          name="accomplished"
          ref={register({
            required: "Please enter the required detail",
          })}
          errors={errors}
          onInput={e => e.target.value = (e.target.value.trim() === '' ? e.target.value.trim() : e.target.value)}
          placeholder="Type here..."
          rows={8}
          className={`shadow-sm focus:ring-indigo-500 p-2.5 focus:border-indigo-500 block w-full sm:text-sm border ${errors && errors.accomplished && errors.accomplished.message ? 'border-red-600' : 'border-gray-300'} rounded-md`}
          defaultValue={''}
        />
        {errors && errors.accomplished && errors.accomplished.message ? <span className="p-1 text-red-600 text-sm">{errors.accomplished.message}</span> : <></>}
      </div>
    </div>
  );
};

export default ScopeForm;
