import NavBar from "../components/UserNavBar";

const UserDashboardLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
};

export default UserDashboardLayout;
