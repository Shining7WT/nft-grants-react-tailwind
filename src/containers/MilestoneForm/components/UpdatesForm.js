import React from 'react';

const UpdatesForm = ({ register, errors, control }) => {
  return (
    <div className="">
      <label htmlFor="aboutEditMilestone" className="block text-base font-medium text-gray-900">
      Can you explain any changes or deviations from your original milestone.
      If not, please type “NA”
      </label>
      <div className="mt-5">
        <textarea
          id="aboutEditMilestone"
          name="aboutEditMilestone"
          placeholder="Type here..."
          onInput={e => e.target.value = (e.target.value.trim() === '' ? e.target.value.trim() : e.target.value)}
          rows={8}
          ref={register({
            required: "Please enter the required detail",
          })}
          errors={errors}
          className={`shadow-sm focus:ring-indigo-500 p-2.5 focus:border-indigo-500 block w-full sm:text-sm border ${errors && errors.aboutEditMilestone && errors.aboutEditMilestone.message ? 'border-red-600' : 'border-gray-300'} rounded-md`}
          defaultValue={''}
        />
        {errors && errors.aboutEditMilestone && errors.aboutEditMilestone.message ? <span className="p-1 text-red-600 text-sm">{errors.aboutEditMilestone.message}</span> : <></>}
      </div>
    </div>
  );
};

export default UpdatesForm;
