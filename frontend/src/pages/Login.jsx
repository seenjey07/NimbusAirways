import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginImage from "../assets/LoginImage.jpg";
import axios from "axios";
import { useEffect } from "react";

const Login = ({ addAlert }) => {
  const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const user = {
      user: {
        email: email,
        password: password,
      },
    };

    const axiosConfig = {
      headers: {
        Authorization: "",
      },
    };

    try {
      const res = await axios.post(
        `${backendBaseUrl}/login`,
        user,
        axiosConfig
      );
      const token = res.headers.authorization;
      const user_id = res.data.data;

      console.log("user_id", user_id);
      console.log("token", token);
      document.cookie = `token=${token};path=/`;
      document.cookie = `user_id=${user_id};path=/`;
      addAlert("success", "Login successful");
      navigate("/my_dashboard");
      return res;
    } catch (error) {
      addAlert("error", "Login failed. Incorect email or password");
      return error;
    }
  };

  const getCookie = (name) => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`));

    return cookieValue ? cookieValue.split("=")[1] : null;
  };


  useEffect(() => {
    const existingToken = getCookie("token");
    const existingUserId = getCookie("user_id");

    if (existingToken && existingUserId) {
      console.log("Auto-login with existing token");
      // You may want to validate the token on the server-side for security
      navigate("/my_dashboard");
    }
  }, []);



  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <>
      <div className="hero min-h-screen bg-white">
        <div
          style={{
            backgroundImage: `url(${LoginImage})`,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            height: "100vh",
            width: "100vw",
            backgroundSize: "cover",
            opacity: "0.4",
          }}
        ></div>
        <div className="hero-content flex-col lg:flex-row-reverse gap-16">
          <div className="text-center lg:text-left">
            <div className="flex">
              <h1 className="text-5xl font-bold">Nimbus Airways</h1>
            </div>
            <p className="py-6 italic">
              Discover the Skies with Nimbus Airways: Elevating Your Journey
              Beyond Boundaries
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-accent">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-secondary">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered bg-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-secondary">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered bg-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label className="label">
                  <button className="label-text-alt link link-hover text-secondary">
                    Forgot password?
                  </button>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-secondary" onClick={handleLogin}>
                  Login
                </button>
              </div>
              <div className="divider divider-secondary text-secondary">OR</div>

              <button className="btn btn-secondary">
                <img
                  className="w-6 h-6"
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  loading="lazy"
                  alt="google logo"
                />
                <span>Login with Google</span>
              </button>
            </div>
            <div className="flex justify-center mb-3">
              <label className="label">
                <span className="label-text-alt mr-1 text-secondary">
                  Don't have an account?
                </span>
                <button
                  className="label-text-alt link link-hover text-secondary"
                  onClick={handleSignUp}
                >
                  Register here.
                </button>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
