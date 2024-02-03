// eslint-disable-next-line react/prop-types
import { useEffect } from "react";
import axios from "axios";
// eslint-disable-next-line react/prop-types
const FlightBookingsLayout = ({children}) => {
    useEffect(() => {
        const initiateAuthorization = () => {
            const token = document.cookie.split('token=')[1];
            if (token) {
                axios.defaults.headers.common['Authorization'] = token;
            }
        };
        initiateAuthorization();
    }, []);
    return(
        <>
        <div>
            {children}
        </div>
        </>
    )
}

export default FlightBookingsLayout