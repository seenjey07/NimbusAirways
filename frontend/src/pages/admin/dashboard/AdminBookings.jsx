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
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const perPage = 10;

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
          document.getElementById('bookings').showModal()
        } catch (error) {
          console.error("Error fetching bookings:", error);
        }
      };

      const filteredBookings = bookings.filter((booking) =>
    booking.booking_reference.includes(searchTerm)
    );

    const totalPages = Math.ceil(filteredBookings.length / perPage);

    const handleNextPage = () => {
      setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
    };

    const handlePrevPage = () => {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    };

    const paginatedBookings = filteredBookings.slice(
      currentPage * perPage,
      (currentPage + 1) * perPage
    );



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
                
                  <div className="flex justify-between mt-3">
                    <div className="ml-2 join bg-accent">
                          <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 0}
                            className="join-item btn btn-accent text-secondary"
                          >
                            Previous
                          </button>
                          <div className="divider divider-horizontal divider-secondary"></div>
                          <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages - 1}
                            className="join-item btn btn-accent text-secondary"
                          >
                            Next
                          </button>
                    </div>
                    <span className="flex justify-center text-2xl m-2 font-bold">List of Bookings</span>
                    <input
                    type="text"
                    placeholder="Search by Booking Reference"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input input-accent bg-accent text-secondary placeholder-secondary placeholder-text-sm mr-3"
                    />
                  </div>
                  
                <div className="overflow-x-auto z-[-1]">
                    {loading ? (
                    <Loading />
                    ) : (
                      <>
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
                        {paginatedBookings.map((booking, index) => (
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
                  </>
                )}
                </div>
            </div>
        </>
    )
}

export default AdminBookings