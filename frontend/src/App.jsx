import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/dashboardlayout";
import Registration from "./pages/Registration";
import AdminDashboardRoutes from "./layouts/router/AdminDashboardRoutes";
import FlightsSearchComponent from "./pages/FlightsSearch";
import SearchResultsComponent from "./pages/SearchResults";
import BookingsComponent from "./pages/Bookings";
import { useState } from "react";
import TestAlerts from "./pages/test/TestAlerts";
import Alert from "./components/Alert";

function App() {
  const [alerts, setAlerts] = useState([]);

  const addAlert = (type, message) => {
    setAlerts((prev) => [...prev, { type, message }]);
    setTimeout(() => {
      removeAlert(0);
    }, 5000);
  };

  const removeAlert = (index) => {
    setAlerts((prev) => prev.filter((a, i) => i !== index));
  };

  return (
    <>
     <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {alerts.map((alert, index) => (
              <Alert
                key={index}
                type={alert.type}
                message={alert.message}
                onClose={() => removeAlert(index)}
              />
            ))}
          </div>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/*" element={<AdminDashboardRoutes />} />
          <Route path="/dashboard/*" element={<DashboardLayout />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Registration />} />
          <Route path="/" element={<Home />} />
          <Route path="flight_search" element={<FlightsSearchComponent />} />
          <Route path="search_results" element={<SearchResultsComponent />} />
          <Route path="testalert" element={<TestAlerts addAlert={addAlert} />} />
          <Route path="/bookings" element={<BookingsComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
