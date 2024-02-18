import { useState, useEffect} from "react"
import { adminDeleteeUserApi, adminIndexUsersApi } from "../../../lib/admin/adminusersapi";
import CreateUsersModal from "./modals/CreateUsersModal";
import EditUsersModal from "./modals/EditUsersModal";
import { CreateUserIcon, DeleteUserIcon, EditUserIcon } from "../../../components/icons/icons"

// eslint-disable-next-line react/prop-types
const AdminUsers = ({addAlert}) => {
    const [userData, setUserData]   = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

      const fetchUserData = async () => {
        try {
          const res = await adminIndexUsersApi();
          const filteredUserData = res.filter(user => user.role !== "superadmin");
          setUserData(filteredUserData)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      
    const filteredUsers = userData.filter(user =>
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

      const handleDeleteUser = async (id, first, last) => {
        try {
          const res = await adminDeleteeUserApi({id});
          addAlert('success', `User ${first} ${last} with ID: ${id} deleted successfully!`);
          console.log('User deleted successfully:', res);
          fetchUserData()
        } catch (error) {
          addAlert('error', error.response.data.errors);
        }
      }

       const handleEditClick = (id) => {
        setSelectedUserId(id);
        setIsEditModalOpen(true)
        console.log("isEditModalOpen from AdminUsers", isEditModalOpen);
        console.log("Selected User ID:", selectedUserId);
        document.getElementById('EditUsers').showModal();
      };

      const itemsPerPage = 8;
      const [currentPage, setCurrentPage] = useState(1);
      const indexOfLastUser = currentPage * itemsPerPage;
      const indexOfFirstUser = indexOfLastUser - itemsPerPage;
      const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
      const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

      const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
      };
    
      const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
      };

      useEffect(() => {
        if (!isEditModalOpen) {
          fetchUserData();
        }
      }, [isEditModalOpen]);
    
    
    return (
      <>
        <dialog id="CreateUsers" className="modal">
          <div className="modal-box bg-accent">
            <form method="dialog">
              <button 
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-secondary"
              >
              ✕
              </button> 
            </form>
            <CreateUsersModal addAlert={addAlert} />
          </div>
        </dialog>

        <dialog id="EditUsers" className="modal">
          <div className="modal-box bg-accent">
            <form method="dialog">
              <button 
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-secondary"
              >
                ✕
              </button> 
            </form>
            <EditUsersModal 
            addAlert={addAlert} 
            selectedUserId={selectedUserId} 
            isEditModalOpen={isEditModalOpen} 
            setIsEditModalOpen={setIsEditModalOpen} 
            />
          </div>
        </dialog>



        <div>
          <div className="overflow-auto">
              <div className="flex-1 ">
                  <div className="flex justify-between">
                    <div className="flex">
                      
                      <button className="btn btn-accent text-secondary self-center ml-3 px-6" onClick={()=>document.getElementById('CreateUsers').showModal()}>
                      <CreateUserIcon className="w-6 h-6"/>
                        Create User
                      </button>
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
                        className="placeholder:text-sm input input-bordered w-full max-w-xs bg-white" 
                        onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </label>
                    </div>
                </div>
              </div>
              <table className="table">
                  <thead>
                  <tr className="text-lg text-center font-bold">
                      <th>ID</th>
                      <th>NAME</th>
                      <th>DATE OF BIRTH</th>
                      <th>GENDER</th>
                      <th>EMAIL</th>
                      <th>CONTACT NUMBER</th>
                      <th>ROLE</th>
                      <th>ACTIONS</th>
                  </tr>
                  </thead>
                  <tbody>
                  {currentUsers.map((user, index) => (
                      <tr key={index} className="hover text-center">
                      <td>{user.id}</td>
                      <td className="font-bold text-left text-xs">{`${user.first_name} ${user.middle_name} ${user.last_name}`}</td>
                      <td>{user.birth_date}</td>
                      <td>{user.gender}</td>
                      <td className="text-left text-xs">{user.email}</td>
                      <td className="text-xs">{user.phone_number}</td>
                      <td>{user.role}</td>
                      <td>
                      
                      <button 
                      className="btn btn-sm btn-accent text-secondary self-center ml-3 px-6" 
                      onClick={() => handleEditClick(user.id)}>
                        <EditUserIcon className="w-6 h-6"/>
                        Edit
                      </button>

                      <button 
                      className="btn btn-sm btn-accent text-secondary ml-3 px-6"
                      onClick={() => handleDeleteUser(user.id, user.first_name, user.last_name)}>
                        <DeleteUserIcon className="w-6 h-6"/>
                        Delete
                      </button>
                      </td>
                      </tr>
                  ))}
                  </tbody>
              </table>
          </div>
          
           <div className="flex justify-center mt-2 mb-2">
              <button
                className="btn btn-sm btn-accent text-secondary px-3"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="mx-3">{`Page ${currentPage} of ${totalPages}`}</span>
              <button
                className="btn btn-sm btn-accent text-secondary px-3"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>

        </div>
      </>
    )
}

export default AdminUsers
