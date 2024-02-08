import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar";
import Loading from "../../../../components/Loading";


// eslint-disable-next-line react/prop-types
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
            users.slice(0, 5).map((user) => (
              <div key={user.id} className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user.id} alt={user.id} />
                  <AvatarFallback>User</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">{user.first_name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <div className="ml-auto font-medium">{user.role}</div>
              </div>
            ))
          )}
        </div>
      );
    };
export default RecentUsers