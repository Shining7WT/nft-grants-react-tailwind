import { filter } from 'lodash';
import * as types from '../../constants/actions/Global';

/* eslint-disable no-case-declarations */

const initialState = {
    notification: {},
    loading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.SET_NOTIFICATION:
            return {
                ...state,
                notification: {
                    id: (new Date()).getTime(),
                    ...action.payload
                },
            };
        default:
            return state;
    }
}
