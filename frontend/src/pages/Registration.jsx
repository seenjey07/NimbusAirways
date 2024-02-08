import { signUpApi } from "../lib/authenticationapi";
import { useNavigate } from "react-router-dom";
import logoImage from "../assets/logo.png";
import RegistrationImage from "../assets/RegistrationImage.jpg";

const Registration = () => {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await signUpApi(event);

    if (
      result.response &&
      result.response.data &&
      result.response.data.status.code === 200
    ) {
      console.error(result.response.data.status.message);
    } else if (result.data) {
      console.log("Registration successful", result.data);
      navigate("/login");
    } else {
      console.error("Registration failed");
    }
  };

  return (
    <>
      <figure className="flex mt-2 pl-10 justify-start">
        <img src={logoImage} alt="Logo" className="w-32 h-auto" />
      </figure>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          backgroundImage: `url(${RegistrationImage})`,
          backgroundSize: "cover",
          opacity: 0.4,
        }}
      ></div>

      <div className="hero lg:card-side p-1 bg-ghost shadow-xl relative">
        <form className="pt-0" onSubmit={handleSubmit}>
          <h2 className="card-title justify-center font-serif text-accent mb-4">
            Register Now
          </h2>

          <div className="flex justify-center gap-5">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs bg-white"
                name="first_name"
                required
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Middle Name</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs bg-white"
                name="middle_name"
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs bg-white"
                name="last_name"
                required
              />
            </label>
          </div>

          <div className="flex justify-center gap-16">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Birth Date</span>
              </div>
              <input
                type="date"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs text-center bg-white"
                name="birth_date"
                required
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Contact Number</span>
              </div>
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs bg-white"
                name="phone_number"
                required
              />
            </label>
          </div>

          <div className="flex justify-center gap-16">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="email"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs bg-white"
                name="email"
                required
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Gender</span>
              </div>

              <select
                className="select select-bordered bg-white"
                name="gender"
                required
              >
                <option disabled>Select</option>

                <option>Male</option>
                <option>Female</option>
              </select>
            </label>
          </div>

          <div className="flex justify-center gap-16">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs bg-white"
                name="password"
                required
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Confirm Password</span>
              </div>
              <input
                type="password"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs bg-white"
                name="confirmPassword"
                required
              />
            </label>
          </div>

          <div className="flex justify-center mt-4">
            <label className="label">
              <input
                type="checkbox"
                className="checkbox checkbox-xs mr-2 bg-white"
              />
              <div className="label-text">
                I agree with the
                <span className="ml-1 label-text link link-hover">
                  Terms and Conditions
                </span>
              </div>
            </label>
          </div>

          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>

          <div className="flex justify-center">
            <label className="label">
              <span className="label-text-alt mr-1">
                Already have an account?
              </span>
              <button
                className="label-text-alt link link-hover"
                onClick={() => navigate("/login")}
              >
                Login here.
              </button>
            </label>
          </div>
        </form>
      </div>
    </>
  );
};

export default Registration;
