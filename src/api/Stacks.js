
import { getAccessToken, axios } from './index.js';
import { API_ENDPOINT_URL } from '../constants/default.js';

export const getStackPrice = (payload) => {
    return axios.post(`${API_ENDPOINT_URL}/stacks/price`, payload, {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        },
    }).then(res => ({
        success: true,
        data: res.data,
    })).catch(err => ({
        success: false,
        message: err.response.data.message,
    }));
};

