import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ResetPasswordForm = ({ addAlert }) => {
  const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlSearchParams.get("reset_password_token");

    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, []);
  const handleResetPassword = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      addAlert("Passwords do not match");
      return;
    }

    const axiosConfig = {
      headers: {
        Authorization: "",
      },
    };

    try {
      const response = await axios.post(
        `${backendBaseUrl}/password/reset`,
        {
          token,
          password,
        },
        axiosConfig
      );

      console.log(response.data);
      navigate("/login");
      addAlert("success", "Password reset successfully!");
    } catch (error) {
      console.error(error.response.data);
      addAlert("error", "Password reset failed. Please try again.");
    }
  };

  console.log("token", token);
  return (
    <form onSubmit={handleResetPassword}>
      <label>
        New Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Confirm Password:
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <br />
      <button type="submit" className="btn btn-primary">
        Reset Password
      </button>
    </form>
  );
};

export default ResetPasswordForm;
