import { signUpApi } from "../lib/authenticationapi";
import { useNavigate } from "react-router-dom";
const Registration = () => {

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await signUpApi(event);
    

    if (result.response && result.response.data && result.response.data.status.code === 200) {
      console.error(result.response.data.status.message);
    } else if (result.data) {
      console.log('Registration successful', result.data);
      navigate('/login')
    } else {
      console.error('Registration failed');
    }
  };
  
  return (
    <>
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img src="" alt="Lologo" />
        </figure>
        <form className="card-body" onSubmit={handleSubmit}>
          <h2 className="card-title justify-center">Register Now</h2>
          <div className="flex justify-center gap-5">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
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
                className="input input-bordered w-full max-w-xs"
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
                className="input input-bordered w-full max-w-xs"
                name="last_name"
                required
              />
            </label>
          </div>

          <div className="flex justify-center gap-16">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Birthday</span>
              </div>
              <input
                type="date"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs text-center"
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
                className="input input-bordered w-full max-w-xs"
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
                className="input input-bordered w-full max-w-xs"
                name="email"
                required
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Gender</span>
              </div>

              <select className="select select-bordered" name="gender" required>
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
                className="input input-bordered w-full max-w-xs"
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
                className="input input-bordered w-full max-w-xs"
                name="confirmPassword"
                required
              />
            </label>
          </div>

          <div className="flex justify-center">
            <label className="label">
              <input type="checkbox" className="checkbox checkbox-xs mr-2" />
              <div className="label-text">
                I agree with the
                <span className="ml-1 label-text-alt link link-hover">
                  Terms and Conditions
                </span>
              </div>
            </label>
          </div>

          <div className="card-actions justify-center mt-12">
            <button className="btn btn-primary" type="submit">Submit</button>
          </div>

          <div className="flex justify-center mb-3">
              <label className="label">
                <span className="label-text-alt mr-1">
                  Already have an account?
                </span>
                <button
                  className="label-text-alt link link-hover"
                  onClick={() => navigate('/login')}
                >
                  Login here
                </button>
              </label>
            </div>
        </form>
      </div>
    </>
  );
};

export default Registration;
