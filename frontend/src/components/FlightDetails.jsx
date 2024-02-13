import { useEffect } from "react"
import Loading from "./Loading"
import format from "date-fns/format"
/* eslint-disable react/prop-types */
const FlightDetails = ({flight, 
departureDate, 
arrivalDate, 
handleFormSubmit, 
passengerStates,
passenger,
seatDataArray
}) => {

    


      const combinedData = seatDataArray.map((seat, index) => ({
        seat,
        passenger: passengerStates[index],
      }));

      useEffect(() => {
        console.log('Merged', combinedData)
      }, [seatDataArray, passengerStates]);
    
  
return (     
        <>   
            <h2 className="text-xl font-bold mb-2 flex justify-center">Booking Details</h2>
            <table>
                <tbody>
                    <tr>
                        <td>Flight Number:</td>
                        <td>{flight.flight_number}</td>
                    </tr>
                    <tr>
                        <td>Departure Date and Time:</td>
                        <td>{departureDate ? format(new Date(departureDate), "MMMM dd, yyyy hh:mm a") : "Not available"}</td>
                    </tr>
                    <tr>
                        <td>Estimated Arrival Date and Time:</td>
                        <td>{arrivalDate ? format(new Date(arrivalDate), "MMMM dd, yyyy hh:mm a") : "Not available"}</td>
                    </tr>
                    <tr>
                        <td>Aircraft:</td>
                        <td>{flight.aircraft ? (
                            `${flight.aircraft.name} ${flight.aircraft.model}`
                        ) : (
                            <Loading />
                        )}</td>
                    </tr>
                    <tr>
                        <td>Price:</td>
                        <td>₱{(flight.price * passenger).toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>

            <div className="divider"></div> 

            <div>
        {combinedData.map((data, index) => (
        (data.seat && data.passenger.firstName && data.passenger.middleName && data.passenger.lastName) && (
            <>
                <div key={index}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <tbody>
                            <tr>
                                <td>Passenger</td>
                                <td>{index + 1}</td>
                            </tr>
                            <tr>
                                <td>First Name</td>
                                <td>{data.passenger.firstName}</td>
                            </tr>
                            <tr>
                                <td>Middle Name</td>
                                <td>{data.passenger.middleName}</td>
                            </tr>
                            <tr>
                                <td>Last Name</td>
                                <td>{data.passenger.lastName}</td>
                            </tr>
                            <tr>
                                <td>Gender</td>
                                <td>{data.passenger.gender}</td>
                            </tr>
                            <tr>
                                <td>Birthday</td>
                                <td>{data.passenger.birthDate}</td>
                            </tr>
                            <tr>
                                <td>Baggage</td>
                                <td>{data.passenger.baggageQuantity}</td>
                            </tr>
                            <tr>
                                <td>Seat</td>
                                <td>{data.seat}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                    <div className="divider"></div>
            </>
                    )
                ))}
                </div>
                
            <div className="mb-3">
                <div>Seat Fee</div>
                <div>Meals</div>
                <div>Total Fee</div>
            </div>

            <button
                onClick={() => handleFormSubmit(passengerStates)}
                className="btn btn-primary"
            >
                Book Flight
            </button>
        </>
        ) 
    }

export default FlightDetails