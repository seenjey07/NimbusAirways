import UserNavBar from "../components/UserNavBar";
import Footer from ".././pages/home/footer";
import { useEffect } from "react";
import axios from "axios";

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
    <>
      <div className="grid grid-rows-[auto_1fr_auto] h-screen">
        <UserNavBar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default UserDashboardLayout;
