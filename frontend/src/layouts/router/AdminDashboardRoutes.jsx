import AdminDashboardLayout from "../AdminDashboardLayout";
import AdminDashboard from "../../pages/admin/AdminDashboard";
import AdminBookings from "../../pages/admin/dashboard/AdminBookings";
import { Routes, Route } from "react-router-dom";
import AdminFlightsAndRoutes from "../../pages/admin/dashboard/AdminFlightsAndRoutes";
import AdminMeals from "../../pages/admin/dashboard/AdminMeals";
import AdminSeats from "../../pages/admin/dashboard/AdminsSeats";
import AdminUsers from "../../pages/admin/dashboard/AdminUsers";
const AdminDashboardRoutes = () => {    
    return (

        <>
            <AdminDashboardLayout>
                <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="bookings" element={<AdminBookings />} />
                    <Route path="flights" element={<AdminFlightsAndRoutes />} />
                    <Route path="meals" element={<AdminMeals />} />
                    <Route path="seats" element={<AdminSeats/>} />
                    <Route path="users" element={<AdminUsers />} />
                </Routes>
            </AdminDashboardLayout>
        </>

    )
}

export default AdminDashboardRoutes;