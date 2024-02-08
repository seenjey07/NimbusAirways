import NavBar from "../components/UserNavBar"
import Footer from ".././pages/home/footer"

// eslint-disable-next-line react/prop-types
const UserDashboardLayout = ({ children }) => {
  return (
    <>
      <div className="grid grid-rows-[auto_1fr_auto] h-screen">
        <NavBar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default UserDashboardLayout;
