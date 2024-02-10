import { adminIndexAircraftsApi } from "../../../lib/admin/adminusersapi";
import { useEffect, useState } from "react";
import { CreateFlightIcon, CreateRouteIcon, Elipsis, AircraftDetailsIcon, FlightDetailsIcon, UpdateAircraftIcon } from "../../../components/icons/icons"
import CreateAircraftModal from "./modals/CreateAircraftModal";
import Loading from "../../../components/Loading"
// eslint-disable-next-line react/prop-types
const AdminAircrafts = ({addAlert}) => {
    const [aircrafts, setAircrafts] = useState([])
    const [loading, setLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const fetchAircraftsData = async () => {
        try {
            const res = await adminIndexAircraftsApi();
            setAircrafts(res);
            console.log('Aircrafts', res);
        } catch (error) {
            console.error("Error fetching aircrafts:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isCreateModalOpen) {
          fetchAircraftsData();
        }
      }, [isCreateModalOpen])

    const handleCreateClick = () => {
    document.getElementById('CreateAircraft').showModal()
    setIsCreateModalOpen(true)
    }

    return (
    <>  
        <dialog id="CreateAircraft" className="modal">
            <div className="modal-box bg-accent">
            <form method="dialog">
                <button 
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-secondary"
                >
                ✕
                </button> 
            </form>
                <CreateAircraftModal addAlert={addAlert}  setIsCreateModalOpen={setIsCreateModalOpen} isCreateModalOpen={isCreateModalOpen} />
            </div>
        </dialog>

        
        
        <div>
            <div className="mt-4 flex overflow-auto">
                <div className="flex">
                    <button 
                        className="btn btn-accent text-secondary self-center ml-3 px-6" 
                        onClick={handleCreateClick}
                    >
                        <CreateFlightIcon className="w-6 h-6"/>
                        Add Aircraft
                    </button>
                </div>

                <div className="flex">
                    <button 
                        className="btn btn-accent text-secondary self-center ml-3 px-6" 
                        onClick={() => document.getElementById('CreateUsers').showModal()}
                    >
                        <CreateRouteIcon className="w-6 h-6"/>
                        Create Seats
                    </button>
                </div>
            </div>
            <div className="hero flex justify-center mt-2">
                {loading ? (
                    <Loading />
                ) : (
                    <table className="table bg-white m-5">
                        <thead>
                            <tr className="text-center font-bold text-xl">
                                <th>Aircraft</th>
                                <th>Model</th>
                                <th>Family</th>
                                <th>Seat Capacity</th>
                                <th>Route ID</th>
                                <th>Routes</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {aircrafts.map((aircraft) => (
                                <tr 
                                    className="text-center rounded-lg p-5 hover:bg-slate-200"
                                    key={aircraft.id}
                                >
                                    <td className="text-right ">{aircraft.id}</td>
                                    <td>{aircraft.model}</td>
                                    <td>{aircraft.family}</td>
                                    <td>{aircraft.seat_capacity}</td>
                                    <td> {aircraft.current_route ? 
                                        `${aircraft.current_route.id - 1}, ${aircraft.current_route.id}` :
                                        'N/A'
                                    }</td>
                                    <td> {aircraft.current_route ? 
                                        `${aircraft.current_route.origin_location} to ${aircraft.current_route.destination_location}` :
                                        'N/A'
                                    }</td>
                                    <td
                                    className={`text-center text-xs font-bold rounded-lg hover:bg-slate-200 ${
                                        aircraft.status === 'inactive' ? 'bg-gray-500' : 
                                        aircraft.status === 'on air' ? 'bg-green-500' : 
                                        aircraft.status === 'idle' ? 'bg-yellow-500' : 
                                        aircraft.status === 'landing' ? 'bg-red-500' : ''
                                    }`}
                                    >{aircraft.status.toUpperCase()}</td>

                                        
                                    <td>
                                        <div className="dropdown dropdown-end ">
                                            <div tabIndex={0} role="button" className="btn btn-ghost">
                                                <div>
                                                    <Elipsis />
                                                </div>
                                            </div>
                                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-accent text-secondary rounded-box w-52">
                                                <li>   
                                                    <a>
                                                        <FlightDetailsIcon />
                                                        Flight Details
                                                    </a>
                                                </li>
                                                <li>
                                                    <a>
                                                        <AircraftDetailsIcon />
                                                        Aircraft Details
                                                    </a>
                                                </li>
                                                <li>
                                                    <a>
                                                        <UpdateAircraftIcon />
                                                        Update Aircraft
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    </>
    )
}

export default AdminAircrafts
