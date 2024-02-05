import "../../App.css";
import { useNavigate, useLocation } from "react-router-dom";
import logoImage from "../../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/login");
  };

  const isDashboardPage = location.pathname === "/my_dashboard";
  const isFlightsPage = location.pathname === "/flight_search";
  const isBookingsPage = location.pathname === "/bookings";

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
                <a onClick={() => navigate("/my_dashboard")}>Dashboard</a>
              </li>
              <li>
                <a onClick={() => navigate("/flight_search")}>Flights</a>
              </li>
              <li>
                <a onClick={() => navigate("/bookings")}>Bookings</a>
              </li>
            </>
          )}
          {isFlightsPage && (
            <>
              <li>
                <a onClick={() => navigate("/flight_search")}>Flights</a>
              </li>
              <li>
                <a onClick={() => navigate("/bookings")}>Bookings</a>
              </li>
              <li>
                <a onClick={() => navigate("/my_dashboard")}>Dashboard</a>
              </li>
            </>
          )}
          {isBookingsPage && (
            <>
              <li>
                <a onClick={() => navigate("/bookings")}>Bookings</a>
              </li>
              <li>
                <a onClick={() => navigate("/my_dashboard")}>Dashboard</a>
              </li>
              <li>
                <a onClick={() => navigate("/flight_search")}>Flights</a>
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
