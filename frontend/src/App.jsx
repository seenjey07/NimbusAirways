import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import AdminDashboardRoutes from "./layouts/router/AdminDashboardRoutes";
import UserDashboard from "./pages/Dashboard/UserDashboard";
import BookingsComponent from "./pages/Bookings";
import FlightsSearchComponent from "./pages/FlightsSearch";
import FlightBookingsRouter from "./layouts/router/FlightBookingsRouter";
import { Toaster } from "sonner";
import { toast } from "sonner";
import SeatSelection from "./pages/Dashboard/SeatSelection";
import AboutUs from "./pages/home/AboutUs";
import ContactUs from "./pages/home/ContactUs";

function App() {
  // eslint-disable-next-line no-unused-vars

  const addAlert = (type, message) => {
    toast(message, {
      type,
    });
  };

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route
            path="/admin/*"
            element={<AdminDashboardRoutes addAlert={addAlert} />}
          />
          <Route path="login" element={<Login addAlert={addAlert} />} />
          <Route path="signup" element={<Registration />} />
          <Route path="/" element={<Home />} />
          <Route path="/about_us" element={<AboutUs />} />
          <Route path="/contact_us" element={<ContactUs />} />
          <Route path="/my_dashboard" element={<UserDashboard />} />
          <Route path="/bookings" element={<BookingsComponent />} />
          <Route path="flight_search" element={<FlightsSearchComponent />} />
          <Route path="seats" element={<SeatSelection />} />
          <Route
            path="/bookings/create_booking/*"
            element={<FlightBookingsRouter addAlert={addAlert} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
