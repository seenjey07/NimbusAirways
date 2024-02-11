import { Routes, Route } from "react-router-dom";
import UserDashboardLayout from "../UserDashboardLayout";
import UserDashboard from "../../pages/Dashboard/UserDashboard";
import Bookings from "../../pages/Bookings";
import FlightsSearchComponent from "@/pages/FlightsSearch";
// eslint-disable-next-line react/prop-types
const UserDashboardRoutes = ({addAlert}) => {


  return (
    <>
      <UserDashboardLayout>
        <Routes>
          <Route path="/" element={<UserDashboard />} />
          <Route path="bookings" element={<Bookings addAlert={addAlert} />} />
          <Route path="flight_search" element={<FlightsSearchComponent addAlert={addAlert} />} />
        </Routes>
      </UserDashboardLayout>
    </>
  );
};

export default UserDashboardRoutes;
