import React, { useState, useEffect } from 'react';
import Dropzone from 'react-dropzone';

import AttachedFileCard from '../../../Shared/AttachedFileCard';
import WordCount from './WordCount';

const SupportingMaterialForm = ({register, errors, control, setSelectedFiles, selectedFiles, attachFileValidation, setDeleteFileModal, setRemoveFileIndex, watch }) => {
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const experience = watch('experience') || ''
  const feedback_received = watch('feedback_received') || ''
  const plan_to_engage = watch('plan_to_engage') || ''

  const handleRemoveFile = (e) => {
    setRemoveFileIndex(e);
    setDeleteFileModal(true);
  };

  useEffect(() => {
    if (attachFileValidation === false) setShowErrorMsg(true);
    else setShowErrorMsg(false);
  }, [attachFileValidation]);

  return (
    <>
      <p className="text-gray-400 font-semibold mb-5">New Grant Information</p>
      <p className="font-bold text-4xl mb-10">Supporting Materials</p>
      <div className="flex justify-between items-center">
        <p className="">
          Do you have previous projects, code commits, or experiences that are relevant to this application?
        </p>
        <div className="flex justify-end w-1/6">
          <div className={`inline-flex items-center px-4 ${WordCount(experience) > 150 ? 'bg-red-600' : 'bg-gray-300'} rounded-md h-9 text-white`}>{WordCount(experience) || 0}/{150}</div>
        </div>
      </div>
      <div className="mt-5">
        <textarea
          id="experience"
          name="experience"
          ref={register({
            required: "This field is required",
            validate: value => WordCount(value) > 150 ? 'Max length is 150' : true,
          })}
          errors={errors}
          onInput={e => e.target.value = (e.target.value.trim() === '' ? e.target.value.trim() : e.target.value)}
          placeholder="Type here..."
          rows={5}
          className={`shadow-sm focus:ring-indigo-500 p-4 focus:border-indigo-500 block w-full sm:text-sm border ${errors && errors.experience && errors.experience.message ? 'border-red-600' : 'border-gray-300'} rounded-md`}
          defaultValue={''}
        />
        {errors && errors.experience && errors.experience.message ? <span className="p-1 text-red-600 text-sm">{errors.experience.message}</span> : <></>}
      </div>
      <div className="flex justify-between items-center mt-10">
        <p className="">
          What community feedback or input have you received?
        </p>
        <div className="flex justify-end w-1/6">
          <div className={`inline-flex items-center px-4 ${WordCount(feedback_received) > 150 ? 'bg-red-600' : 'bg-gray-300'} rounded-md h-9 text-white`}>{WordCount(feedback_received) || 0}/{150}</div>
        </div>
      </div>
      <div className="mt-5">
        <textarea
          id="feedback_received"
          name="feedback_received"
          ref={register({
            required: "This field is required",
            validate: value => WordCount(value) > 150 ? 'Max length is 150' : true,
          })}
          errors={errors}
          onInput={e => e.target.value = (e.target.value.trim() === '' ? e.target.value.trim() : e.target.value)}
          placeholder="Type here..."
          rows={5}
          className={`shadow-sm focus:ring-indigo-500 p-4 focus:border-indigo-500 block w-full sm:text-sm border ${errors && errors.feedback_received && errors.feedback_received.message ? 'border-red-600' : 'border-gray-300'} rounded-md`}
          defaultValue={''}
        />
        {errors && errors.feedback_received && errors.feedback_received.message ? <span className="p-1 text-red-600 text-sm">{errors.feedback_received.message}</span> : <></>}
      </div>
      <div className="flex justify-between items-center mt-10">
        <p className="">
          How do you plan to engage with the community about your project? For example, will you host community calls, workshops, or share regular updates on Discord?
        </p>
        <div className="flex justify-end w-1/6">
          <div className={`inline-flex items-center px-4 ${WordCount(plan_to_engage) > 150 ? 'bg-red-600' : 'bg-gray-300'} rounded-md h-9 text-white`}>{WordCount(plan_to_engage) || 0}/{150}</div>
        </div>
      </div>
      <div className="mt-5">
        <textarea
          id="plan_to_engage"
          name="plan_to_engage"
          ref={register({
            required: "This field is required",
            validate: value => WordCount(value) > 150 ? 'Max length is 150' : true,
          })}
          errors={errors}
          onInput={e => e.target.value = (e.target.value.trim() === '' ? e.target.value.trim() : e.target.value)}
          placeholder="Type here..."
          rows={5}
          className={`shadow-sm focus:ring-indigo-500 p-4 focus:border-indigo-500 block w-full sm:text-sm border ${errors && errors.plan_to_engage && errors.plan_to_engage.message ? 'border-red-600' : 'border-gray-300'} rounded-md`}
          defaultValue={''}
        />
        {errors && errors.plan_to_engage && errors.plan_to_engage.message ? <span className="p-1 text-red-600 text-sm">{errors.plan_to_engage.message}</span> : <></>}
      </div>
      <div className="mt-10">
        <label htmlFor="accomplished" className="block text-base font-medium text-gray-900">
          Please attach any relevant supporting materials, e.g. sample code, wireframes, mockups, diagrams, etc.
        </label>
        <div className="mt-5">
        <Dropzone
          accept="image/jpeg, image/png, application/pdf, application/txt, application/js, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          name="milestoneAttachments"
          onDrop={(filesToUpload) => {
            let combinedFile = selectedFiles;
            filesToUpload.forEach(file => combinedFile.push([file]))
            setSelectedFiles([...combinedFile]);
          }}
        >
          {({
            getRootProps,
            getInputProps,
            isDragActive,
            isDragAccept,
            isDragReject
          }) => {
            const additionalClass = isDragAccept
              ? "accept"
              : isDragReject
              ? "reject"
              : "";

            return (
              <div
                {...getRootProps({
                  className: `flex flex-col justify-center px-6 pt-14 pb-14 cursor-pointer border border-gray-200 rounded-lg ${additionalClass === 'accept' && 'border-red-600'} ${additionalClass === 'reject' && 'border-green-600'} ${showErrorMsg && 'border-red-600'}`
                })}
              >
                <input {...getInputProps()} />
                <span className="mx-auto text-7xl text-indigo-600 hover:text-indigo-500 pb-2"><i className="fad fa-images" /></span>
                <p className="text-lg text-gray-400 text-center">{`Drag & Drop Files Here`}</p>
              </div>
            );
          }}
        </Dropzone>
        {showErrorMsg ? <span className="p-1 text-red-600 text-sm">Please attach the required document</span> : <></>}
        </div>
        {
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-5">
            {
              selectedFiles.map((file, index) => (
                <AttachedFileCard
                  onRemove={() => handleRemoveFile(index)}
                  fileImage={URL.createObjectURL(file[0])}
                  fileName={file[0].path}
                  fileSize={file[0].size}
                />
              ))
            }
          </div>
        }
      </div>
    </>
  );
};

export default SupportingMaterialForm;