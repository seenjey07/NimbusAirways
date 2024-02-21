import { adminCompanyStats } from "../../lib/admin/adminusersapi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Tabs, TabsContent } from "../../components/ui/tabs";
import Overview from "./dashboard/subcomponents/Overview";
import RecentUsers from "./dashboard/subcomponents/RecentSales";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import { BookingIcon, FlightIcon, UsersIcon } from "../../components/icons/icons";
const AdminDashboard = () => {
  const [stats, setStats] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCompanyStats = async () => {
      try {
        const res = await adminCompanyStats();
        setStats(res);
      } catch (error) {
        console.error("Error retrieving initial flight information:", error);
      } finally {
        setLoading(false);
      }
    };

    getCompanyStats();
  }, []);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 bg-white">
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M8 19V5h3.5a4.5 4.5 0 1 1 0 9H8m10-6H6m12 3H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₱ {parseInt(stats?.revenue).toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">
                  0% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Flights for this Year
                </CardTitle>

                <FlightIcon />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.flights_count}</div>
                <p className="text-xs text-muted-foreground">
                  Total Routes: {stats?.routes_count}
                </p>
                <p className="text-xs text-muted-foreground">
                  Total Aircrafts :{stats?.aircrafts_count}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Bookings
                </CardTitle>
                <BookingIcon />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats?.bookings_count}
                </div>
                <p className="text-xs text-muted-foreground"></p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Number of Registered Users
                </CardTitle>
                <UsersIcon />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.users_count}</div>
                <p className="text-xs text-muted-foreground"></p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-4 md:col-span-3">
              <CardHeader>
                <CardTitle>Recent Registered Users</CardTitle>
                <CardDescription>Most recent registered users</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentUsers users={stats.first_10_users} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
