import AdminNavBar from "../components/AdminNavBar";
// eslint-disable-next-line react/prop-types
const AdminDashboardLayout = ({children}) => {
    return(
        <>
        <AdminNavBar />
        {children}
        </>
    )
}

export default AdminDashboardLayout