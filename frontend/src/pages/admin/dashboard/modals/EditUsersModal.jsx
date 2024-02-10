import { adminUpdateUserApi, adminShowUserApi } from "../../../../lib/admin/adminusersapi"
import { useState, useEffect } from "react";
// eslint-disable-next-line react/prop-types
const EditUsersModal = ({addAlert, selectedUserId, isEditModalOpen, setIsEditModalOpen} ) => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await adminShowUserApi(selectedUserId);
        setFirstName(response.first_name || '');
        setMiddleName(response.middle_name || '');
        setLastName(response.last_name || '');
        setBirthDate(response.birth_date || '');
        setPhoneNumber(response.phone_number || '');
        setEmail(response.email || '');
        setGender(response.gender || '');
        setRole(response.role || '');

        console.log("User Data:", response);
        console.log("ID Check", selectedUserId);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (isEditModalOpen) {
      fetchUserData();
    }
  }, [isEditModalOpen, selectedUserId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      birth_date: birthDate,
      phone_number: phoneNumber,
      email: email,
      gender: gender,
      password: password,
      confirmPassword: confirmPassword,
      role: role,
    };

      try {
        const response = await adminUpdateUserApi(selectedUserId, userData);
        addAlert('success', 'User updated successfully!');
        console.log('User updated successfully:', response);
        document.getElementById('EditUsers').close();
        setIsEditModalOpen(false);
    } catch (error) {
      addAlert('error', error.response?.data?.errors || 'Error updating user');
      console.error('Error updating user:', error);
    }
  };

    return (
    <>     
        <form className="card-body" onSubmit={handleSubmit}>
        <h2 className="card-title justify-center text-secondary text-3xl font-bold">UPDATE USERS</h2>
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
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
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
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
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
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-secondary">Contact Number</span>
            </div>
            <input
              type="string"
              placeholder="0912345678"
              className="input input-bordered w-full max-w-xs"
              name="phone_number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-secondary">Gender</span>
            </div>
            <select
              className="select select-bordered"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option disabled>Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
        </div>

        <div className="flex justify-center">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-secondary">Role</span>
            </div>
            <select
              className="select select-bordered"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option disabled>Select</option>
              <option value="Traveler">Traveler</option>
              <option value="Admin">Admin</option>
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

export default EditUsersModal