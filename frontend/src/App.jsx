import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./Login";
import Registration from "./Registration";
import AdminDashboardRoutes from "./layouts/router/AdminDashboardRoutes";
import { Toaster } from "sonner";
import { toast } from "sonner";
import AboutUs from "./pages/home/AboutUs";
import ContactUs from "./pages/home/ContactUs";
import UserDashboardRoutes from "./layouts/router/UserDashboardRoutes";
import FlightsSearchComponent from "./pages/user/FlightsSearch";
import GenerateFlightsModal from "./pages/admin/dashboard/modals/GenerateFlightsModal";
import ResetPasswordForm from "./pages/home/ResetPassword";
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
          <Route
            path="/user/*"
            element={<UserDashboardRoutes addAlert={addAlert} />}
          />
          <Route path="login" element={<Login addAlert={addAlert} />} />
          <Route path="signup" element={<Registration addAlert={addAlert} />} />
          <Route path="/" element={<Home addAlert={addAlert} />} />
          <Route path="/about_us" element={<AboutUs />} />
          <Route path="/contact_us" element={<ContactUs />} />
          <Route
            path="flight_search"
            element={<FlightsSearchComponent addAlert={addAlert} />}
          />
          <Route path="test" element={<GenerateFlightsModal />} />
          <Route
            path="password/edit/*"
            element={<ResetPasswordForm />}
            addAlert={addAlert}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
