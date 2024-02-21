import { useState, useEffect } from "react";
import { showCurrentFlightApi } from "../../../lib/flightsapi";
import SeatLayoutA220_100 from "../../../components/SeatLayoutA220_100";
import SeatLayoutATR72 from "../../../components/SeatLayoutATR72";
import SeatLayoutA320neo from "../../../components/SeatLayoutA320neo";
import Loading from "../../../components/Loading";
// eslint-disable-next-line react/prop-types
const SeatSelection = ({ onSeatSelect, modalFlag }) => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [aircraft, setAircraft] = useState(null);
  const flight_id = localStorage.getItem("selected_flight_id");
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
        console.error("Error fetching initial flight information:", error);
      } finally {
        if (aircraft?.model) {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [modalFlag, flight_id, aircraft?.model]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <h1 className="flex justify-center text-3xl font-semibold mb-8">
        Seat Selection for {aircraft?.model}
      </h1>
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
          <div className="flex flex-col justify-between">
            <div className="flex justify-center text-xs">
              <div>Door (R)</div>
            </div>
            <div className="rotate-90 font-bold text-center">
              FRONT
              <div className="text-xs flex justify-center font-normal">
                Cockpit
              </div>
            </div>
            <div className="flex justify-center text-xs">
              <div>Door (L)</div>
            </div>
          </div>
          <div>
            {loading ? (
              <Loading />
            ) : (
              <>
                {aircraft?.model === "A220-100" && (
                  <>
                    <div className="mt-2">
                      <div className="flex justify-between">
                        <div></div>
                        <span className="flex justify-center font-bold space-x-3">
                          <div className="text-xs text-red-500 mt-1">Exit</div>
                          <div>WINDOW</div>
                          <div className="text-xs text-red-500 mt-1">Exit</div>
                        </span>
                        <div className="text-xs mr-3">Lavatory</div>
                      </div>
                      <SeatLayoutA220_100
                        selectedSeat={selectedSeat}
                        onSeatClick={handleSeatClick}
                      />
                      <div className="flex justify-between">
                        <div></div>
                        <span className="flex justify-center font-bold space-x-3">
                          <div className="text-xs text-red-500 mt-1">Exit</div>
                          <div>WINDOW</div>
                          <div className="text-xs text-red-500 mt-1">Exit</div>
                        </span>
                        <div className="text-xs mr-3 text-white">Lavatory</div>
                      </div>
                    </div>
                  </>
                )}

                {aircraft?.model === "ATR 72-600" && (
                  <>
                    <div className="mt-5">
                      <div className="flex justify-between">
                        <div></div>
                        <span className="flex justify-center font-bold space-x-3">
                          <div className="text-xs text-red-500 mt-1">Exit</div>
                          <div>WINDOW</div>
                          <div className="text-xs text-red-500 mt-1">Exit</div>
                        </span>
                        <div className="text-xs mr-3">Lavatory</div>
                      </div>
                      <SeatLayoutATR72
                        selectedSeat={selectedSeat}
                        onSeatClick={handleSeatClick}
                      />
                      <div className="flex justify-between">
                        <div></div>
                        <span className="flex justify-center font-bold space-x-3">
                          <div className="text-xs text-red-500 mt-1">Exit</div>
                          <div>WINDOW</div>
                          <div className="text-xs text-red-500 mt-1">Exit</div>
                        </span>
                        <div className="text-xs mr-3 text-white">Lavatory</div>
                      </div>
                    </div>
                  </>
                )}

                {aircraft?.model === "A320neo" && (
                  <>
                    <div className="mt-10">
                      <div className="flex justify-between">
                        <div></div>
                        <span className="flex justify-center font-bold space-x-3">
                          <div className="text-xs text-red-500 mt-1">Exit</div>
                          <div>WINDOW</div>
                          <div className="text-xs text-red-500 mt-1">Exit</div>
                        </span>
                        <div className="text-xs mr-3">Lavatory</div>
                      </div>
                      <SeatLayoutA320neo
                        selectedSeat={selectedSeat}
                        onSeatClick={handleSeatClick}
                      />
                      <div className="flex justify-between">
                        <div></div>
                        <span className="flex justify-center font-bold space-x-3">
                          <div className="text-xs text-red-500 mt-1">Exit</div>
                          <div>WINDOW</div>
                          <div className="text-xs text-red-500 mt-1">Exit</div>
                        </span>
                        <div className="text-xs mr-3 text-white">Lavatory</div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-between mr-4">
          <div className="flex justify-center text-xs">
            <div>Door (R)</div>
          </div>
          <div className="rotate-90 font-bold text-center">Back</div>
          <div className="flex justify-center text-xs">
            <div>Door (L)</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeatSelection;
