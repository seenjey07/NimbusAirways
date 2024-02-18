import UserNavBar from "../components/UserNavBar";
import { useEffect } from "react";
import axios from "axios";
import Footer from "../pages/home/footer";

// eslint-disable-next-line react/prop-types
const UserDashboardLayout = ({ addAlert, children }) => {
  useEffect(() => {
    const initiateAuthorization = () => {
      const token = document.cookie.split("token=")[1];
      if (token) {
        axios.defaults.headers.common["Authorization"] = token;
        console.log("User Dashboard Layout: token found");
      }
    };
    initiateAuthorization();
  }, [addAlert]);

  return (

    <div className="grid grid-rows-[auto_1fr_auto] w-full h-screen bg-white">
      <UserNavBar />
      <main className="flex-grow h-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default UserDashboardLayout;
