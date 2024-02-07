import React, { useState } from "react";
import axios from "axios";

const UserProfileForm = ({ current_user }) => {
  const [formValues, setFormValues] = useState({
    first_name: current_user.first_name,
    middle_name: current_user.middle_name,
    last_name: current_user.last_name,
    gender: current_user.gender,
    phone_number: current_user.phone_number,
    email: current_user.email,
    password: "",
    new_password: "",
    confirm_new_password: "",
  });

  const [errors, setErrors] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    gender: "",
    phone_number: "",
    email: "",
    password: "",
    new_password: "",
    confirm_new_password: "",
  });

  const validatePassword = () => {
    const { new_password, confirm_new_password } = formValues;
    if (new_password !== confirm_new_password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        new_password: "Passwords do not match",
        confirm_new_password: "Passwords do not match",
      }));
      return false;
    }
    return true;
  };

  const validateForm = () => {
    let isValid = true;

    if (!validatePassword()) {
      isValid = false;
    }

    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.put("/users/update", formValues);

        if (response.status === 200) {
          console.log("User details updated successfully");
          onUserUpdate(response.data); // to check yung sa user response eklabu
        } else {
          console.log("Update failed:", response.data.errors);
          setErrors(response.data.errors);
        }
      } catch (error) {
        console.error("Error updating user details:", error);
      }
    } else {
      console.log("Form validation failed");
    }
  };

  return (
    <>
      <h3 className="card-title rounded text-white place-self-center">
        Profile
      </h3>
      <form>
        <div className="flex flex-col lg:flex-row w-full bg-white rounded p-2">
          <div className="flex-grow lg:w-1/2">
            {/* Full Name */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text mb-0">First Name: </span>

                <input
                  type="text"
                  name="first_name"
                  className="input input-bordered m-0 p-1 h-fit w-fit max-w-xs"
                  value={formValues.first_name}
                  onChange={handleChange}
                />
              </div>
            </label>
            <span>{errors.first_name}</span>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text mb-0">Middle Name: </span>

                <input
                  type="text"
                  name="middle_name"
                  className="input input-bordered m-0 p-1 h-fit w-fit max-w-xs"
                  value={formValues.middle_name}
                  onChange={handleChange}
                />
              </div>
            </label>
            <span>{errors.middle_name}</span>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text mb-0">Last Name: </span>

                <input
                  type="text"
                  name="last_name"
                  className="input input-bordered m-0 p-1 h-fit w-fit max-w-xs"
                  value={formValues.last_name}
                  onChange={handleChange}
                />
              </div>
            </label>
            <span>{errors.last_name}</span>

            {/* Gender */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text mb-0">Gender: </span>

                <input
                  type="dropdown"
                  name="gender"
                  className="input input-bordered m-0 p-1 h-fit w-fit max-w-xs"
                  value={formValues.gender}
                  onChange={handleChange}
                />
              </div>
            </label>
            <span>{errors.gender}</span>

            {/* Birthday */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text mb-0">Birth Date: </span>

                <input
                  type="date"
                  name="birth_date"
                  className="input input-bordered m-0 p-1 h-fit w-fit max-w-xs"
                  value={formValues.birth_date}
                  onChange={handleChange}
                />
              </div>
            </label>
            <span>{errors.gender}</span>
          </div>
          <div className="divider lg:divider-horizontal"></div>

          <div className="flex-grow lg:w-1/2">
            {/* Contact Number */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text mb-0">Contact Number: </span>

                <input
                  type="number"
                  name="phone_number"
                  className="input input-bordered m-0 p-1 h-fit w-fit max-w-xs"
                  value={formValues.phone_number}
                  onChange={handleChange}
                />
              </div>
            </label>
            <span>{errors.phone_number}</span>

            {/* Email */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text mb-0">Email: </span>

                <input
                  type="email"
                  name="email"
                  className="input input-bordered m-0 p-1 h-fit w-fit max-w-xs"
                  value={formValues.email}
                  onChange={handleChange}
                />
              </div>
            </label>
            <span>{errors.email}</span>

            {/* Password */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text mb-0">Password: </span>

                <input
                  type="password"
                  name="password"
                  className="input input-bordered m-0 p-1 h-fit w-fit max-w-xs"
                  value={formValues.password}
                  onChange={handleChange}
                />
              </div>
            </label>
            <span>{errors.password}</span>

            {/* New Password */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text mb-0">New Password: </span>

                <input
                  type="password"
                  name="new_password"
                  className="input input-bordered m-0 p-1 h-fit w-fit max-w-xs"
                  value={formValues.new_password}
                  onChange={handleChange}
                />
              </div>
            </label>
            <span>{errors.new_password}</span>

            {/* Confirm New Password */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text mb-0">Confirm Password: </span>

                <input
                  type="password"
                  name="confirm_password"
                  className="input input-bordered m-0 p-1 h-fit w-fit max-w-xs"
                  value={formValues.confirm_new_password}
                  onChange={handleChange}
                />
              </div>
            </label>
            <span>{errors.confirm_new_password}</span>
          </div>
        </div>

        <div className="flex justify-center mt-1 mb-0 p-1">
          <button
            onSubmit={handleSubmit}
            className="btn btn-primary text-sm py-0"
          >
            Update Profile
          </button>
        </div>
      </form>
    </>
  );
};

export default UserProfileForm;
