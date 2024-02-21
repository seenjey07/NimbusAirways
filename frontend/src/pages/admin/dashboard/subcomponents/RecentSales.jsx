/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar";
import Loading from "../../../../components/Loading";

const RecentUsers = ({users}) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }, []);
    
      return (
        <div className="space-y-8">
          {loading ? (
            <Loading />
          ) : (
            users && users.length > 0 ? (
              users.slice(0, 5).map((user) => (
                <div key={user.id} className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.id} alt={user.id} />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="font-bold leading-none">{user.first_name} {user.last_name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <div className="ml-auto font-medium">{user.role}</div>
                </div>
              ))
            ) : (
              <p>No users available.</p>
            )
          )}
        </div>
      );
    };
export default RecentUsers