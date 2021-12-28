import * as types from '../../constants/actions/Milestone';

export const fetchMilestonesAction = payload => ({
  type: types.FETCH_MILESTONES_REQUEST,
  payload,
});

export const fetchMilestoneAction = payload => ({
  type: types.FETCH_MILESTONE_REQUEST,
  payload,
});

export const addMilestoneAction = payload => ({
  type: types.ADD_MILESTONE_REQUEST,
  payload,
});

export const updateMilestoneAction = payload => ({
  type: types.UPDATE_MILESTONE_REQUEST,
  payload,
});

export const updateMilestoneDataAction = payload => ({
  type: types.UPDATE_MILESTONE_DATA_REQUEST,
  payload,
});


export const deleteMilestoneAction = payload => ({
  type: types.DELETE_MILESTONE_REQUEST,
  payload,
});
