import { filter } from 'lodash';
import * as types from '../../constants/actions/Milestone';

/* eslint-disable no-case-declarations */

const initialState = {
  milestone: {},
  milestones: [],
  total: 0,
  loading: false,
  error: '',
  milestoneUpdated: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_MILESTONES_SUCCESS:
      if (!action.res.success) {
        return {
          ...state,
          milestones: [],
          error: '',
          loading: false,
        };
      }
      return {
        ...state,
        milestones: (action.res.data && action.res.data.results) || [],
        total: (action.res.data && action.res.data.total) || 0,
        status: action.res.success,
        loading: false,
      };
    case types.FETCH_MILESTONES_REQUEST:
      return {
        ...state,
        milestones: [],
        loading: true,
      };
    case types.FETCH_MILESTONE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_MILESTONE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_MILESTONE_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_MILESTONE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ADD_MILESTONE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_MILESTONES_FAILED:
      return {
        ...state,
        milestones: [],
        error: 'Bad Request',
        loading: false,
      };
    case types.FETCH_MILESTONE_SUCCESS:
      if (!action.res.data.success) {
        return {
          ...state,
          milestone: {},
          error: '',
          loading: false,
        };
      }
      return {
        ...state,
        milestone: action.res.data || {},
        status: action.res.data.success,
        loading: false,
      };
    case types.FETCH_MILESTONE_FAILED:
      return {
        ...state,
        milestone: {},
        error: 'Bad Request',
        loading: false,
      };
    case types.ADD_MILESTONE_SUCCESS:
      return {
        ...state,
        // milestones: [...state.milestones, action.res.data],
        milestone: action.res.data,
        status: action.res.success,
        loading: false,
        milestoneUpdated: !state.milestoneUpdated
      };
    case types.ADD_MILESTONE_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    case types.UPDATE_MILESTONE_SUCCESS:
      let milestones = state.milestones;
      let milestoneIndex = state.milestones.findIndex(item => item.id === action.res.data.id);
      milestones.splice(milestoneIndex, 1, { ...state.milestones[milestoneIndex], ...action.res.data })
      return {
        ...state,
        milestone: { ...state.milestones[milestoneIndex], ...action.res.data } || {},
        milestones: milestones,
        status: action.res.success,
        loading: false,
        milestoneUpdated: !state.milestoneUpdated
      };
    case types.UPDATE_MILESTONE_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    case types.UPDATE_MILESTONE_DATA_SUCCESS:
      let milestones_data = state.milestones;
      let milestoneIndex_data = state.milestones.findIndex(item => item.id === action.res.data.id);
      milestones_data.splice(milestoneIndex_data, 1, { ...state.milestones[milestoneIndex_data], ...action.res.data })
      // if (action.res.data.milestone_status === 'Complete') {
      //   console.log('COMES here1')
      //   // change to Ready for funding for next milestone if exists
      //   if (state.milestones[milestoneIndex_data + 1]) {
      //     console.log('COMES here2')
      //     milestones_data.splice(milestoneIndex_data + 1, 1, { ...state.milestones[milestoneIndex_data + 1], milestone_status: 'Ready for Funding' })
      //   }
      // }
      return {
        ...state,
        milestone: { ...state.milestones[milestoneIndex_data], ...action.res.data } || {},
        milestones: [...milestones_data],
        status: action.res.success,
        loading: false,
        milestoneUpdated: !state.milestoneUpdated
      };
    case types.UPDATE_MILESTONE_DATA_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    case types.DELETE_MILESTONE_SUCCESS:
      return {
        ...state,
        milestones: action.payload.id ? state.milestones.filter((el) => el.id !== action.payload.id) : state.milestones,
        status: true,
        loading: false,
        milestoneUpdated: !state.milestoneUpdated
      };
    case types.DELETE_MILESTONE_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    default:
      return state;
  }
}
