import { useState, useEffect} from "react"
import { adminIndexUsersApi } from "../../../lib/admin/adminusersapi";
import CreateUsersModal from "./modals/CreateUsersModal";

const AdminUsers = () => {
    const [userData, setUserData]   = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const res = await adminIndexUsersApi();
            const filteredUserData = res.filter(user => user.role !== "superadmin");
            setUserData(filteredUserData)
            console.log(filteredUserData)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchUserData();
      }, []); 
    
      const filteredUsers = userData.filter(user =>
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    return (
        <>
          <dialog id="CreateUsers" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>
              <CreateUsersModal />
            </div>
          </dialog>
          
            <div className="overflow-x-auto">
                <div className="flex-1 ">
                    <div className="flex justify-between">
                      <div className="flex">
                      <button className="btn self-center ml-3 px-6" onClick={()=>document.getElementById('CreateUsers').showModal()}>Create User</button>
                      </div>


                      <span className="self-center text-2xl font-bold">Users Table</span>

                      <div className="flex justify-end mr-3">
                        <label className="form-control w-full max-w-xs">
                          <div className="label">
                            <span className="label-text">Search by Name</span>
                          </div>
                          <input 
                          type="text" 
                          placeholder="Type here" 
                          className="placeholder:text-sm input input-bordered w-full max-w-xs" 
                          onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </label>
                      </div>
                  </div>
                </div>
                <table className="table">
                    <thead>
                    <tr className="text-lg font-bold">
                        <th>ID</th>
                        <th>Name</th>
                        <th>Date of Birth</th>
                        <th>Gender</th>
                        <th>Email</th>
                        <th>Contact Number</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredUsers.map((user, index) => (
                        <tr key={index} className="hover">
                        <td>{user.id}</td>
                        <td className="font-bold">{`${user.first_name} ${user.middle_name} ${user.last_name}`}</td>
                        <td>{user.birth_date}</td>
                        <td>{user.gender}</td>
                        <td>{user.email}</td>
                        <td>{user.phone_number}</td>
                        <td>{user.role}</td>
                        <td>DETAILS, EDIT, DELETE</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AdminUsers
