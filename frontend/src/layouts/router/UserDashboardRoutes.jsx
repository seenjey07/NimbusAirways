import { Routes, Route } from "react-router-dom";
import UserDashboardLayout from "../UserDashboardLayout";
import UserDashboard from "../../pages/user/Dashboard/UserDashboard";
import FlightsSearchComponent from "../../pages/user/FlightsSearch";
import SeatSelection from "../../pages/user/Dashboard/SeatSelection";
import FlightBookingsRouter from "../router/FlightBookingsRoutes";
import { useEffect } from "react";
import axios from "axios";
import { checkAuthorizationApi } from "../../lib/authenticationapi";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const UserDashboardRoutes = ({ addAlert }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const initiateAuthorization = () => {
      const token = document.cookie.split("token=")[1];
      if (token) {
        axios.defaults.headers.common["Authorization"] = token;
      }
    };
    initiateAuthorization();
  }, []);

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const response = await checkAuthorizationApi();
        if (response.message === "Authorized") {
          // console.log("Authorization check successful", response);
        } else {
          handleUnauthorizedAccess();
        }
      } catch (error) {
        handleUnauthorizedAccess(error);
      }
    };

    const handleUnauthorizedAccess = (error) => {
      const errorMessage =
        error?.response?.data?.message ||
        "You are not authorized to access this page.";
      addAlert("error", `${errorMessage}. Redirecting to login.`);
      navigate("/login");

      if (errorMessage === "Unauthorized") {
        addAlert("error", `${errorMessage}. Redirecting to login.`);
        navigate("/login");
      } else {
        addAlert("error", errorMessage);
      }

      console.error("Error checking authorization:", error?.response);
    };

    checkAuthorization();
  }, [navigate, addAlert]);

  return (
    <>
      <UserDashboardLayout>
        <Routes>
          <Route
            path="my_dashboard"
            element={<UserDashboard addAlert={addAlert} />}
          />
          <Route
            path="bookings/*"
            element={<FlightBookingsRouter addAlert={addAlert} />}
          />
          <Route path="seats" element={<SeatSelection />} />
          <Route
            path="flight_search"
            element={<FlightsSearchComponent addAlert={addAlert} />}
          />
        </Routes>
      </UserDashboardLayout>
    </>
  );
};

export default UserDashboardRoutes;
