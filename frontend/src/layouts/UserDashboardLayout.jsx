import Navbar from "../components/UserNavBar"
import AdminUserNavbar from "../components/AdminUserNavBar"
import Footer from ".././pages/home/footer"
import { useEffect,useState } from "react";
import { adminCheckAuthorization } from "../lib/admin/adminusersapi";
// eslint-disable-next-line react/prop-types
const UserDashboardLayout = ({ children }) => {

  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const response = await adminCheckAuthorization();
        setIsAuthorized(response.message === 'Authorized');
      } catch (error) {
        console.error('Error checking authorization:', error);
      }
    };

    checkAuthorization();
  }, []);


  return (
    <>
      <div className="grid grid-rows-[auto_1fr_auto] h-screen">
      {isAuthorized ? <AdminUserNavbar /> : <Navbar />}
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default UserDashboardLayout;
