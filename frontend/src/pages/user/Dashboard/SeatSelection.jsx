import { useState, useEffect } from "react";
import { showCurrentFlightApi } from "../../../lib/flightsapi";
import SeatLayoutA220_100 from "../../../components/SeatLayoutA220_100";
import SeatLayoutATR72 from "../../../components/SeatLayoutATR72";
import SeatLayoutA320neo from "../../../components/SeatLayoutA320neo";
import Loading from "../../../components/Loading"
// eslint-disable-next-line react/prop-types
const SeatSelection = ({onSeatSelect, modalFlag}) => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [aircraft, setAircraft] = useState(null);
  const flight_id = localStorage.getItem('selected_flight_id');
  const [loading, setLoading] = useState(true);
  const handleSeatClick = (seatNumber) => {
    setSelectedSeat((prevSelectedSeat) =>
      prevSelectedSeat !== seatNumber ? seatNumber : null
    );
    onSeatSelect(seatNumber);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const flightsData = await showCurrentFlightApi(flight_id);
        setAircraft(flightsData.aircraft);
      } catch (error) {
        console.error(
          "Error fetching initial flight information:",
          error
        );
      } finally {
        if (aircraft?.model) {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [modalFlag,flight_id, aircraft?.model]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <h1 className="flex justify-center text-3xl font-semibold mb-8">Seat Selection for {aircraft?.model}</h1>
      <div className="bg-white flex justify-center">
          <div className="flex">
            <div>
              <table className="mt-4 border-collapse mx-8">
                <thead>
                  <tr>
                    <th className="border border-gray-400 p-2">Color</th>
                    <th className="border border-gray-400 p-2">Seat Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-400 p-2 bg-green-500"></td>
                    <td className="border border-gray-400 p-2">Window Seat</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 bg-purple-500"></td>
                    <td className="border border-gray-400 p-2">Middle Seat</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 bg-blue-500"></td>
                    <td className="border border-gray-400 p-2">Aisle Seat</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 bg-black text-white"></td>
                    <td className="border border-gray-400 p-2">Aisle</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              {loading ? (
                <Loading /> 
              ) : (
                <>
                  {aircraft?.model === "A220-100" && (
                    <>
                      <span className="flex justify-center font-bold">WINDOW</span>
                      <SeatLayoutA220_100 selectedSeat={selectedSeat} onSeatClick={handleSeatClick} />
                      <span className="flex justify-center font-bold">WINDOW</span>
                    </>
                  )}

                  {aircraft?.model === "ATR 72-600" && (
                    <>
                      <span className="flex justify-center font-bold">WINDOW</span>
                      <SeatLayoutATR72 selectedSeat={selectedSeat} onSeatClick={handleSeatClick} />
                      <span className="flex justify-center font-bold">WINDOW</span>
                    </>
                  )}

                  {aircraft?.model === "A320neo" && (
                    <>
                      <span className="flex justify-center font-bold">WINDOW</span>
                      <SeatLayoutA320neo selectedSeat={selectedSeat} onSeatClick={handleSeatClick} />
                      <span className="flex justify-center font-bold">WINDOW</span>
                    </>
                  )}
                </>
              )}
            </div>


        </div>
      </div>
    </>
  );
};

export default SeatSelection;