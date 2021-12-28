import React, { useState, useEffect } from 'react';

import BackgroundForm from './BackgroundForm';
import ImpactForm from './ImpactForm';
import RiskForm from './RiskForm';
import RoadMapForm from './RoadMapForm';
import SupportingMaterialForm from './SupportingMaterialForm';

const CreateIssueHookForm = ({
  activeStep,
  register,
  errors,
  control,
  setSelectedFiles,
  selectedFiles,
  attachFileValidation,
  setDeleteFileModal,
  setRemoveFileIndex,
  watch,
  activeMilestones,
  setActiveMilestones,
  milestoneCount,
  setMilestoneCont,
  milestoneValidation,
  setRemoveMilestoneIndex,
  setDeleteMilestoneModal,
}) => {
  return (
    <>
      <div className={`${activeStep === 0 ? '' : 'hidden'}`}>
        <BackgroundForm
          register={register}
          errors={errors}
          control={control}
          watch={watch}
        />
      </div>

      <div className={`${activeStep === 1 ? '' : 'hidden'}`}>
        <ImpactForm
          register={register}
          errors={errors}
          control={control}
          watch={watch}
        />
      </div>

      <div className={`${activeStep === 2 ? '' : 'hidden'}`}>
        <RoadMapForm
          register={register}
          errors={errors}
          control={control}
          watch={watch}
          activeMilestones={activeMilestones}
          setActiveMilestones={setActiveMilestones}
          milestoneCount={milestoneCount}
          setMilestoneCont={setMilestoneCont}
          milestoneValidation={milestoneValidation}
          setRemoveMilestoneIndex={setRemoveMilestoneIndex}
          setDeleteMilestoneModal={setDeleteMilestoneModal}
        />
      </div>

      <div className={`${activeStep === 3 ? '' : 'hidden'}`}>
        <RiskForm
          register={register}
          errors={errors}
          control={control}
          watch={watch}
        />
      </div>

      <div className={`${activeStep === 4 ? '' : 'hidden'}`}>
        <SupportingMaterialForm
          register={register}
          errors={errors}
          control={control}
          setSelectedFiles={setSelectedFiles}
          selectedFiles={selectedFiles}
          attachFileValidation={attachFileValidation}
          setDeleteFileModal={setDeleteFileModal}
          setRemoveFileIndex={setRemoveFileIndex}
          watch={watch}
        />
      </div>
    </>
  );
};

export default CreateIssueHookForm;