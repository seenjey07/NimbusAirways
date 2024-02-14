import { useState, useEffect } from "react";
import Loading from "../../../../components/Loading"
import format from "date-fns/format";
// eslint-disable-next-line react/prop-types
const ShowBookingModal = ({bookingData}) => {

 const [data, setData] = useState(null);

  useEffect(() => {
    setData(bookingData);
  }, [bookingData]);

  console.log("BookingData Modal", data);

  if (!data) {
    return <Loading />;
  }


  return (
    <>
    <span className="flex justify-center text-2xl font-bold mb-2">Booking Details - ({data.booking?.booking_reference})</span>
    
    {data?.booking && data?.booking?.flight && (
    <div className="justify-center flex border-2 border-black">
      <div>
        <p className="justify-center flex underline underline-offset-1 font-bold ">Flight Details</p>
        <table>
          <tbody>
              <tr>
                  <td className="font-bold text-right">Flight Number</td>
                  <td className="flex ml-3">{data.booking.flight?.flight_number}</td>
              </tr>

              <tr>
                  <td className="font-bold text-right">Origin</td>
                  <td className="flex ml-3">{data.route?.origin_location} 
                  <span className="italic ml-1 text-sm font-bold">({data.route?.origin_code})</span>
                  </td>
              </tr>

              <tr>
                  <td className="font-bold text-right">Destination</td>
                  <td className="flex ml-3">{data.route?.destination_location} 
                  <span className="italic ml-1 text-sm font-bold">({data.route?.destination_code})</span>
                  </td>
              </tr>

              <tr>
                  <td className="font-bold text-right">Date of Flight</td>
                  <td className="flex ml-3">{format(data.booking?.flight?.departure_date, 'MMMM dd, yyyy hh:mm a')}</td>
              </tr>

              <tr>
                  <td className="font-bold text-right">Date of Arrival</td>
                  <td className="flex ml-3">{format(data.booking.flight?.arrival_date, 'MMMM dd, yyyy hh:mm a')}</td>
              </tr>
          </tbody>
        </table>
      </div>

      <div className="ml-12">
        <p className="justify-center flex underline underline-offset-1 font-bold">Aircraft Details</p>
        <table>
          <tbody>
              <tr>
                  <td className="font-bold text-right">Family</td>
                  <td className="flex ml-3">{data.booking.flight.aircraft?.family}</td>
              </tr>

              <tr>
                  <td className="font-bold text-right">Model</td>
                  <td className="flex ml-3">{data.booking.flight.aircraft?.model}</td>
              </tr>

              <tr>
                  <td className="font-bold text-right">Seat Capacity</td>
                  <td className="flex ml-3">{data.booking.flight.aircraft?.seat_capacity}</td>
              </tr>
          </tbody>
        </table>
      </div>

    </div>
    )}
    
    
    <div className="flex-1 justify-center border-2 border-b-black border-x-black p-2 w-full">
      <div className="flex">
        {data.passengers && data.passengers.slice(0,5).map((passenger, index) => (
          <div className=" text-center collapse  bg-white ease-in-out duration-300 focus:bg-slate-200" key={passenger.id}>  <input type="radio" name="my-accordion-1" id={`passenger-${index}`} />  
          <label htmlFor={`passenger-${index}`} className="collapse-title text-2xl font-bold underline underline-offset-2">
              Passenger {index + 1}
            </label>
            <div className="collapse-content border-2 border-black rounded-lg shadow-lg p-2 ">
              <table>
                <tbody>
                    <tr>
                        <td className="font-bold text-right">First Name</td>
                        <td className="flex ml-3">{passenger?.first_name}</td>
                    </tr>

                    <tr>
                        <td className="font-bold text-right">Middle Name</td>
                        <td className="flex ml-3">{passenger?.middle_name}</td>
                    </tr>

                    <tr>
                        <td className="font-bold text-right">Last Name</td>
                        <td className="flex ml-3">{passenger?.last_name}</td>
                    </tr>

                    <tr>
                        <td className="font-bold text-right">Birthday</td>
                        <td className="flex ml-3 text-sm mt-1">{format(passenger?.birth_date, 'MMM dd, yyyy')}</td>
                    </tr>

                    <tr>
                        <td className="font-bold text-right">Gender</td>
                        <td className="flex ml-3">{passenger?.gender}</td>
                    </tr>

                    <tr>
                        <td className="font-bold text-right">Seat</td>
                        <td className="flex ml-3">{`${passenger.seat.seat_number}${passenger.seat.seat_letter}`}</td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      <div className="flex">
        {data.passengers && data.passengers.slice(5,10).map((passenger, index) => (
          <div className=" text-center collapse  bg-white ease-in-out duration-300 focus:bg-slate-200" key={passenger.id}>  <input type="radio" name="my-accordion-1" id={`passenger-${index}`} />  
          <label htmlFor={`passenger-${index}`} className="collapse-title text-2xl font-bold underline underline-offset-2">
              Passenger {index + 6}
            </label>
            <div className="collapse-content border-2 border-black rounded-lg shadow-lg p-2 ">
              <table>
                <tbody>
                    <tr>
                        <td className="font-bold text-right">First Name</td>
                        <td className="flex ml-3">{passenger?.first_name}</td>
                    </tr>

                    <tr>
                        <td className="font-bold text-right">Middle Name</td>
                        <td className="flex ml-3">{passenger?.middle_name}</td>
                    </tr>

                    <tr>
                        <td className="font-bold text-right">Last Name</td>
                        <td className="flex ml-3">{passenger?.last_name}</td>
                    </tr>

                    <tr>
                        <td className="font-bold text-right">Birthday</td>
                        <td className="flex ml-3 text-sm mt-1">{format(passenger?.birth_date, 'MMM dd, yyyy')}</td>
                    </tr>

                    <tr>
                        <td className="font-bold text-right">Gender</td>
                        <td className="flex ml-3">{passenger?.gender}</td>
                    </tr>

                    <tr>
                        <td className="font-bold text-right">Seat</td>
                        <td className="flex ml-3">{`${passenger.seat.seat_number}${passenger.seat.seat_letter}`}</td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>

    </>
  );
};
  
  
  export default ShowBookingModal;