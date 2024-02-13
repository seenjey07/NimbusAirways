import { useState, useEffect } from "react";
import travelClips from "../../../assets/TravelClips.mp4";
import UserProfileForm from "./UserProfileForm";
import { showCurrentUserApi } from "../../../lib/usersapi";
import { id } from "date-fns/locale";

const Dashboard = () => {
  const [current_user, setCurrentUser] = useState({
    first_name: "",
    travel_fund: 0,
  });

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
        console.error("Error fetching user details:", error);
        addAlert("error", "Error retrieving user details. Please try again.");
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <>
      <div className="w-full bg-warning shadow-lg text-center">
        <div className="card-body px-3 py-2 font-inherit font-bold">
          <p className="card-title">Welcome, {current_user.first_name}!</p>
          <h2 className="card-title">My Dashboard</h2>
          <div className="card-actions justify-center">
            <p className="badge bg-warning-content text-white p-3">
              TravelFund:
            </p>
            <br />
            <p className="badge badge-flat p-3">₱ {current_user.travel_fund}</p>
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
    </>
  );
};

export default Dashboard;
