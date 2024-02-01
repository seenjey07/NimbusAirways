
const CreateUsersModal = () => {
    const handleSubmit = () => {
        console.log('Form submitted');
    }
    return (
    <>     
        <form className="card-body" onSubmit={handleSubmit}>
        <h2 className="card-title justify-center">CREATE USER</h2>
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
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Role</span>
            </div>

            <select className="select select-bordered" name="gender" required>
                <option disabled>Select</option>
                <option>Traveler</option>
                <option>Admin</option>
            </select>
            </label>
        </div>

        <div className="card-actions justify-center mt-12">
            <button className="btn btn-primary" type="submit">Submit</button>
        </div>
        </form>
    </>
)
}

export default CreateUsersModal