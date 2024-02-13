import { Routes, Route } from "react-router-dom";
import UserDashboardLayout from "../UserDashboardLayout";
import UserDashboard from "../../pages/user/Dashboard/UserDashboard";
import Bookings from "../../pages/user/Bookings";
import FlightsSearchComponent from "../../pages/user/FlightsSearch";
// eslint-disable-next-line react/prop-types

const UserDashboardRoutes = ({ addAlert }) => {
  return (
    <>
      <UserDashboardLayout>
        <Routes>
          <Route path="my_dashboard" element={<UserDashboard />} />
          <Route path="bookings" element={<Bookings addAlert={addAlert} />} />
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
