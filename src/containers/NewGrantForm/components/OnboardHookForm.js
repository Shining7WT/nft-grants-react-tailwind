import React from "react";
import UserInfoForm from './UserInfoForm';
import FundingInfoForm from './FundingInfoForm'
import ConfirmationView from './ConfirmationView'

const OnboardHookForm = ({
  activeStep, register, errors, control, grant,  watch, getValues, setValue, validateMemo, setValidateMemo, setShowMemoModal, onCheck,
}) => {
  return (
    <>
      <div className={`${activeStep === 0 ? '' : 'hidden'}`}>
        <UserInfoForm
          register={register}
          errors={errors}
          control={control}
          grant={grant}
        />
      </div>

      <div className={`${activeStep === 1 ? '' : 'hidden'}`}>
        <FundingInfoForm
          register={register}
          errors={errors}
          control={control}
          watch={watch}
          getValues={getValues}
          setValue={setValue}
          validateMemo={validateMemo}
          setValidateMemo={setValidateMemo}
          setShowMemoModal={setShowMemoModal}
          onCheck={onCheck}

        />
      </div>

      <div className={`${activeStep === 2 ? '' : 'hidden'}`}>
        <ConfirmationView
          register={register}
          errors={errors}
          control={control}
          values={getValues()}
        />
      </div>
    </>
  );
};

export default OnboardHookForm;