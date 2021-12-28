import { filter } from 'lodash';
import * as types from '../../constants/actions/Grant';
import * as milestoneTypes from '../../constants/actions/Milestone';
import * as commentsTypes from '../../constants/actions/GrantComments';

/* eslint-disable no-case-declarations */

const initialState = {
  grant: {},
  grants: [],
  stale_grants: [],
  stale_grant: {},
  queued_grants: [],
  queued_grant: {},
  total: 0,
  loading: false,
  has_grant_issue: null,
  stale_grants_total: 0,
  queued_grants_total: 0,
  error: '',
  grantApplicationStatus: false,
  grantNavigation: false,
  onboardNavigation: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_GRANTS_SUCCESS:
      if (!action.res.success) {
        return {
          ...state,
          grants: [],
          error: '',
          loading: false,
        };
      }
      return {
        ...state,
        grants: (action.res.data && action.res.data.results) || [],
        total: (action.res.data && action.res.data.total) || 0,
        status: action.res.success,
        loading: false,
      };
    case types.FETCH_STALE_GRANTS_SUCCESS:
      if (!action.res.success) {
        return {
          ...state,
          stale_grants: [],
          error: '',
          loading: false,
        };
      }
      return {
        ...state,
        stale_grants: (action.res.data && action.res.data.results) || [],
        stale_grants_total: (action.res.data && action.res.data.total) || 0,
        loading: false,
      };
    case types.FETCH_QUEUED_GRANTS_SUCCESS:
      if (!action.res.success) {
        return {
          ...state,
          queued_grants: [],
          error: '',
          loading: false,
        };
      }
      return {
        ...state,
        queued_grants: (action.res.data && action.res.data.results) || [],
        queued_grants_total: (action.res.data && action.res.data.total) || 0,
        loading: false,
      };
    case types.FETCH_GRANTS_REQUEST:
      return {
        ...state,
        grants: [],
        loading: true,
      };
    case types.FETCH_STALE_GRANTS_REQUEST:
      return {
        ...state,
        stale_grants: [],
        loading: true,
      };
    case types.FETCH_QUEUED_GRANTS_REQUEST:
      return {
        ...state,
        queued_grants: [],
        loading: true,
      };
    case types.FETCH_GRANT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_GRANT_BY_TOKEN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_GRANT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_GRANT_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_STALE_GRANT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.APPROVE_GRANT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_QUEUED_GRANT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_QUEUED_GRANTS_FAILED:
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_GRANT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ADD_GRANT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.APPLY_GRANT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.APPLY_GRANT_STATUS:
      return {
        ...state,
        grantApplicationStatus: action.payload.status,
      };
    case types.FETCH_GRANTS_FAILED:
      return {
        ...state,
        grants: [],
        error: 'Bad Request',
        loading: false,
      };
    case types.FETCH_STALE_GRANTS_FAILED:
      return {
        ...state,
        stale_grants: [],
        error: 'Bad Request',
        loading: false,
      };
    case types.FETCH_GRANT_SUCCESS:
      if (!action.res.data.success) {
        return {
          ...state,
          grant: {},
          error: '',
          loading: false,
        };
      }
      return {
        ...state,
        grant: action.res.data || {},
        status: action.res.data.success,
        loading: false,
      };
    case types.FETCH_GRANT_BY_TOKEN_SUCCESS:
      if (!action.res.data.success) {
        return {
          ...state,
          grant: {},
          error: '',
          loading: false,
          has_grant_issue: false,
        };
      }
      return {
        ...state,
        grant: action.res.data || {},
        status: action.res.data.success,
        loading: false,
        has_grant_issue: true,
      };
    case types.FETCH_GRANT_FAILED:
      return {
        ...state,
        grant: {},
        error: 'Bad Request',
        loading: false,
      };
    case types.FETCH_GRANT_BY_TOKEN_FAILED:
      return {
        ...state,
        grant: {},
        error: 'Bad Request',
        loading: false,
        has_grant_issue: false,
      };
    case types.ADD_GRANT_SUCCESS:
      return {
        ...state,
        // grants: [...state.grants, action.res.data],
        status: action.res.success,
        loading: false,
      };
    case types.APPLY_GRANT_SUCCESS:
      return {
        ...state,
        loading: false,
        grantNavigation: true,
      };
    case types.ADD_GRANT_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    case types.APPLY_GRANT_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    case types.UPDATE_GRANT_SUCCESS:
      let grants = filter(state.grants, item => item.id !== action.res.data.id);
      return {
        ...state,
        grant: action.res.data || {},
        grants: [...grants, action.res.data],
        status: action.res.success,
        loading: false,
        onboardNavigation: true,
      };
    case types.UPDATE_GRANT_STATUS_SUCCESS:
      let allMilestones = state.grant.milestones;
      let updatetmilestoneIndex = state.grant.milestones.findIndex(item => item.milestone_number === action.res.data.milestone_number);
      if (updatetmilestoneIndex !== -1)
        allMilestones.splice(updatetmilestoneIndex, 1, { ...state.grant.milestones[updatetmilestoneIndex], milestone_status: action.res.data.milestone_status })
      return {
        ...state,
        grant: { ...state.grant, ...action.res.data, milestones: allMilestones } || {},
        status: action.res.success,
        loading: false,
      };
    case types.APPROVE_GRANT_SUCCESS:
      return {
        ...state,
        loading: false,
        grant: { ...state.grant, grant_status: 'Sign Contract' }
      }
    case types.UPDATE_STALE_GRANT_SUCCESS:
      let stale_grants = state.stale_grants;
      let stale_grantsIndex = state.stale_grants.findIndex(item => item.id === action.res.data.id);
      stale_grants.splice(stale_grantsIndex, 1, { ...state.stale_grants[stale_grantsIndex], ...action.res.data })
      return {
        ...state,
        stale_grant: { ...state.stale_grant[stale_grantsIndex], ...action.res.data } || {},
        stale_grants: [...stale_grants],
        // status: action.res.success,
        loading: false,
      };
    case types.UPDATE_QUEUED_GRANT_SUCCESS:
      let queued_grants = state.queued_grants;
      let queued_grantsIndex = state.queued_grants.findIndex(item => item.id === action.res.data.id);
      queued_grants.splice(queued_grantsIndex, 1, { ...state.queued_grants[queued_grantsIndex], ...action.res.data })
      return {
        ...state,
        queued_grant: { ...state.queued_grants[queued_grantsIndex], ...action.res.data } || {},
        queued_grants: [...queued_grants],
        // status: action.res.success,
        loading: false,
      };
    case types.UPDATE_GRANT_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    case types.APPROVE_GRANT_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    case types.UPDATE_STALE_GRANT_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    case types.DENY_GRANT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.DENY_GRANT_SUCCESS:
      return {
        ...state,
        grant: { ...state.grant, grant_status: 'Closed' },
        loading: false,
      };
    case types.DENY_GRANT_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    case types.UPDATE_GRANT_STATUS_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    case types.UPDATE_QUEUED_GRANT_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    case types.DELETE_GRANT_SUCCESS:
      grants = filter(state.grants, item => item.id !== action.payload.id);

      return {
        ...state,
        grants: [...grants],
        status: true,
        loading: false,
      };
    case types.DELETE_GRANT_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    case milestoneTypes.DELETE_MILESTONE_SUCCESS:
      if (action.payload.id) {
        return {
          ...state,
          grant: {
            ...state.grant,
            milestones: state.grant.milestones.filter((el) => el.id !== action.payload.id)
          }
        };
      }
      else {
        return {
          ...state
        };
      }
    case milestoneTypes.UPDATE_MILESTONE_DATA_SUCCESS:
      let milestones = state.grant.milestones.sort((a, b) => a.milestone_number - b.milestone_number);
      let milestoneIndex = state.grant.milestones.findIndex(item => item.id === action.res.data.id);
      milestones.splice(milestoneIndex, 1, { ...state.grant.milestones[milestoneIndex], ...action.res.data })

      if (action.res.data.milestone_status === 'Complete') {
        // change to Ready for funding for next milestone if exists
        if (state.grant.milestones[milestoneIndex + 1]) {
          milestones.splice(milestoneIndex + 1, 1, { ...state.grant.milestones[milestoneIndex + 1], milestone_status: 'Ready for Funding' })
        }
      }
      return {
        ...state,
        grant: {
          ...state.grant,
          grant_status: action.res.data.milestone_status === 'In Progress' ? `M${action.res.data.milestone_number}` : action.res.data.milestone_status === 'Ready for Funding' ? `M${action.res.data.milestone_number} Disburse` : `M${action.res.data.milestone_number} Review`,
          milestones: milestones
        }
      };
    case milestoneTypes.UPDATE_MILESTONE_SUCCESS:
      if (!state.grant.milestones) {
        return {
          ...state
        }
      }
      let Milestones = state.grant.milestones.sort((a, b) => a.milestone_number - b.milestone_number);
      let milestoneIndex2 = state.grant.milestones.findIndex(item => item.id === action.res.data.id);
      if (action.res.data.milestone_status === 'In Progress') {
        Milestones.splice(milestoneIndex2, 1, { ...state.grant.milestones[milestoneIndex2], ...action.res.data })
      }
      return {
        ...state,
        grant: {
          ...state.grant,
          grant_status: action.res.data.milestone_status === 'In Progress' ? `M${action.res.data.milestone_number}` : action.res.data.milestone_status === 'Ready for Funding' ? `M${action.res.data.milestone_number} Disburse` : `M${action.res.data.milestone_number} Review`,
          milestones: Milestones
        }
      };
    case milestoneTypes.ADD_MILESTONE_SUCCESS:
      return {
        ...state,
        grant: {
          ...state.grant,
          milestones: state.grant.milestones.concat(action.res.data)
        }
      };
    case commentsTypes.ADD_GRANT_COMMENT_SUCCESS:
      return {
        ...state,
        grant: {
          ...state.grant,
          comments: state.grant.comments.concat(action.res.data)
        }
      };
    case commentsTypes.DELETE_GRANT_COMMENT_SUCCESS:
      return {
        ...state,
        grant: {
          ...state.grant,
          comments: state.grant.comments.filter((el) => el.id !== action.payload.id)
        }
      };
    case commentsTypes.UPDATE_GRANT_COMMENT_SUCCESS:
      let comments = state.grant.comments;
      let commentIndex = state.grant.comments.findIndex(item => item.id === action.res.data.id);
      comments.splice(commentIndex, 1, { ...state.grant.comments[commentIndex], ...action.res.data })

      return {
        ...state,
        grant: {
          ...state.grant,
          comments: comments
        }
      };
    default:
      return state;
  }
}
