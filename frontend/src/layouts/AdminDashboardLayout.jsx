import AdminNavBar from "../components/AdminNavBar"
import AdminFooter from "../components/AdminFooter";
// eslint-disable-next-line react/prop-types
const AdminDashboardLayout = ({children}) => {


    return(
        <>
        <div className="grid grid-rows-[auto_1fr_auto] h-screen bg-white">
            <AdminNavBar />
                <main className="bg-white">{children}</main>
            <AdminFooter />
            </div>
        </>
    )
}

export default AdminDashboardLayout