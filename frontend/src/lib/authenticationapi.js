import axios from "axios";
const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
const token = document.cookie.split("token=")[1];
axios.defaults.headers.common["Authorization"] = token;

export const signUpApi = async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (password !== confirmPassword) {
    return {
      response: {
        data: { status: { code: 422, message: "Passwords do not match" } },
      },
    };
  }

  const newUser = {
    user: {
      first_name: formData.get("first_name"),
      middle_name: formData.get("middle_name"),
      last_name: formData.get("last_name"),
      password: formData.get("password"),
      birth_date: formData.get("birth_date"),
      email: formData.get("email"),
      phone_number: formData.get("phone_number"),
      gender: formData.get("gender"),
      role: "Traveler",
    },
  };
  try {
    const res = await axios.post(`${backendBaseUrl}/signup`, newUser);
    return res;
  } catch (error) {
    console.error("Error in signUpApi:", error);

    if (error.response) {
      return error.response;
    } else {
      return { error: "Network error or server unreachable" };
    }
  }
};

export const checkAuthorizationApi = async () => {
  try {
    const response = await axios.get(`${backendBaseUrl}/api/authorization`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
