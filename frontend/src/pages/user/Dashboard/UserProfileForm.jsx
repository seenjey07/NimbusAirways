import React, { useState, useEffect } from "react";
import "../../../App.css";
import {
  showCurrentUserApi,
  updateCurrentUserApi,
} from "../../../lib/usersapi";
import ConfirmProfileUpdateModal from "../../../pages/admin/dashboard/modals/ConfirmProfileUpdateModal";
import { id } from "date-fns/locale";
// eslint-disable-next-line react/prop-types

const UserProfileForm = ({
  addAlert,
  // isConfirmUpdateModalOpen,
  // setIsConfirmUpdateModalOpen,
}) => {
  const [formValues, setFormValues] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    birth_date: "",
    gender: "",
    phone_number: "",
    email: "",
    password: "",
    new_password: "",
    confirm_new_password: "",
  });

  const [isConfirmUpdateModalOpen, setIsConfirmUpdateModalOpen] =
    useState(false);
  const [typedPassword, setTypedPassword] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await showCurrentUserApi({ id: id });
        const user = response;

        setFormValues({
          first_name: user.first_name,
          middle_name: user.middle_name,
          last_name: user.last_name,
          birth_date: user.birth_date,
          gender: user.gender,
          phone_number: user.phone_number,
          email: user.email,
          password: "",
          new_password: "",
          confirm_new_password: "",
        });
      } catch (error) {
        addAlert("Error", "Error retrieving user details");
      }
    };

    fetchUserDetails();
  }, []);

  const validatePassword = () => {
    const { new_password, confirm_new_password } = formValues;
    if (new_password !== confirm_new_password) {
      addAlert((prevErrors) => ({
        ...prevErrors,
        new_password: "Passwords do not match",
        confirm_new_password: "Passwords do not match",
      }));
      return false;
    }
    return true;
  };

  const validateEmail = async () => {
    const { email } = formValues;
    try {
      await updateCurrentUserApi(id, { email });
      return true;
    } catch (error) {
      addAlert("error", "Invalid email address. Please try again.");
      return false;
    }
  };

  const validateForm = async () => {
    const isPasswordValid = validatePassword();
    const isEmailValid = await validateEmail();

    return isPasswordValid && isEmailValid;
  };

  const handleUpdateClick = (e) => {
    e.preventDefault();
    setIsConfirmUpdateModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const confirmUpdate = async () => {
    const userData = {
      first_name: formValues.first_name,
      middle_name: formValues.middle_name,
      last_name: formValues.last_name,
      birth_date: formValues.birth_date,
      gender: formValues.gender,
      phone_number: formValues.phone_number,
      email: formValues.email,
      password: formValues.password,
      new_password: formValues.new_password,
      confirm_new_password: formValues.confirm_new_password,
    };

    if (await validateForm()) {
      try {
        const response = await updateCurrentUserApi(id, userData);
        console.log("Response:", userData);
        setFormValues((prevValues) => ({
          ...prevValues,
          ...response,
        }));
        addAlert("success", "User details updated successfully");
        // document.getElementById("ConfirmProfileUpdateModal").close();
        // setIsConfirmUpdateModalOpen(false);
      } catch (error) {
        console.error("Error updating user details:", error);
        addAlert("error", "Error updating user details");
      }
    } else {
      console.log("Form validation failed");
      addAlert("error", "Form validation failed");
    }
  };

  return (
    <div
      className={`profile my-1 ${isConfirmUpdateModalOpen ? "modal-open" : ""}`}
    >
      <h3 className="card-title text-black font-serif justify-center mb-3">
        Profile
      </h3>
      <form onSubmit={handleUpdateClick}>
        <div className="flex flex-col lg:flex-row w-full bg-white rounded p-2">
          <div className="flex-grow lg:w-1/2">
            {/* Full Name */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-sm mb-0">First Name: </span>

                <input
                  type="text"
                  name="first_name"
                  className="input input-bordered m-0 p-1 text-sm h-fit w-fit bg-blue-100 max-w-xs"
                  value={formValues.first_name}
                  onChange={handleChange}
                />
              </div>
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-sm mb-0">Middle Name: </span>

                <input
                  type="text"
                  name="middle_name"
                  className="input input-bordered m-0 p-1 text-sm h-fit w-fit bg-blue-100 max-w-xs"
                  value={formValues.middle_name}
                  onChange={handleChange}
                />
              </div>
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-sm mb-0">Last Name: </span>

                <input
                  type="text"
                  name="last_name"
                  className="input input-bordered m-0 p-1 text-sm h-fit w-fit bg-blue-100 max-w-xs"
                  value={formValues.last_name}
                  onChange={handleChange}
                />
              </div>
            </label>

            {/* Gender */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-sm mb-0">Gender: </span>
                <select
                  name="gender"
                  className="input input-bordered text-sm m-0 p-1 h-fit w-fit bg-blue-100 max-w-xs"
                  value={formValues.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </label>

            {/* Birthday */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-sm mb-0">Birth Date: </span>

                <input
                  type="date"
                  name="birth_date"
                  className="input input-bordered text-sm m-0 p-1 h-fit w-fit bg-blue-100 max-w-xs"
                  value={formValues.birth_date}
                  onChange={handleChange}
                />
              </div>
            </label>
          </div>
          <div className="divider lg:divider-horizontal"></div>

          <div className="flex-grow lg:w-1/2">
            {/* Contact Number */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-sm mb-0">
                  Contact Number:{" "}
                </span>

                <input
                  type="number"
                  name="phone_number"
                  className="input input-bordered m-0 p-1 text-sm h-fit w-fit bg-blue-100 max-w-xs"
                  value={formValues.phone_number}
                  onChange={handleChange}
                />
              </div>
            </label>

            {/* Email */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-sm mb-0">Email: </span>

                <input
                  type="email"
                  name="email"
                  className="input input-bordered m-0 p-1 text-sm h-fit w-fit bg-blue-100 max-w-xs"
                  value={formValues.email}
                  onChange={handleChange}
                />
              </div>
            </label>

            {/* Password */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-sm mb-0">Password: </span>

                <input
                  type="password"
                  name="password"
                  placeholder="******"
                  className="input input-bordered m-0 p-1 text-sm h-fit w-fit bg-blue-100 max-w-xs"
                  value={formValues.password}
                  onChange={handleChange}
                />
              </div>
            </label>

            {/* New Password */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-sm mb-0">New Password: </span>

                <input
                  type="password"
                  name="new_password"
                  className="input input-bordered m-0 p-1 text-sm h-fit w-fit bg-blue-100 max-w-xs"
                  value={formValues.new_password}
                  onChange={handleChange}
                />
              </div>
            </label>

            {/* Confirm New Password */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-sm mb-0">
                  Confirm Password:
                </span>

                <input
                  type="password"
                  name="confirm_new_password"
                  className="input input-bordered m-0 p-1 text-sm h-fit w-fit bg-blue-100 max-w-xs"
                  value={formValues.confirm_new_password}
                  onChange={handleChange}
                />
              </div>
            </label>
          </div>
        </div>

        <div className="flex justify-center mb-0">
          <button
            type="submit"
            className="btn bg-secondary text-sm mt-2 px-2 font-bold hover:bg-red-400 hover:text-accent"
          >
            Update
          </button>
        </div>
      </form>

      {isConfirmUpdateModalOpen && (
        <>
          <div className="backdrop"></div>
          <ConfirmProfileUpdateModal
            addAlert={addAlert}
            setTypedPassword={setTypedPassword}
            setConfirmUpdateModalOpen={setIsConfirmUpdateModalOpen}
            formValues={formValues.password}
            onConfirmUpdate={confirmUpdate}
          />
        </>
      )}
    </div>
  );
};

export default UserProfileForm;
