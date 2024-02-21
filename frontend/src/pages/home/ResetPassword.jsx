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
    document.getElementById('my_modal_5').showModal()
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
      await axios.post(
        `${backendBaseUrl}/password/reset`,
        {
          token,
          password,
        },
        axiosConfig
      );
      navigate("/login");
      addAlert("success", "Password reset successfully!");
    } catch (error) {
      addAlert("error", "Password reset failed. Please try again.");
    }
  };

  return (
    <>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white">
          <h3 className="font-bold text-2xl flex justify-center">Change Password</h3>
          <div className="modal-action">
            <form 
            className="flex flex-col w-full justify-center gap-2"
            onSubmit={handleResetPassword}>
              <label className="input input-bordered flex items-center gap-2">
              New Password:
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                <input
                  className="grow"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
              <br />
              <label className="input input-bordered flex items-center gap-2">
                Confirm Password:
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                <input
                  className="grow"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </label>
              <br />
              <button type="submit" className="btn btn-secondary">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ResetPasswordForm;
