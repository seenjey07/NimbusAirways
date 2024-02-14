import {useState, useEffect } from "react";
import { adminIndexBookingsApi, adminShowCurrentBookingApi } from "../../../lib/admin/adminusersapi"
import Loading from "../../../components/Loading"
import format from "date-fns/format";
import { ShowBookingIcon } from "../../../components/icons/icons"
import ShowBookingModal from "./modals/ShowBookingModal";
const AdminBookings = () => {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true);
    const [bookingData, setBookingData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await adminIndexBookingsApi();
            setBookings(response);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching bookings:", error);
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);

      const handleShowBooking = async (id) => {
        try {
          const response = await adminShowCurrentBookingApi(id);
          setBookingData(response)
          console.log("Bookings Data", bookingData);
          document.getElementById('bookings').showModal()
        } catch (error) {
          console.error("Error fetching bookings:", error);
        }
      };


    return (
        <>
            <dialog id="bookings" className="modal">
            <div className="modal-box w-12/12 max-w-7xl bg-white">
                <ShowBookingModal bookingData={bookingData} setBookingData={setBookingData} />

            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
            </dialog>

             <div>
                <span className="flex justify-center text-2xl m-2 font-bold">List of Bookings</span>
                <div className="overflow-x-auto z-[-1]">
                    {loading ? (
                    <Loading />
                    ) : (
                    <table className="table">
                        <thead>
                        <tr className="text-center font-bold">
                            <th>No.</th>
                            <th>ID</th>
                            <th>Reference Number</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {bookings.map((booking, index) => (
                            <tr key={index}>
                            <th className="text-center">{index + 1}</th>
                            <th className="text-center">{booking.id}</th>
                            <td>{booking.booking_reference}</td>
                            <td className="text-center">{format(new Date(booking.created_at), 'yyyy-MM-dd HH:mm:ss a')}</td>
                            <td className="text-center">
                            <button 
                            className="btn btn-sm btn-accent text-secondary self-center ml-3 px-6" 
                            onClick={() => handleShowBooking(booking.id)}>
                                <ShowBookingIcon className="w-6 h-6"/>
                                Booking Details
                            </button>
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

export default AdminBookings