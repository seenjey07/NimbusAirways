import AdminDashboardLayout from "../AdminDashboardLayout";
import AdminDashboard from "../../pages/admin/AdminDashboard";
import AdminBookings from "../../pages/admin/dashboard/AdminBookings";
import { Routes, Route } from "react-router-dom";
import AdminMeals from "../../pages/admin/dashboard/AdminMeals";
import AdminUsers from "../../pages/admin/dashboard/AdminUsers";
import AdminFlightsAndRoutesLayout from "../AdminFlightsAndRoutesLayout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminCheckAuthorization } from "../../lib/admin/adminusersapi";
import AdminAircrafts from "../../pages/admin/dashboard/AdminAircrafts";
// eslint-disable-next-line react/prop-types
const AdminDashboardRoutes = ({addAlert}) => {    
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthorization = async () => {
          try {
            const response = await adminCheckAuthorization();
            console.log('Authorization check successful', response);
          } catch (error) {
            if (error.response && error.response.status === 401) {
              addAlert('error', 'You are not authorized to access this page. Redirecting to login');
              navigate('/login');
            } else {
              addAlert('error', 'You are not authorized to access this page. Redirecting to login');
              navigate('/login');
              console.error('Error checking authorization:', error.response);
            }
          }
        };
    
        checkAuthorization();
      }, [navigate, addAlert]);
    return (

        <>
            <AdminDashboardLayout addAlert={addAlert}>
                <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="bookings" element={<AdminBookings />} />
                    <Route path="flights" element={<AdminFlightsAndRoutesLayout />} />
                    <Route path="meals" element={<AdminMeals />} />
                    <Route path="aircrafts" element={<AdminAircrafts />} />
                    <Route path="users" element={<AdminUsers addAlert={addAlert} />} />
                </Routes>
            </AdminDashboardLayout>
        </>

    )
}

export default AdminDashboardRoutes;