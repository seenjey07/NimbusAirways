// eslint-disable-next-line react/prop-types
import { useEffect } from "react";
import axios from "axios";
import Footer from "../pages/home/footer";
import NavBar from "../components/UserNavBar";
// eslint-disable-next-line react/prop-types
const FlightBookingsLayout = ({ children }) => {
  useEffect(() => {
    const initiateAuthorization = () => {
      const token = document.cookie.split("token=")[1];
      if (token) {
        axios.defaults.headers.common["Authorization"] = token;
      }
    };
    initiateAuthorization();
  }, []);
  return (
    <div>
      <main className="flex-grow h-auto">{children}</main>
    </div>
  );
};

export default FlightBookingsLayout;
