import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import queryString from 'querystring';
import { useNavigate } from 'react-router-dom';

import history from '../../@history';
import StepperFormHeader from '../../Shared/StepperFormHeader';
import OnboardHookForm from './components/OnboardHookForm';
import Modal from './components/Modal';
import MemoModal from './components/MemoModal';
import { API_ENDPOINT_URL } from '../../constants/default';
import { updateGrantAction, fetchGrantByTokenAction } from '../../redux/actions/GrantAction';

const NewGrantForm = ({ updateGrant, fetchGrantByToken, grant, hasGrantIssue, onboardNavigation }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [validToken, setValidToken] = useState(null);
  const [modal, setModal] = useState(false);
  const [memoModal, setMemoModal] = useState(false);
  const [showMemoModal, setShowMemoModal] = useState(false);
  const [validateMemo, setValidateMemo] = useState(false);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    register,
    errors,
    trigger,
    watch,
    setValue,
    getValues,
    unregister,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onSubmit'
  });

  const onSubmit = (data) => {
    let token = queryString.parse(history.location.search)['?q']
    updateGrant({
      token: token,
      first_name: data.firstName,
      email: data.email,
      last_name: data.lastName,
      wallet_address: data.fund_with_usd ? null : data.STXWalletAddress,
      wallet_memo: data.fund_with_usd ? null : data.walletMemo,
      country: data.country && data.country.label,
      fund_with_usd: data.fund_with_usd,
      company_name: data.companyName,
    })
  };

  const handleNextStep = async () => {
    let validated;
    if (activeStep === 0) {
      validated = await trigger([
        "GithubIssueLink",
        "firstName",
        "lastName",
        "email",
      ]);
    }
    else if (activeStep === 1) {
      if (getValues('fund_with_usd')) {
        validated = true
        unregister('STXWalletAddress')
        unregister('walletMemo')
      } else {
        if (validateMemo) {
          validated = (await trigger('walletMemo') && await trigger("STXWalletAddress"))
        } else {
          validated = await trigger("STXWalletAddress");
        }
      }
      if (validated && !getValues('fund_with_usd')) {
        try {
          const res = await axios.get(`${API_ENDPOINT_URL}/stacks/${getValues("STXWalletAddress")}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('grant_app_token')}`
            }
          })
          if (res.data.success) {
            validated = true;
            if (!getValues('walletMemo')) {
              setMemoModal(true);
            }
          }
        } catch (e) {
          toast.error(e.response.data.message)
          validated = false;
          return
        }
      }
    }
    else { return }
    
    if (validated) setActiveStep(prev => prev + 1);
  };

  const toggleModal = (e, bool) => {
    if (bool)
      setValue('fund_with_usd', true)
    setModal(!modal)
  };

  const toggleMemoModal = (e, bool) => {
    if (bool) {
      setActiveStep(2)
    } else setActiveStep(1)
    setMemoModal(!memoModal)
  };

  useEffect(() => {
    let token = queryString.parse(history.location.search)['?q']
    fetchGrantByToken({ token })
  }, []);

  useEffect(() => {
    if (hasGrantIssue === false) {
      navigate('/no-grants')
    }
  }, [hasGrantIssue]);

  useEffect(() => {
    if (watch('fund_with_usd')) {
      toggleModal()
    }
  }, [watch('fund_with_usd')]);

  useEffect(() => {
    if (onboardNavigation) {
      const data = { title: 'Confirmed!', message: 'Let’s build something awesome together.<>We look forward to working with you.'}
      navigate('/confirmation', { state: data})
    }
  }, [onboardNavigation])

  return (
    <>
      {
        hasGrantIssue === null
        ? <></>
        : (
         <div className="flex flex-col items-center justify-center w-full py-12">
            <StepperFormHeader
               title="New Grant Form"
               description={<>Congrats on your new grant! <br/>Please fill out the information below to get started.</>}
               steps={['Your Info', 'Wallet Info', 'Confirmation']}
               activeStep={activeStep}
            />
            <form className="mt-16 mb-10 mx-3 w-5/6 md:w-3/4 lg:w-2/5">
               <OnboardHookForm
               activeStep={activeStep}
               register={register}
               errors={errors}
               control={control}
               grant={grant}
               watch={watch}
               getValues={getValues}
               setValue={setValue}
               validateMemo={validateMemo}
               setValidateMemo={setValidateMemo}
               setShowMemoModal={setShowMemoModal}
               />
            </form>
            {
               activeStep !== 2
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
            {modal &&
               <Modal
                  modal={modal}
                  toggleModal={toggleModal}
               />
               }
               {(memoModal) &&
               <MemoModal
                  modal={memoModal}
                  toggleModal={toggleMemoModal}
               />
               }
         </div>
        )
      }  
    </>
  );
};

export default connect(state => {
  return {
    grant: state.grants.grant,
    hasGrantIssue: state.grants.has_grant_issue,
    onboardNavigation: state.grants.onboardNavigation,
  }
}, (dispatch) => {
  return {
    updateGrant: (data) => dispatch(updateGrantAction(data)),
    fetchGrantByToken: (data) => dispatch(fetchGrantByTokenAction(data))
  }
})(NewGrantForm);
