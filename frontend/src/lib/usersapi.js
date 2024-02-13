import axios from "axios";
const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
const token = document.cookie.split("token=")[1];
axios.defaults.headers.common["Authorization"] = token;

export const indexUsersApi = async () => {
  try {
    const response = await axios.get(`${backendBaseUrl}/api/users`, {});
    return response.data;
  } catch (error) {
    return error;
  }
};

export const showCurrentUserApi = async (id) => {
  try {
    const response = await axios.get(`${backendBaseUrl}/api/users/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateCurrentUserApi = async (id, formValues) => {
  try {
    const response = await axios.put(`${backendBaseUrl}/api/users/${id}`, {
      user: formValues,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
