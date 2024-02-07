import "../App.css";
import { useNavigate, useLocation, Link } from "react-router-dom";
import logoImage from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/login");
  };

  const isDashboardPage = location.pathname === "/my_dashboard";
  const isFlightsPage = location.pathname === "/flight_search";
  const isBookingsPage = location.pathname === "/bookings";
  const isCreateBookingPage = location.pathname === "/bookings/create_booking";

  return (
    <div className="navbar m-0 bg-base-100 underline shadow">
      <div className="navbar-start">
        <figure>
          <img
            src={logoImage}
            alt="Logo"
            onClick={() => navigate("/my_dashboard")}
            className="cursor-pointer"
            style={{ width: "90px", height: "auto" }}
          />
        </figure>
      </div>
      <div className="navbar-center">
        <ul className="menu menu-horizontal text-sm px-1 my-1 rounded-box bg-base-100">
          {isDashboardPage && (
            <>
              <li>
                <Link to="/my_dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/flight_search">Flights</Link>
              </li>
              <li>
                <Link to="/bookings">Bookings</Link>
              </li>
            </>
          )}
          {isFlightsPage && (
            <>
              <li>
                <Link to="/flight_search">Flights</Link>
              </li>
              <li>
                <Link to="/bookings">Bookings</Link>
              </li>
              <li>
                <Link to="/my_dashboard">Dashboard</Link>
              </li>
            </>
          )}
          {(isBookingsPage || isCreateBookingPage) && (
            <>
              <li>
                <Link to="/bookings">Bookings</Link>
              </li>
              <li>
                <Link to="/my_dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/flight_search">Flights</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="navbar-end">
        <button
          type="button"
          value="Logout"
          name="Logout"
          onClick={handleLogout}
          className="btn btn-ghost text-sm rounded-box bg-base-100"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
