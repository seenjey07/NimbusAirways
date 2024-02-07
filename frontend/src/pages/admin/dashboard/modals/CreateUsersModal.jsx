import { adminCreateUserApi } from "../../../../lib/admin/adminusersapi"
// eslint-disable-next-line react/prop-types
const CreateUsersModal = ({addAlert}) => {
        const handleSubmit = async (event) => {
          event.preventDefault();
      
          const formData = new FormData(event.target);
          const userData = {};
          
          formData.forEach((value, key) => {
            userData[key] = value;
          });
      
          try {
            const response = await adminCreateUserApi({ userData });
            addAlert('success', 'User created successfuly!');
            console.log('User created successfully:', response);
            document.getElementById('CreateUsers').close();
          } catch (error) {
            addAlert('error', error.response.data.errors);
            console.log('error', error.response.data.errors);
          }
        };

    return (
    <>     
        <form className="card-body" onSubmit={handleSubmit}>
        <h2 className="card-title justify-center text-secondary text-3xl font-bold">CREATE USER</h2>
        <div className="flex justify-center gap-5">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-secondary">First Name</span>
            </div>
            <input
              type="text"
              placeholder="First Name"
              className="input input-bordered w-full max-w-xs"
              name="first_name"
              required
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-secondary">Middle Name</span>
            </div>
            <input
              type="text"
              placeholder="Middle Name"
              className="input input-bordered w-full max-w-xs"
              name="middle_name"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-secondary">Last Name</span>
            </div>
            <input
              type="text"
              placeholder="Last Name"
              className="input input-bordered w-full max-w-xs"
              name="last_name"
              required
            />
          </label>
        </div>

        <div className="flex justify-center gap-16">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-secondary">Birthday</span>
            </div>
            <input
              type="date"
              placeholder="Birthday"
              className="input input-bordered w-full max-w-xs text-center"
              name="birth_date"
              required
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-secondary">Contact Number</span>
            </div>
            <input
              type="number"
              placeholder="0912345678"
              className="input input-bordered w-full max-w-xs"
              name="phone_number"
              required
            />
          </label>
        </div>

        <div className="flex justify-center gap-16">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-secondary">Email</span>
            </div>
            <input
              type="email"
              placeholder="user@email.com"
              className="input input-bordered w-full max-w-xs"
              name="email"
              required
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-secondary">Gender</span>
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
              <span className="label-text text-secondary">Password</span>
            </div>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full max-w-xs"
              name="password"
              required
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-secondary">Confirm Password</span>
            </div>
            <input
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered w-full max-w-xs"
              name="confirmPassword"
              required
            />
          </label>
        </div>

        <div className="flex justify-center">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-secondary">Role</span>
            </div>

            <select className="select select-bordered" name="role" required>
              <option disabled>Select</option>
              <option>Traveler</option>
              <option>Admin</option>
            </select>
          </label>
        </div>

        <div className="card-actions justify-center mt-12">
          <button className="btn btn-secondary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
)
}

export default CreateUsersModal