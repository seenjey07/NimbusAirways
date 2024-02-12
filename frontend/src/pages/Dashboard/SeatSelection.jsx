import { useState } from "react";
import SeatLayoutA220_100 from "../../components/SeatLayoutA220_100";
// eslint-disable-next-line react/prop-types
const SeatSelection = ({onSeatSelect}) => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const handleSeatClick = (seatNumber) => {
    setSelectedSeat((prevSelectedSeat) =>
      prevSelectedSeat !== seatNumber ? seatNumber : null
    );
    onSeatSelect(seatNumber);
  };

  const renderSeatInfo = () => {
    if (selectedSeat) {
      const seatLetter = selectedSeat.charAt(0);
      const seatNumber = selectedSeat.slice(1);
    }

    return null;
  };

  return (
    <div >
      <h1 className="text-3xl font-semibold mb-4">Seat Selection</h1>
      <SeatLayoutA220_100 selectedSeat={selectedSeat} onSeatClick={handleSeatClick} />
      <div className="mt-4">
        {renderSeatInfo()}
      </div>
    </div>
  );
};

export default SeatSelection;