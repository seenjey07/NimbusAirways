import { useState, useEffect } from "react";
import travelClips from "../../../assets/TravelClips.mp4";
import UserProfileForm from "./UserProfileForm";
import { showCurrentUserApi } from "../../../lib/usersapi";
import { id } from "date-fns/locale";

// eslint-disable-next-line react/prop-types
const UserDashboard = ({ addAlert }) => {
  const [current_user, setCurrentUser] = useState({
    first_name: "",
    travel_fund: 0,
  });

  const [isConfirmUpdateModalOpen, setIsConfirmUpdateModalOpen] =
    useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await showCurrentUserApi({ id: id });
        const user = response;

        setCurrentUser({
          first_name: user.first_name,
          travel_fund: user.travel_fund,
        });
      } catch (error) {
        addAlert("error", "Error retrieving user details. Please try again.");
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <>
      <div className="bg-secondary shadow-lg text-center">
        <div className="card-body px-3 py-2 font-inherit font-bold">
          <p className="card-title font-bold">
            Welcome, {current_user.first_name}!
          </p>
          <div className="card-actions justify-center">
            <p className="badge bg-secondary-content text-white p-4">
              TravelFund:
            </p>
            <br />
            <p className="badge bg-secondary-content text-white badge-flat p-4">
              ₱ {current_user.travel_fund}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-auto rounded m-2 p-1 pl-3">
        {/* Left Side */}
        <div className="flex-grow lg:w-2/3 m-4">
          <div className="grid w-full rounded py-1 px-3 justify-center items-center">
            <UserProfileForm
              current_user={current_user}
              addAlert={addAlert}
              isConfirmUpdateModalOpen={isConfirmUpdateModalOpen}
              setIsConfirmUpdateModalOpen={setIsConfirmUpdateModalOpen}
            />
          </div>
        </div>

        <div className="divider m-2 lg:divider-horizontal"></div>
        {/* Right Side */}
        <div className="m-2 pt-3 pl-3 lg:w-1/3">
          <div className="grid w-full card p-2 justify-center items-center">
            <video
              src={travelClips}
              autoPlay
              loop
              muted
              style={{
                width: "92%",
                height: "92%",
                objectFit: "unset",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
