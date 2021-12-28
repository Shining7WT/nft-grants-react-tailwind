import React from 'react';

const NoteForm = ({ register, errors, control }) => {
  return (
    <div className="">
      <label htmlFor="milestoneNotes" className="block text-base font-medium text-gray-900">
        Any other notes to add to this milestone?
      </label>
      <div className="mt-5">
        <textarea
          id="milestoneNotes"
          name="milestoneNotes"
          ref={register({
            required: "Please enter the required detail",
          })}
          errors={errors}
          onInput={e => e.target.value = (e.target.value.trim() === '' ? e.target.value.trim() : e.target.value)}
          placeholder="Type here..."
          rows={8}
          className={`shadow-sm focus:ring-indigo-500 p-2.5 focus:border-indigo-500 block w-full sm:text-sm border ${errors && errors.milestoneNotes && errors.milestoneNotes.message ? 'border-red-600' : 'border-gray-300'} rounded-md`}
          defaultValue={''}
        />
        {errors && errors.milestoneNotes && errors.milestoneNotes.message ? <span className="p-1 text-red-600 text-sm">{errors.milestoneNotes.message}</span> : <></>}
      </div>
    </div>
  );
};

export default NoteForm;
