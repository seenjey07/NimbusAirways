import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginImage from "./assets/LoginImage.jpg";
import axios from "axios";
import ForgotPasswordModal from "./components/ForgotPasswordModal";
import LoginOAuth2 from '@okteto/react-oauth2-login';
import { v4 as uuidv4 } from 'uuid';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { csrfToken } from "./lib/utils"

// eslint-disable-next-line react/prop-types
const Login = ({ addAlert }) => {
  const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
  const gitHubClient = import.meta.env.VITE_GITHUB_CLIENT_ID 
  const googleClient = import.meta.env.VITE_GOOGLE_CLIENT_ID 
  const googleSecret = import.meta.env.VITE_GOOGLE_SECRET
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [state, setState] = useState();
  const [token, setToken] = useState()
  const navigate = useNavigate();

  useEffect(() => {
    const generateState = () => {
      const newState = uuidv4();
      const csrfToken = document.querySelector(
        'meta[name="csrf-token"]'
      ).content;
      setToken(csrfToken);
      setState(newState);

      return newState;
    };
    generateState();
  }, []); 
  
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
      document.cookie = `token=${token};path=/`;
      addAlert("success", "Login successful");
      navigate("../user/my_dashboard");
      return res;
    } catch (error) {
      addAlert("error", "Login failed. Incorect email or password.");
      return error;
    }
  };

  const handleLoginWithGithub = async () => {
    try {
      const axiosConfig = {
        headers: {
          "X-CSRF-Token": csrfToken,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `https://github.com/login/oauth/authorize`,
        axiosConfig
      );

      const githubOAuthUrl = response
      console.log("GitHub OAuth URL:", githubOAuthUrl);
      console.log("Github login", response);
      window.location.href = githubOAuthUrl;
    } catch (error) {
      addAlert("error", "Login failed. Please try again");
    }
  };

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const code = urlParams.get("code");

  //   if (code) {
  //     axios
  //       .post("http://localhost:3000/users/auth/github/callback", { code })
  //       .then((response) => {
  //         console.log("GitHub login successful:", response.data);
  //       })
  //       .catch((error) => {
  //         console.error("GitHub login failed:", error);
  //       });
  //   }
  // }, []);

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleSuccess = (response) => {
    console.log('Google login successful:', response);
    fetchEmail(response.credential);
  };

  // const sendToAnotherEndpoint = (email) => {

  //   console.log('Sending email to another endpoint:', email);
  //   axios.post(`'https://example.com/your/endpoint'`, { email })
  //     .then((response) => {
  //       console.log('Response from another endpoint:', response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error posting to another endpoint:', error);
  //     });
  // };

  const fetchEmail = (accessToken) => {
    console.log(accessToken, "AT on fetch")
    axios.post("https://www.googleapis.com/oauth2/v4/token", 
    {
      "code": "Bearer" + " " + accessToken,
      "client_id": googleClient,
      "client_secret": googleSecret,
      "redirect_uri": `${backendBaseUrl}/auth/google_oauth2/callback`,
      "grant_type": "authorization_code",
    }
    )
      .then(response => {
        console.log('Login successful, backend response:', response);
      })
      .catch(error => {
        console.error('Error exchanging authorization code:', error);
      });
  };


  // const handleSuccess = (credentialResponse) => {
  //   console.log(credentialResponse, "I AM RESPONSE FROM GOOGLE")
  //   const authorizationCode = credentialResponse;
  //   axios.post(`${backendBaseUrl}/auth/google_oauth2/callback`, { code: authorizationCode })
  //     .then(response => {
  //       console.log('Login successful, backend response:', response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error exchanging authorization code:', error);
  //     });
  // };


  const handleError = (errorResponse) => {
    console.error('Google login failed', errorResponse);
  };

  return (
    <>
      <dialog id="ForgotPassword" className="modal">
        <div className="modal-box bg-accent">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-secondary">
              ✕
            </button>
          </form>
          <ForgotPasswordModal addAlert={addAlert} />
        </div>
      </dialog>

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
              <h1
                className="text-5xl font-bold hover:cursor-pointer hover:text-primary"
                onClick={() => navigate("/")}
              >
                NimbusAirways
              </h1>
            </div>
            <p className="py-6 italic">
              Discover the Skies with NimbusAirways: <br />
              Elevating Your Journey Beyond Boundaries
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-accent">
            <h1 className="text-3xl font-bold flex justify-center mt-3 text-secondary">Welcome</h1>
            <sub className="text-xs italic flex justify-center text-center text-secondary ml-1 px-6">&quot;Fostering connections, enabling people to explore the wonders of the world, and creating unforgettable travel experiences.&quot;</sub>
            <div className="card-body">
              <div className="form-control ">
                <label className="input input-bordered flex items-center gap-2 bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                <input
                  type="email"
                  placeholder="Email"
                  className="placeholder-ml-1 bg-white grow"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                </label>
              </div>
              <div className="form-control">
                <label className="input input-bordered flex items-center gap-2 bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                <input
                  type="password"
                  placeholder="Password"
                  className="grow bg-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                </label>
                <label className="label">
                  <button
                    className="label-text-alt link link-hover text-secondary"
                    onClick={() =>
                      document.getElementById("ForgotPassword").showModal()
                    }
                  >
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
              <LoginOAuth2
              provider="github"
              clientId={gitHubClient}
              X-CSRF-Token={token}
              state={state}
              authorizeUri="https://github.com/login/oauth/authorize"
              onSuccess={handleLoginWithGithub}
              >
                <button
                  // onSuccess={handleLoginWithGithub}
                  className="btn bg-white w-full"
                >
                  <img
                    className="w-6 h-6"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/600px-Octicons-mark-github.svg.png"
                    loading="lazy"
                    alt="google logo"
                  />
                  <span>Login with Github</span>
                </button>
              </LoginOAuth2>
              
              <GoogleOAuthProvider clientId={googleClient}>
                <div className=" flex justify-center w-full">
                  <GoogleLogin
                  onSuccess={handleSuccess}
                  onError={handleError}
                  >
                  {/* <button className="btn btn-secondary">
                    <img
                      className="w-6 h-6"
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      loading="lazy"
                      alt="google logo"
                    />
                    <span>Login with Google</span>
                  </button> */}
                  </GoogleLogin>
                </div>
              </GoogleOAuthProvider>

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
