import AdminDashboardLayout from "../AdminDashboardLayout";
import AdminDashboard from "../../pages/admin/AdminDashboard";
import AdminBookings from "../../pages/admin/dashboard/AdminBookings";
import { Routes, Route } from "react-router-dom";
import AdminMeals from "../../pages/admin/dashboard/AdminMeals";
import AdminSeats from "../../pages/admin/dashboard/AdminsSeats";
import AdminUsers from "../../pages/admin/dashboard/AdminUsers";
import AdminFlightsAndRoutesLayout from "../AdminFlightsAndRoutesLayout";
// eslint-disable-next-line react/prop-types
const AdminDashboardRoutes = ({addAlert}) => {    
    return (

        <>
            <AdminDashboardLayout>
                <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="bookings" element={<AdminBookings />} />
                    <Route path="flights" element={<AdminFlightsAndRoutesLayout />} />
                    <Route path="meals" element={<AdminMeals />} />
                    <Route path="seats" element={<AdminSeats/>} />
                    <Route path="users" element={<AdminUsers addAlert={addAlert} />} />
                </Routes>
            </AdminDashboardLayout>
        </>

    )
}

export default AdminDashboardRoutes;