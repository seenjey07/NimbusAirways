// eslint-disable-next-line react/prop-types
import { useState } from "react";
import axios from "axios";
// eslint-disable-next-line react/prop-types
const ForgotPasswordModal = ({ addAlert }) => {
  const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    const axiosConfig = {
      headers: {
        Authorization: "",
      },
    };

    try {
      const res = await axios.post(
        `${backendBaseUrl}/password`,
        { email },
        axiosConfig
      );
      document.getElementById("ForgotPassword").close();
      addAlert("success", "Email instructions sent. Please check your inbox");
      return res;
    } catch (error) {
      addAlert("error", "Login failed. Incorect email or password.");
      return error;
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4 flex justify-center text-white">
        Forgot Password
      </h2>
      <form>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 p-2 w-full border rounded"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-end">
          <button
            type="submit"
            onClick={handleForgotPassword}
            className="btn btn-secondary w-full"
          >
            Send Reset Password Instructions
          </button>
        </div>
      </form>
    </>
  );
};

export default ForgotPasswordModal;
