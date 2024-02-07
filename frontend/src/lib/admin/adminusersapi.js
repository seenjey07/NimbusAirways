import axios from "axios";

const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
const token = document.cookie.split("token=")[1];
axios.defaults.headers.common["Authorization"] = token;


export const adminIndexUsersApi = async () => {
  try {
    const response = await axios.get(`${backendBaseUrl}/admin/users`, {});
    return response.data;
  } catch (error) {
    return error;
  }
};

export const adminIndexFlightsApi = async () => {
  try {
    const response = await axios.get(`${backendBaseUrl}/admin/flights`, {});
    return response.data;
  } catch (error) {
    return error;
  }
};

export const adminCreateUserApi = async ({userData}) => {
  try {
    const response = await axios.post(`${backendBaseUrl}/admin/users`, {user: userData});
    return response.data;
  } catch (error) {
    return Promise.reject(error)
  }
};

export const adminDeleteeUserApi = async ({id}) => {
  try {
    const response = await axios.delete(`${backendBaseUrl}/admin/users/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error)
  }
};

export const adminUpdateUserApi = async (id, userData) => {
  try {
    const response = await axios.put(`${backendBaseUrl}/admin/users/${id}`, {user: userData});
    return response.data;
  }
  catch (error) {
    return Promise.reject(error)
  }
}

export const adminShowUserApi = async (id) => {
  try {
    const response = await axios.get(`${backendBaseUrl}/admin/users/${id}`);
    return response.data;
  }
  catch (error) {
    return Promise.reject(error)
  }
}