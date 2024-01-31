import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/dashboardlayout";
import Registration from "./pages/Registration";
import AdminDashboardRoutes from "./layouts/router/AdminDashboardRoutes";
import FlightsSearchComponent from "./pages/FlightsSearch";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/admin/*" element={<AdminDashboardRoutes />} />
          <Route path="/dashboard/*" element={<DashboardLayout />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Registration />} />
          <Route path="/" element={<Home />} />
          <Route path="flight_search" element={<FlightsSearchComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;