import { getAccessToken, makeUrl, axios } from "./index.js";
import { API_ENDPOINT_URL } from "../constants/default.js";

export const getGrants = (payload = {}) => {

  let url;

  if (payload.searchValue)
    url = `${API_ENDPOINT_URL}/grants?search=${payload.searchValue}`;
  else
    url = `${API_ENDPOINT_URL}/grants`;

  return axios
    .get(url, {
      params: {
        ...(payload.params || {})
      },
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    .then((res) => ({
      success: true,
      data: res.data,
    }))
    .catch((err) => ({
      success: false,
      message: err.response.data.message,
    }));
};

export const getGrantById = (payload) => {
  const id = payload.id;
  const url = makeUrl(`${API_ENDPOINT_URL}/grants/${id}`, {
    ...(payload.params || {}),
  });
  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    .then((res) => ({
      success: true,
      data: res.data,
    }))
    .catch((err) => ({
      success: false,
      message: err.response.data.message,
    }));
};

export const getStaleGrants = (payload) => {
  const id = payload.id;
  const url = makeUrl(`${API_ENDPOINT_URL}/grants/stale`, {
    ...(payload.params || {}),
  });
  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    .then((res) => ({
      success: true,
      data: res.data,
    }))
    .catch((err) => ({
      success: false,
      message: err.response.data.message,
    }));
};

export const getQueuedGrants = (payload) => {
  const id = payload.id;
  const url = makeUrl(`${API_ENDPOINT_URL}/grants/queued`, {
    ...(payload.params || {}),
  });
  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    .then((res) => ({
      success: true,
      data: res.data,
    }))
    .catch((err) => ({
      success: false,
      message: err.response.data.message,
    }));
};

export const updateStaleGrant = (payload) => {
  const token = payload.token;
  const url = `${API_ENDPOINT_URL}/grants/stale/${payload.id}`;
  return axios
    .patch(url, payload, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    .then((res) => ({
      success: true,
      data: res.data,
    }))
    .catch((err) => ({
      success: false,
      message: err.response.data.message,
    }));
};

export const updateQueuedGrant = (payload) => {
  const token = payload.token;
  const url = `${API_ENDPOINT_URL}/grants/queued/${payload.id}`;
  return axios
    .patch(url, payload, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    .then((res) => ({
      success: true,
      data: res.data,
    }))
    .catch((err) => ({
      success: false,
      message: err.response.data.message,
    }));
};

export const getGrantByToken = (payload) => {
  const token = payload.token;
  const url = makeUrl(`${API_ENDPOINT_URL}/grants/token/${token}`, {
    ...(payload.params || {}),
  });
  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    .then((res) => ({
      success: true,
      data: res.data,
    }))
    .catch((err) => ({
      success: false,
      message: err.response.data.message,
    }));
};

export const addGrant = (payload) => {
  const url = `${API_ENDPOINT_URL}/grants`;
  return axios
    .post(url, payload, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    .then((res) => ({
      success: true,
      data: res.data,
    }))
    .catch((err) => ({
      success: false,
      message: err.response.data.message,
    }));
};

export const applyGrant = (payload) => {
  const url = `${API_ENDPOINT_URL}/grants/apply`;
  return axios.post(url, payload, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  }).then(res => ({
    success: true,
    data: res.data,
  })).catch(err => ({
    success: false,
    message: err.response.data.message,
  }));
};

export const updateGrant = (payload) => {
  const token = payload.token;
  const url = `${API_ENDPOINT_URL}/grants/${token}`;
  return axios
    .patch(url, payload, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    .then((res) => ({
      success: true,
      data: res.data,
    }))
    .catch((err) => ({
      success: false,
      message: err.response.data.message,
    }));
};

export const updateGrantStatus = (payload) => {
  const token = payload.token;
  const url = `${API_ENDPOINT_URL}/grants/status/${payload.id}`;
  return axios
    .patch(url, payload, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    .then((res) => ({
      success: true,
      data: res.data,
    }))
    .catch((err) => ({
      success: false,
      message: err.response.data.message,
    }));
};

export const approveGrant = (payload) => {
  const token = payload.token;
  const url = `${API_ENDPOINT_URL}/grants/approve/${payload.id}`;
  return axios
    .patch(url, payload, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    .then((res) => ({
      success: true,
      data: res.data,
    }))
    .catch((err) => ({
      success: false,
      message: err.response.data.message,
    }));
};

export const denyGrant = (payload) => {
  const token = payload.token;
  const url = `${API_ENDPOINT_URL}/grants/deny/${payload.id}`;
  return axios
    .patch(url, payload, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    .then((res) => ({
      success: true,
      data: res.data,
    }))
    .catch((err) => ({
      success: false,
      message: err.response.data.message,
    }));
};

export const deleteGrant = (payload) => {
  const id = payload.id;
  const url = `${API_ENDPOINT_URL}/grants/${id}`;
  return axios
    .delete(url, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    .then((res) => ({
      success: true,
      data: res.data,
    }))
    .catch((err) => ({
      success: false,
      message: err.response.data.message,
    }));
};
