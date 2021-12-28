import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import jwt from 'jsonwebtoken';

import { fetchGrantAction, updateGrantStatusAction, approveGrantAction, denyGrantAction } from '../../redux/actions/GrantAction';
import { updateMilestoneAction, updateMilestoneDataAction, deleteMilestoneAction, addMilestoneAction } from '../../redux/actions/MilestoneAction';
import { addGrantCommentAction, deleteGrantCommentAction, updateGrantCommentAction } from '../../redux/actions/GrantCommentsAction';
import ApprovalDropdown from '../../Shared/ApprovalDropdown';
import StatusDropdown from '../../Shared/StatusDropdown';
import GrantOverviewTable from './components/GrantOverviewTable';
import SingleComment from '../../Shared/SingleComment';
import MilestoneTable from './components/MilestoneTable';
import GeneralConfirmModal from '../../Shared/GeneralConfirmModal';

const SingleGrant = ({
  fetchGrant,
  grant,
  updateMilestone,
  milestones,
  comments,
  addGrantComment,
  deleteMilestone,
  updateMilestoneData,
  addMilestone,
  addedMilestone,
  deleteGrantComment,
  updateGrantComment,
  updateGrantStatus,
  approveGrant,
  denyGrant,
  milestoneUpdated,
}) => {
  const [grantApprovalStatus, setGrantApprovalStatus] = useState("Pending For Approval");
  const [grantStatus, setGrantStatus] = useState("New");
  const [newMilestones, setNewMilestones] = useState([]);
  const [deleteInfo, setDeleteInfo] = useState({});
  const [editInfo, setEditInfo] = useState({});
  const [status, setStatus] = useState({ current: {}, upcoming: {} });
  const [showStatusChangeModal, setShowStatusChangeModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentEditInfo, setCommentEditInfo] = useState(null);
  const [comment, setComment] = useState('');
  const [isNewMilestone, setIsNewMilestone] = useState(false);
  const { id } = useParams();
  const user = jwt.decode(localStorage.getItem('grant_app_token'));
  const navigate = useNavigate();

  const onAction = (value) => {
    if (value === 'Approve') approveGrant({ id })
    else denyGrant({ id })
  };

  const onChangeStatus = (status) => {
    setGrantStatus(status);
    updateGrantStatus({ id, status })
  };

  const handleDeleteModal = (item, name) => {
    setDeleteInfo({
      ...item,
      type: name
    })
    setShowDeleteModal(true);
  };

  const handleDeleteMilestone = () => {
    if (deleteInfo.notSaved) {
      let dataArray = JSON.parse(JSON.stringify(newMilestones));
      for (var i = 0; i < dataArray.length; i++) {
        if (dataArray[i].milestone_number === deleteInfo.milestone_number) {
          dataArray.splice(i, 1)
        }
      }
      setNewMilestones(dataArray);
    }
    else {
      let id = deleteInfo.id;
      deleteMilestone({ id: id })
    }
    setDeleteInfo({});
  };

  const deleteComment = () => {
    deleteGrantComment({ id: Number(deleteInfo.id) })
    setDeleteInfo({});
  }

  const handleDelete = () => {
    if (deleteInfo.type === 'milestone') {
      handleDeleteMilestone()
    }
    else if (deleteInfo.type === 'comment') {
      deleteComment()
    }
    setShowDeleteModal(false);
  };

  const handleEdit = () => {
    updateMilestoneData({
      id: editInfo.id,
      amount: editInfo.amount,
      milestone_status: editInfo.milestone_status,
    })
  };

  const onChangeHandlerAmount = (value, item) => {
    if (item.notSaved) {
      let dataArray = JSON.parse(JSON.stringify(newMilestones));

      dataArray.filter((el) => el.milestone_number === item.milestone_number)[0].amount = value * 100;
      setNewMilestones(dataArray);
    }
    else {
      setEditInfo({
        ...editInfo,
        amount: value * 100
      })
    }
  };

  const onChangeHandlerStatus = (e, item) => {
    setStatus({
      current: item,
      upcoming: e,
    });
    setShowStatusChangeModal(true);
  };

  const handleAddMilestone = (item) => {
    let isFirstMilestoneReadyForFunding = false;
    if (grant.grant_status.includes(item.milestone_number) && grant.grant_status.includes("Disburse")) {
      isFirstMilestoneReadyForFunding = true;
    }
    addMilestone({
      milestone_number: item.milestone_number,
      milestone_status: item.milestone_status,
      amount: item.amount,
      grant_id: id,
      ready_for_funding: isFirstMilestoneReadyForFunding || undefined,
      ready_for_funding_date: isFirstMilestoneReadyForFunding ? new Date() : undefined
    })
    setIsNewMilestone(false);
  };

  const handleAddMilestoneRow = () => {
    let dataArray = JSON.parse(JSON.stringify(newMilestones));
    dataArray.push({
      milestone_number: newMilestones.length ? (Number(newMilestones.sort((a, b) => b.milestone_number - a.milestone_number)[0].milestone_number) + 1) : milestones.length ? (Number(milestones.sort((a, b) => b.milestone_number - a.milestone_number)[0].milestone_number) + 1) : 1,
      milestone_status: grant.grant_status === 'M1 Disburse' && !grant.milestones.length ? 'Ready for Funding' : 'Not Started',
      amount: null,
      notSaved: true
    })
    setIsNewMilestone(true);
    setNewMilestones(dataArray);
  };

  const handleStatusChange = () => {
    if (status.current.notSaved) {
      let dataArray = JSON.parse(JSON.stringify(newMilestones));

      dataArray.filter((el) => el.milestone_number === status.current.milestone_number)[0].milestone_status = status.upcoming;
      setNewMilestones(dataArray);
    }
    else {
      setEditInfo({
        ...editInfo,
        milestone_status: status.upcoming
      })
    }
    setShowStatusChangeModal(false);
  };

  const updateComment = () => {
    updateGrantComment({
      comments: commentEditInfo.comments,
      id: commentEditInfo.id
    })
  };

  const onPostComment = () => {
    if (!comment) { return }
    addGrantComment({
      comments: comment,
      grant_id: id,
      user_id: user.id
    })
  };

  useEffect(() => {
    if (id) {
      fetchGrant({ id, params: { related: 'milestones,comments.user' } })
    }
  }, [id, milestoneUpdated]);

  useEffect(() => {
    if (grant.grant_status) {
      setGrantApprovalStatus(grant.grant_status === 'Closed' ? 'Denied' : grant.grant_status === 'New' ? 'Pending Approval' : 'Approved')
    }
  }, [grant.grant_status]);

  useEffect(() => {
    if (user && !user.is_admin) {
      localStorage.removeItem('grant_app_token')
      navigate("/error-page")
    }
  }, [user]);

  useEffect(() => {
    if (comment) {
      setComment('')
    }
  }, [comments.length])

  useEffect(() => {
    if (grant.grant_status) {
      setGrantStatus(grant.grant_status)
    }
  }, [grant.grant_status])

  useEffect(() => {
    if (editInfo) {
      setEditInfo()
    }
  }, [JSON.stringify(milestones)])

  useEffect(() => {
    if (commentEditInfo) {
      setCommentEditInfo()
    }
  }, [JSON.stringify(comments)]);

  useEffect(() => {
    if (addedMilestone.id) {
      let dataArray = JSON.parse(JSON.stringify(newMilestones));
      for (var i = 0; i < dataArray.length; i++) {
        if (dataArray[i].milestone_number === addedMilestone.milestone_number) {
          dataArray.splice(i, 1)
        }
      }
      setNewMilestones(dataArray);
    }
  }, [addedMilestone, addedMilestone.id])

  return (
    <div className=''>
      <div className="block xl:flex justify-between items-center px-5 lg:px-10 xl:px-20 py-10 bg-white">
        <p className="text-2xl lg:text-3xl text-black w-full font-bold">Grant: <span>{grant.title}</span></p>
        <div className="flex justify-between xl:justify-end mt-5 xl:mt-0">
          <div className="w-full xl:w-64 pr-4">
            <ApprovalDropdown
              value={grantApprovalStatus}
              onAction={onAction}
              isDisabled={grant.is_onboarded || grant.grant_status === 'Sign Contract' || grant.grant_status === 'Closed'}
            />
          </div>
          <div className="w-full xl:w-64">
            <StatusDropdown
              value={grantStatus}
              onChangeStatus={onChangeStatus}
              isDisabled={!grant.is_onboarded || grantApprovalStatus === "Denied" ? true : false}
              grantMilestones={grant.milestones || []}
              grant={grant}
              status_type="grant"
            />
          </div>
        </div>
      </div>
      <div className='px-5 lg:px-10 xl:px-20 mt-10'>
        <div className="mt-10">
          <GrantOverviewTable grant={grant} />
        </div>

        <div className="mt-10">
          <MilestoneTable
            milestones={milestones.concat(newMilestones).sort((a, b) => a.milestone_number - b.milestone_number)}
            handleDelete={(item) => { handleDeleteModal(item, 'milestone') }}
            handleEdit={handleEdit}
            handleAddMilestone={handleAddMilestone}
            editInfo={editInfo}
            setEditInfo={setEditInfo}
            onChangeHandlerAmount={onChangeHandlerAmount}
            onChangeHandlerStatus={onChangeHandlerStatus}
            grantApprovalStatus={grantApprovalStatus}
            isNewMilestone={isNewMilestone}
          />
        </div>
        <div className="mt-5 w-full inline-flex justify-end items-center">
          <div className={`flex items-center justify-center px-4 md:px-9 h-12 py-4 md:ml-5 bg-indigo-600 hover:bg-indigo-700 shadow rounded-lg ${grantApprovalStatus === "Denied" ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
            <div
              className="flex w-48 items-center justify-center md:justify-around flex-1 h-full"
              onClick={() => grantApprovalStatus !== "Denied" && handleAddMilestoneRow()}
            >
              <div className="text-white text-lg mr-2 md:mr-0">
                +
              </div>
              <p className="text-base md:text-lg font-medium text-white">Add New Milestone</p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          {
            comments.map(comment =>
              <SingleComment
                key={'comment-' + comment.id}
                isUser={comment.user_id === user.id ? true : false}
                onUpdate={updateComment}
                onDelete={() => { handleDeleteModal(comment, 'comment') }}
                onEdit={() => { setCommentEditInfo(comment) }}
                comment={comment}
                editing={commentEditInfo && commentEditInfo.id === comment.id ? true : false} editingComment={commentEditInfo ? commentEditInfo.comments : null}
                onChangeHandler={(e) => {
                  setCommentEditInfo({
                    ...commentEditInfo,
                    comments: e.target.value
                  })
                }}
              />)
          }
          <div className="flex">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img src={user.avatar_url} alt="avatar" />
            </div>
            <div className="flex flex-col flex-grow ml-5">
              <textarea className="border-gray-200 border filter shadow-sm rounded-md p-5 mb-5" name="new-commment" id="new-comment-input" placeholder="Write a comment..." rows="5" onChange={(e) => setComment(e.target.value)} value={comment} />
              <div className="mt-5 flex justify-end items-center">
                <button className="text-white px-5 py-3 bg-indigo-600 hover:bg-indigo-700 shadow rounded-lg" onClick={onPostComment}>Post Comment</button>
              </div>
            </div>
          </div>
        </div>
        {
          showStatusChangeModal &&
          <GeneralConfirmModal
            title="Are you sure?"
            message={`You want to change milestone status from ${status.current && status.current.milestone_status} to ${status.upcoming && status.upcoming}`}
            closeModal={() => setShowStatusChangeModal(false)}
            open={showStatusChangeModal}
            handleAction={handleStatusChange}
            cancelButtonText="Cancel"
            okButtonText="Confirm"
          />
        }
        {
          showDeleteModal &&
          <GeneralConfirmModal
            title="Are you sure?"
            message={`You want to delete ${deleteInfo.type}`}
            closeModal={() => setShowDeleteModal(false)}
            open={showDeleteModal}
            handleAction={handleDelete}
            cancelButtonText="Cancel"
            okButtonText="Confirm"
          />
        }
      </div>
    </div>
  );
};

export default connect(state => {
  return {
    grant: state.grants.grant,
    milestones: state.grants.grant.milestones && state.grants.grant.milestones.length ? state.grants.grant.milestones : [],
    milestoneUpdated: state.milestones && state.milestones.milestoneUpdated,
    loading: state.milestones.loading ? state.milestones.loading : state.grants_comments.loading,
    comments: state.grants.grant.comments && state.grants.grant.comments.length ? state.grants.grant.comments : [],
    addedMilestone: state.milestones.milestone,
  }
}, dispatch => {
  return {
    fetchGrant: (data) => dispatch(fetchGrantAction(data)),
    addGrantComment: (data) => dispatch(addGrantCommentAction(data)),
    deleteGrantComment: (data) => dispatch(deleteGrantCommentAction(data)),
    updateGrantComment: (data) => dispatch(updateGrantCommentAction(data)),
    updateMilestone: (data) => dispatch(updateMilestoneAction(data)),
    updateMilestoneData: (data) => dispatch(updateMilestoneDataAction(data)),
    updateGrantStatus: (data) => dispatch(updateGrantStatusAction(data)),
    approveGrant: (data) => dispatch(approveGrantAction(data)),
    denyGrant: (data) => dispatch(denyGrantAction(data)),
    deleteMilestone: (data) => dispatch(deleteMilestoneAction(data)),
    addMilestone: (data) => dispatch(addMilestoneAction(data)),
  }
})(SingleGrant);
