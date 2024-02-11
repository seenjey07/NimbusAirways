import { Routes, Route } from "react-router-dom";
import UserDashboardLayout from "../UserDashboardLayout";
import UserDashboard from "../../pages/Dashboard/UserDashboard";
import Bookings from "../../pages/Bookings";
import FlightsSearchComponent from "../../pages/FlightsSearch";

const UserDashboardRoutes = () => {
  return (
    <>
      <UserDashboardLayout>
        <Routes>
          <Route path="my_dashboard" element={<UserDashboard />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="flight_search" element={<FlightsSearchComponent />} />
        </Routes>
      </UserDashboardLayout>
    </>
  );
};

export default UserDashboardRoutes;
