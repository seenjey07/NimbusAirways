const Registration = () => {
  return (
    <>
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img src="" alt="Lologo" />
        </figure>
        <div className="card-body">
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
                className="input input-bordered w-full max-w-xs"
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
                required
              />
            </label>
          </div>

          <div className="card-actions justify-end">
            <button className="btn btn-primary">Listen</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
