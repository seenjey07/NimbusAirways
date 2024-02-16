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

export const adminIndexBookingsApi = async () => {
  try {
    const response = await axios.get(`${backendBaseUrl}/admin/bookings`, {});
    return response.data;
  } catch (error) {
    return error;
  }
};

export const adminIndexAircraftsApi = async () => {
  try {
    const response = await axios.get(`${backendBaseUrl}/admin/aircrafts`, {});
    return response.data;
  } catch (error) {
    return error;
  }
};

export const adminCreateUserApi = async ({ userData }) => {
  try {
    const response = await axios.post(`${backendBaseUrl}/admin/users`, {
      user: userData,
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const adminCreateAircraftApi = async (aircraftData) => {
  try {
    const response = await axios.post(
      `${backendBaseUrl}/admin/aircrafts`,
      aircraftData
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const adminCreateRoutesApi = async (routeData) => {
  try {
    const response = await axios.post(
      `${backendBaseUrl}/admin/routes`,
      routeData
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const adminCreateFlightsApi = async (flightsData) => {
  try {
    const response = await axios.post(
      `${backendBaseUrl}/admin/flights`,
      flightsData
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const adminDeleteeUserApi = async ({ id }) => {
  try {
    const response = await axios.delete(`${backendBaseUrl}/admin/users/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const adminUpdateUserApi = async (id, userData) => {
  try {
    const response = await axios.put(`${backendBaseUrl}/admin/users/${id}`, {
      user: userData,
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const adminShowUserApi = async (id) => {
  try {
    const response = await axios.get(`${backendBaseUrl}/admin/users/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const adminShowCurrentBookingApi = async (id) => {
  try {
    const response = await axios.get(`${backendBaseUrl}/admin/bookings/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const adminCheckAuthorization = async () => {
  try {
    const response = await axios.get(`${backendBaseUrl}/admin`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const adminCompanyStats = async () => {
  try {
    const response = await axios.get(`${backendBaseUrl}/admin/stats`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const adminIndexRoutesApi = async () => {
  try {
    const response = await axios.get(`${backendBaseUrl}/admin/routes`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const adminGenerateFlightsApi = async (formData) => {
  try {
    const response = await axios.post(
      `${backendBaseUrl}/admin/genflights`,
      formData
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const adminConfirmEmailApi = async (id) => {
  try {
    const response = await axios.post(`${backendBaseUrl}/admin/users/${id}/confirm`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
