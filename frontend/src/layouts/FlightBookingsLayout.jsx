// eslint-disable-next-line react/prop-types
import { useEffect } from "react";
import axios from "axios";
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
    <div className="grid grid-rows-[auto_1fr_auto] w-full h-screen bg-white">
      <main className="flex-grow h-auto">{children}</main>
    </div>
  );
};

export default FlightBookingsLayout;
