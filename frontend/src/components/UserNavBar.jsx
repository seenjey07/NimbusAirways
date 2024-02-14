import "../App.css";
import { useNavigate, useLocation, Link } from "react-router-dom";
import logoImage from "../assets/logo.png";
import { AdminIcon} from "./icons/icons"
import { useState, useEffect } from "react";
import { adminCheckAuthorization } from "../lib/admin/adminusersapi"

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const response = await adminCheckAuthorization();
        if (response.message === "Authorized") {
          setIsAuthorized(true);
          console.log("Authorization check successful", response);
        }
      } catch (error) {
        setIsAuthorized(false);
        console.error("Authorization check failed", error);
      }
    };
    checkAuthorization();
  }, [navigate]); 

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
  };

  const isDashboardPage = location.pathname === "/user/my_dashboard";
  const isFlightsPage = location.pathname === "/user/flight_search";
  const isBookingsPage = location.pathname === "/user/bookings";
  const isCreateBookingPage =
    location.pathname === "/user/bookings/create_booking";

  // const hasCurrentUser = true;

  return (
    <div className="navbar m-0 bg-base-100 underline shadow">
      <div className="navbar-start">
        <div className="flex flex-col ">
          <div>
            {isAuthorized && (
              <Link to="/admin">
                <sub className="flex text-xs hover:underline">
                  <AdminIcon className="mr-2" />
                  Admin Dashboard
                </sub>
              </Link>
            )}
          </div>
          <figure>
            <img
              src={logoImage}
              alt="Logo"
              className="cursor-pointer"
              style={{ width: "90px", height: "auto" }}
            />
          </figure>
        </div>
      </div>
      <div className="navbar-center">
        <ul className="menu menu-horizontal text-sm px-1 my-1 rounded-box bg-base-100">
          {isDashboardPage && (
            <>
              <li>
                <Link to="my_dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="flight_search">Flights</Link>
              </li>
              <li>
                <Link to="bookings">Bookings</Link>
              </li>
            </>
          )}
          {isFlightsPage && (
            <>
              <li>
                <Link to="flight_search">Flights</Link>
              </li>
              <li>
                <Link to="bookings">Bookings</Link>
              </li>
              <li>
                <Link to="my_dashboard">Dashboard</Link>
              </li>
            </>
          )}
          {(isBookingsPage || isCreateBookingPage) && (
            <>
              <li>
                <Link to="bookings">Bookings</Link>
              </li>
              <li>
                <Link to="my_dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="flight_search">Flights</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="navbar-end">
        {/* {hasCurrentUser ? ( */}
        <button
          type="button"
          value="Logout"
          name="Logout"
          onClick={handleLogout}
          className="btn btn-ghost text-sm rounded-box bg-base-100"
        >
          Logout
        </button>
        {/* // ) : (
        //   <Link
        //     to="/"
        //     className="btn btn-ghost text-sm rounded-box bg-base-100"
        //   >
        //     Home
        //   </Link>
        )} */}
      </div>
    </div>
  );
};

export default Navbar;
