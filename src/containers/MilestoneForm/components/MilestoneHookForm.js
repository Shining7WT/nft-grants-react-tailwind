import React, { useState } from 'react';

import ScopeForm from './ScopeForm';
import UpdatesForm from './UpdatesForm';
import AttachmentsForm from './AttachmentsForm';
import NoteForm from './NoteForm';

const MilestoneHookForm = ({ activeStep, register, errors, control, setSelectedFiles, selectedFiles, attachFileValidation, setDeleteFileModal, setRemoveFileIndex }) => {
  return (
    <>
      <div className={`${activeStep === 0 ? '' : 'hidden'}`}>
        <ScopeForm
          register={register}
          errors={errors}
          control={control}
        />
      </div>

      <div className={`${activeStep === 1 ? '' : 'hidden'}`}>
        <UpdatesForm
          register={register}
          errors={errors}
          control={control}
        />
      </div>

      <div className={`${activeStep === 2 ? '' : 'hidden'}`}>
        <AttachmentsForm
          register={register}
          errors={errors}
          control={control}
          setSelectedFiles={setSelectedFiles}
          selectedFiles={selectedFiles}
          attachFileValidation={attachFileValidation}
          setDeleteFileModal={setDeleteFileModal}
          setRemoveFileIndex={setRemoveFileIndex}
        />
      </div>

      <div className={`${activeStep === 3 ? '' : 'hidden'}`}>
        <NoteForm
          register={register}
          errors={errors}
          control={control}
        />
      </div>
    </>
  );
};

export default MilestoneHookForm;
