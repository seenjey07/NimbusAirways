import { useState, useEffect } from "react";
import { indexedSeatsFromFlightsApi } from "../lib/seatsapi";
/* eslint-disable react/prop-types */
const SeatLayoutA220_100 = ({ onSeatClick, selectedSeat }) => {
  const retrievedSeatDataArray = localStorage.getItem("updatedSeatDataArray");
  const seatDataArray = retrievedSeatDataArray
    ? JSON.parse(retrievedSeatDataArray)
    : [];
  const [indexedSeats, setIndexedSeats] = useState([]);
  const flightId = localStorage.getItem("selected_flight_id");

  useEffect(() => {
    const fetchIndexedSeats = async () => {
      try {
        const response = await indexedSeatsFromFlightsApi(flightId);
        const indexedSeatsArray = response.data.seats;
        setIndexedSeats(indexedSeatsArray);
        console.log("Indexed seats:", indexedSeatsArray);
      } catch (error) {
        console.error("Error fetching indexed seats:", error);
      }
    };
    fetchIndexedSeats();
  }, []);

  const reservedSeats = indexedSeats
    .filter((seat) => seat.is_available === false)
    .map((seat) => `${seat.seat_letter}${seat.seat_number}`);

  const getSeatClasses = (seatLetter, seatNumber) => {
    const seatColorMap = {
      E: "bg-green-500",
      D: "bg-purple-500",
      C: "bg-blue-500",
      B: "bg-purple-500",
      A: "bg-green-500",
    };

    const isSelected = selectedSeat === `${seatLetter}${seatNumber}`;
    const isSeat =
      seatLetter === "A" ||
      seatLetter === "B" ||
      seatLetter === "C" ||
      seatLetter === "D" ||
      seatLetter === "E";

    const isSeatTaken = seatDataArray.includes(`${seatLetter}${seatNumber}`);

    if (reservedSeats.includes(`${seatLetter}${seatNumber}`)) {
      return `bg-gray-500 w-10 text-center h-5 text-white border border-primary rounded-sm`;
    }

    if (seatLetter === "X") {
      return `text-black bg-black w-10 text-center h-5 border border-primary rounded-sm cursor-not-allowed`;
    }

    if (isSeat && isSelected) {
      return `text-center cursor-pointer bg-red-500 border border-primary rounded-sm text-white`;
    }

    const seatClass = `w-10 text-center h-5 cursor-pointer text-white ${seatColorMap[seatLetter]} border border-primary rounded-sm`;

    return isSeatTaken ? `${seatClass} bg-red-500` : seatClass;
  };

  return (
    <div className="relative">
      <table className="mx-auto">
        <tbody>
          {["E", "D", "C", "X", "B", "A"].map((rowLetter) => (
            <tr key={rowLetter}>
              {Array.from({ length: 25 }, (_, index) => {
                const seatNumber = `${rowLetter}${index + 1}`;
                const seatClasses = getSeatClasses(rowLetter, index + 1);
                const isXSeatInRange =
                  rowLetter === "X" && index + 1 >= 1 && index + 1 <= 25;

                return (
                  <td
                    key={seatNumber}
                    className={`${
                      reservedSeats.includes(`${rowLetter}${index + 1}`)
                        ? "bg-gray-500 text-black"
                        : seatClasses
                    } w-10 text-center h-5 text-black border border-primary rounded-sm`}
                    onClick={() =>
                      !reservedSeats.includes(`${rowLetter}${index + 1}`) &&
                      !isXSeatInRange &&
                      rowLetter !== "X"
                        ? onSeatClick(seatNumber)
                        : null
                    }
                  >
                    {!reservedSeats.includes(`${rowLetter}${index + 1}`) &&
                      seatNumber}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SeatLayoutA220_100;
