import { useState, useEffect} from "react"
import { adminIndexUsersApi } from "../../../lib/admin/adminusersapi";

const AdminUsers = () => {
    const [userData, setUserData]   = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const res = await adminIndexUsersApi();
            setUserData(res)
            console.log(userData)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchUserData();
      }, []); 
    
    
    return (
        <>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Date of Birth</th>
                        <th>Gender</th>
                        <th>Email</th>
                        <th>Contact Number</th>
                        <th>Role</th>
                    </tr>
                    </thead>
                    <tbody>
                    {userData.map((user, index) => (
                        <tr key={index} className="hover">
                        <td>{user.id}</td>
                        <td>{`${user.first_name} ${user.middle_name} ${user.last_name}`}</td>
                        <td>{user.birth_date}</td>
                        <td>{user.gender}</td>
                        <td>{user.email}</td>
                        <td>{user.phone_number}</td>
                        <td>{user.role}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AdminUsers