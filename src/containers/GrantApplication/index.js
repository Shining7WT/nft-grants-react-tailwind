import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux'
import Loading from 'react-loading-overlay';
import { useNavigate } from 'react-router-dom';

import VerticalStepper from '../../Shared/VerticalStepper';
import CreateIssueHookForm from './components/CreateIssueHookForm';
import GeneralConfirmModal from '../../Shared/GeneralConfirmModal';
import { API_ENDPOINT_URL } from '../../constants/default';
import { getAccessToken, axios } from '../../api';
import { applyGrantAction, setGrantApplicationStatusAction } from '../../redux/actions/GrantAction';

const CreateIssueForm = ({ applyGrant, grantApplicationStatus, setLoadingStatus, grantNavigation }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [validToken, setValidToken] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [removeFileIndex, setRemoveFileIndex] = useState(null);
  const [removeMilestoneIndex, setRemoveMilestoneIndex] = useState(null);
  const [attachFileValidation, setAttachFileValidation] = useState(null);
  const [milestoneValidation, setMilestoneValidation] = useState(null);
  const [showDeleteFileModal, setDeleteFileModal] = useState(false);
  const [showDeleteMilestoneModal, setDeleteMilestoneModal] = useState(false);
  const [activeMilestones, setActiveMilestones] = useState([1]);
  const [milestoneCount, setMilestoneCont] = useState([1]);
  const {
    control,
    handleSubmit,
    register,
    errors,
    trigger,
    reset,
    watch,
    getValues,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onSubmit'
  });
  let navigate = useNavigate();

  const handleSubmitGrant = (payload) => {
    applyGrant(payload);
  }

  const onSubmit = (data) => {
    // In selectedFiles you will get all the attached files
    let photos = []
    let milestones = [];
    window.scrollTo(0, 0);
    setLoadingStatus({
      status: true,
    });
    const keys = Object.keys(data)
    const descriptions = keys.filter(i => i.includes('milestone_description'));
    for (let i = 1; i <= descriptions.length; i ++) {
      milestones.push({
        amount: data[`milestone_budget${i}`] * 100,
        description: data[`milestone_description${i}`],
      })
    }
    
    const url = `${API_ENDPOINT_URL}/s3-upload`
    selectedFiles.forEach((file, index) => {
      const body = {
        file_name: file[0].name,
        file_type: file[0].type,
      }
      axios.post(url, body, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }).then((res) => {
        const { signedUrl } = res.data;
        const imgUrl = signedUrl.split('?')[0];
        const options = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        };
        axios.put(signedUrl, file[0], options)
        .then((patchRes) => {
          photos.push(imgUrl)
          if ((index + 1) === selectedFiles.length) {
            const payload = {
              overview: data.overview,
              impact: data.impact,
              benefits: data.benefits,
              dependencies: data.risk_dependencies,
              contigencies: data.risk_solve_plan,
              experiences: data.experience,
              community_feedback: data.feedback_received,
              community_engange: data.plan_to_engage,
              title: data.title,
              milestones: milestones,
              photos: JSON.stringify(photos),
            }
            handleSubmitGrant(payload)
          }
        })
        .catch((err) => {
          console.log('Error', err);
        })
      })
    })
  };

  const handleNextStep = async () => {
    let validated;
    if (activeStep === 0) validated = await trigger(['overview', 'title']);
    else if (activeStep === 1) validated = await trigger(['impact', 'benefits']);
    else if (activeStep === 2) {
      let milestoneValidated = milestoneCount.length ? true : false
      setMilestoneValidation(milestoneValidated);
      if (!milestoneValidated) return;
      setActiveMilestones([...milestoneCount]);
      let fieldNames = []
      milestoneCount.forEach(item => {
        fieldNames.push(`milestone_description${item}`)
        fieldNames.push(`milestone_budget${item}`)
      })
      await trigger(fieldNames)
      validated = await trigger(fieldNames)
    }
    else if (activeStep === 3) {
      validated = await trigger(['risk_dependencies', 'risk_solve_plan'])
    }
    else {
      let attachValidated = selectedFiles.length ? true : false
      setAttachFileValidation(attachValidated);
      validated = (await trigger(['experience', 'feedback_received', 'plan_to_engage']) && attachValidated)
    }
    
    if (validated) setActiveStep(prev => prev + 1);
  };

  const handleDeleteFile = () => {
    const filteredFiles = selectedFiles;
    filteredFiles.splice(removeFileIndex, 1);
    setSelectedFiles([...filteredFiles]);
    setDeleteFileModal(false);
  };

  const handleDeleteMilestone = () => {
    const filteredMilestones = milestoneCount;
    filteredMilestones.splice(removeMilestoneIndex, 1);
    setMilestoneCont([...filteredMilestones]);
    setDeleteMilestoneModal(false);
  }

  const handleAddMilestone = () => {
    let milestone = milestoneCount.length + 1
    setMilestoneCont([...milestoneCount, milestone])
  }

  useEffect(() => {
    if (selectedFiles.length) {
      setAttachFileValidation(true);
    }
  }, [selectedFiles]);

  useEffect(() => {
    if (grantNavigation) {
      const data = { title: 'Yay!', message: 'Thanks for your information.<>We look forward to working with you.'}
      navigate('/confirmation', { state: data})
    }
  }, [grantNavigation])

  return (
    <Loading
      active={grantApplicationStatus}
      spinner
      className="h-screen"
      text='Submitting your grant application...'
    >
      <div className="flex flex-col items-center justify-center w-full pt-24 pb-10">
        <div className="flex flex-col lg:flex-row w-11/12 md:w-3/4 lg:w-3/5">
          <div className="flex-grow lg:w-52 mb-10 lg:mb-0 w-full">
            <VerticalStepper
              steps={['Background', 'Impact', 'Roadmap', 'Risks', 'Supporting Materials']}
              activeStep={activeStep}
            />
          </div>
          <div className="flex-grow pl-0 lg:pl-10 w-full">
            <form className="mb-10 mx-3">
              <CreateIssueHookForm
                activeStep={activeStep}
                register={register}
                errors={errors}
                control={control}
                setSelectedFiles={setSelectedFiles}
                selectedFiles={selectedFiles}
                attachFileValidation={attachFileValidation}
                setDeleteFileModal={setDeleteFileModal}
                setDeleteMilestoneModal={setDeleteMilestoneModal}
                setRemoveFileIndex={setRemoveFileIndex}
                watch={watch}
                activeMilestones={activeMilestones}
                setActiveMilestones={setActiveMilestones}
                milestoneCount={milestoneCount}
                setMilestoneCont={setMilestoneCont}
                milestoneValidation={milestoneValidation}
                setRemoveMilestoneIndex={setRemoveMilestoneIndex}
              />
            </form>
            {
            activeStep === 4
            ? (
                <div
                  className="flex items-center justify-center mx-3 py-5 bg-indigo-600 rounded-md border-gray-200 cursor-pointer"
                  onClick={handleSubmit(d => onSubmit(d))}
                >
                  <p className="text-lg font-bold text-white pr-4">All done!</p>
                  <p className="text-lg text-white"><i className="fal fa-arrow-right" /></p>
                </div>
            )
            : activeStep === 2
              ? (
                <div className="grid grid-cols-2 gap-5 mx-3 text-white">
                  <div className="py-5 flex items-center justify-center bg-gray-600 rounded-md cursor-pointer" onClick={() => handleAddMilestone()}>
                    <p className="text-lg text-white pr-4"><i className="fal fa-plus-circle" /></p>
                    <p className="text-lg font-bold text-white">Add Milestone</p>
                  </div>
                  <div className="py-5 flex items-center justify-center bg-indigo-600 rounded-md cursor-pointer" onClick={() => handleNextStep()}>
                    <p className="text-lg font-bold text-white pr-4">{validToken === false ? 'Try Again' : 'Next Step'}</p>
                    <p className="text-lg text-white">{validToken === false ? null : <i className="fal fa-arrow-right" />}</p>
                  </div>
                </div>
              )
              : (
                <div
                  className="flex items-center justify-center mx-3 py-5 bg-indigo-600 rounded-md border-gray-200 cursor-pointer"
                  onClick={() => handleNextStep()}
                >
                  <p className="text-lg font-bold text-white pr-4">{validToken === false ? 'Try Again' : 'Next Step'}</p>
                  <p className="text-lg text-white">{validToken === false ? null : <i className="fal fa-arrow-right" />}</p>
                </div>
              )
          }
          {
            activeStep > 0 &&
            <div
              className="mx-3 w-full h-4 mt-5 flex space-x-5 items-center justify-center text-gray-400 cursor-pointer"
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
          {
            showDeleteMilestoneModal &&
            <GeneralConfirmModal
              title="Are you sure?"
              message="You want to delete the milestone"
              closeModal={() => setDeleteMilestoneModal(false)}
              open={showDeleteMilestoneModal}
              handleAction={handleDeleteMilestone}
              cancelButtonText="Cancel"
              okButtonText="Confirm"
            />
          }
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default connect(state => {
  return {
    loading: state.grants.loading,
    grantApplicationStatus: state.grants.grantApplicationStatus,
    grantNavigation: state.grants.grantNavigation,
  }
}, dispatch => {
  return {
    applyGrant: data => dispatch(applyGrantAction(data)),
    setLoadingStatus: data => dispatch(setGrantApplicationStatusAction(data)),
  }
})(CreateIssueForm)