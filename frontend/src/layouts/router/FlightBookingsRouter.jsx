import FlightBookingsLayout from "../FlightBookingsLayout";
import { Routes, Route } from "react-router-dom";
import FlightBookings from "../../pages/FlightBookings";
import BookingsComponent from "../../pages/Bookings";
import { useEffect } from "react";
import axios from "axios";
// eslint-disable-next-line react/prop-types
const FlightBookinsRouter = ({addAlert}) => {    
    useEffect(() => {
        const initiateAuthorization = () => {
            const token = document.cookie.split('token=')[1];
            if (token) {
                axios.defaults.headers.common['Authorization'] = token;
            }
        };
        initiateAuthorization();
    }, []);
    
    return (

        <>
            <FlightBookingsLayout>
                <Routes>
                    <Route path="/" element={<FlightBookings addAlert={addAlert}/>} />
                    <Route path="/bookings" element={<BookingsComponent addAlert={addAlert} />} />
                </Routes>
            </FlightBookingsLayout>
        </>

    )
}

export default FlightBookinsRouter