import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import StepperFormHeader from '../../Shared/StepperFormHeader';
import MilestoneHookForm from './components/MilestoneHookForm';
import GeneralConfirmModal from '../../Shared/GeneralConfirmModal';

const MilestoneForm = ({}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [validToken, setValidToken] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [removeFileIndex, setRemoveFileIndex] = useState(null);
  const [attachFileValidation, setAttachFileValidation] = useState(null);
  const [showDeleteFileModal, setDeleteFileModal] = useState(false);
  const {
    control,
    handleSubmit,
    register,
    errors,
    trigger,
    reset,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onSubmit'
  });

  const onSubmit = (data) => {
    console.log('***data', data, selectedFiles);
    // In selectedFiles you will get all the attached files
  };

  const handleNextStep = async () => {
    let validated;
    if (activeStep === 0) validated = await trigger('accomplished');
    else if (activeStep === 1) validated = await trigger('aboutEditMilestone');
    else if (activeStep === 2) {
      validated = selectedFiles.length ? true : false
      setAttachFileValidation(validated);
    }
    else validated = await trigger('milestoneNotes');
    
    if (validated) setActiveStep(prev => prev + 1);
  };

  const handleDeleteFile = () => {
    const filteredFiles = selectedFiles;
    filteredFiles.splice(removeFileIndex, 1);
    setSelectedFiles([...filteredFiles]);
    setDeleteFileModal(false);
  };

  useEffect(() => {
    if (selectedFiles.length) {
      setAttachFileValidation(true);
    }
  }, [selectedFiles]);

  return (
    <div className="flex flex-col items-center justify-center w-full py-12">
      <StepperFormHeader
        title="Milestone Complete"
        description={<>Great job completing: Milestone Title here<br/>Let's confirm the details.</>}
        steps={['Scope', 'Updates', 'Attachments', 'Notes']}
        activeStep={activeStep}
      />
      <form className="mt-16 mb-10 mx-3 w-5/6 md:w-3/4 lg:w-2/5">
        <MilestoneHookForm
          activeStep={activeStep}
          register={register}
          errors={errors}
          control={control}
          setSelectedFiles={setSelectedFiles}
          selectedFiles={selectedFiles}
          attachFileValidation={attachFileValidation}
          setDeleteFileModal={setDeleteFileModal}
          setRemoveFileIndex={setRemoveFileIndex}
        />
      </form>
      {
        activeStep !== 3
        ? (
          <div
            className="flex items-center justify-center w-5/6 md:w-3/4 lg:w-2/5 py-5 bg-indigo-600 rounded-md border-gray-200 cursor-pointer"
            onClick={() => handleNextStep()}
          >
            <p className="text-lg font-bold text-white pr-4">{validToken === false ? 'Try Again' : 'Next Step'}</p>
            <p className="text-lg text-white">{validToken === false ? null : <i className="fal fa-arrow-right" />}</p>
          </div>
        )
        : (
          <div
            className="flex items-center justify-center w-5/6 md:w-3/4 lg:w-2/5 lg:px-56 py-5 bg-indigo-600 rounded-md border-gray-200 cursor-pointer"
            onClick={handleSubmit(d => onSubmit(d))}
          >
            <p className="text-lg font-bold text-white pr-4">Confirm Details</p>
            <p className="text-lg text-white"><i className="fal fa-arrow-right" /></p>
          </div>
        )
      }
      {
        activeStep > 0 &&
        <div
          className="w-32 h-4 mt-5 flex space-x-5 items-center justify-center text-gray-400 cursor-pointer"
          onClick={() => setActiveStep(activeStep - 1)}
        >
          <p className="text-sm"><i className="fal fa-arrow-left" /></p>
          <p className="text-sm">Previous Step</p>
        </div>
      }
      {
        showDeleteFileModal &&
        <GeneralConfirmModal
          title="Are you sure?"
          message="You want to delete the file"
          closeModal={() => setDeleteFileModal(false)}
          open={showDeleteFileModal}
          handleAction={handleDeleteFile}
          cancelButtonText="Cancel"
          okButtonText="Confirm"
        />
      }
    </div>
  );
};

export default MilestoneForm;
