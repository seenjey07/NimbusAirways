import UserNavBar from "../assets/UserNavbar";
import UserBreadcrumbs from "../components/UserBreadcrumbs";

const DashboardLayout = () => {
    return(
        <>
            <UserNavBar />
            <div className="flex justify-center">
                <UserBreadcrumbs />
            </div>
        </>
    )
}

export default DashboardLayout