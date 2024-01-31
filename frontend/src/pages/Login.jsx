import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleLogin = async () => {
    // try {
    //   const res = await revertStockBalance(
    //   );
    //   if (res?.status == 200) {
    //   }
    //   else {
    //   }
    //   xxx
    // } catch (error) {
    //   console.error("Error transferring from stock to wallet:", error);
    // }
    console.log("Handle login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse gap-16">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Nimbus Airways</h1>
            <p className="py-6 italic">
              Discover the Skies with Nimbus Airways: Elevating Your Journey
              Beyond Boundaries
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
                <div className="form-control">
                    <label className="label">
                    <span className="label-text">Email</span>
                    </label>
                    <input
                    type="email"
                    placeholder="Email"
                    className="input input-bordered"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                    <span className="label-text">Password</span>
                    </label>
                    <input
                    type="password"
                    placeholder="Password"
                    className="input input-bordered"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                    <label className="label">
                    <button className="label-text-alt link link-hover">
                        Forgot password?
                    </button>
                    </label>
                </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={handleLogin}>
                  Login
                </button>
              </div>
              <div className="divider">OR</div>

              <button className="btn btn-accent">
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
                <span className="label-text-alt mr-1">
                  Dont have an account?
                </span>
                <button
                  className="label-text-alt link link-hover"
                  onClick={handleSignUp}
                >
                  Register here
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