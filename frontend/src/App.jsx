import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/dashboardlayout";
import Registration from "./pages/Registration";
import AdminDashboardRoutes from "./layouts/router/AdminDashboardRoutes";
import BookingsComponent from "./pages/Bookings";
import FlightsSearchComponent from "./pages/FlightsSearch";
import SearchResultsComponent from "./pages/SearchResults";
import TestAlerts from "./pages/test/TestAlerts";
import FlightBookingsRouter from "./layouts/router/FlightBookingsRouter";
import { Toaster } from "sonner";
import { toast } from "sonner";
import SeatSelection from "./pages/Dashboard/SeatSelection";

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
          <Route path="/admin/*" element={<AdminDashboardRoutes />} />
          <Route path="/dashboard/*" element={<DashboardLayout />} />
          <Route path="login" element={<Login addAlert={addAlert} />} />
          <Route path="signup" element={<Registration />} />
          <Route path="/" element={<Home />} />
          <Route path="/bookings" element={<BookingsComponent />} />
          <Route path="flight_search" element={<FlightsSearchComponent />} />
          <Route path="search_results" element={<SearchResultsComponent />} />
          <Route
            path="testalert"
            element={<TestAlerts addAlert={addAlert} />}
          />
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
