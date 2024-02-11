import { useState, useEffect } from "react";
import travelClips from "../../assets/travelClips.mp4";
import UserProfileForm from "./UserProfileForm";
import UserDashboardLayout from "../../layouts/UserDashboardLayout";
import { showCurrentUserApi } from "../../lib/usersapi";

const Dashboard = () => {
  const [error, setError] = useState(null);
  const [current_user, setCurrentUser] = useState({
    first_name: "",
    travel_fund: "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await showCurrentUserApi({ first_name, travel_fund });
        console.log(response);
        setCurrentUser(response);
        console.log("current_user:", current_user);
        setError(null);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("Error fetching user details. Please try again.");
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <>
      <UserDashboardLayout>
        <div className="w-full bg-warning shadow-lg text-center">
          <div className="card-body px-3 py-2 font-inherit font-bold">
            <p className="card-title">Welcome, {current_user.first_name}!</p>
            <h2 className="card-title">My Dashboard</h2>
            <div className="card-actions justify-center">
              <p className="badge bg-warning-content text-white p-3">
                TravelFund:
              </p>
              <br />
              <p className="badge badge-flat p-3">
                ₱ {current_user.travel_fund}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row rounded h-96 m-1 p-1">
          {/* Left Side */}
          <div className="flex-grow lg:w-2/3">
            <div className="grid h-fit w-full bg-warning-content rounded p-2 self-center">
              <UserProfileForm current_user={current_user} />
            </div>
          </div>

          <div className="divider lg:divider-horizontal"></div>
          {/* Right Side */}
          <div className="flex-grow lg:w-1/3">
            <div className="grid h-[24rem] w-full card p-2 justify-center items-center">
              <video
                src={travelClips}
                autoPlay
                loop
                muted
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "unset",
                }}
              />
            </div>
          </div>
        </div>
      </UserDashboardLayout>
    </>
  );
};

export default Dashboard;
