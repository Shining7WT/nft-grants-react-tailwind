import React, { useState, useEffect } from 'react';
import Dropzone from 'react-dropzone';

import AttachedFileCard from '../../../Shared/AttachedFileCard';

const AttachmentsForm = ({ register, errors, control, setSelectedFiles, selectedFiles, attachFileValidation, setDeleteFileModal, setRemoveFileIndex }) => {
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  const handleRemoveFile = (e) => {
    setRemoveFileIndex(e);
    setDeleteFileModal(true);
  };

  useEffect(() => {
    if (attachFileValidation === false) setShowErrorMsg(true);
    else setShowErrorMsg(false);
  }, [attachFileValidation]);

  return (
    <div className="">
      <label htmlFor="accomplished" className="block text-base font-medium text-gray-900">
        Please attach any relevant supporting materials, e.g. sample code, wireframes, mockups, etc. (If none, you can click ‘Next Step’.)
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
                className: `flex flex-col justify-center px-6 pt-14 pb-14 cursor-pointer border-2 border-gray-200 rounded-lg ${additionalClass === 'accept' && 'border-red-600'} ${additionalClass === 'reject' && 'border-green-600'} ${showErrorMsg && 'border-red-600'}`
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
  );
};

export default AttachmentsForm;
