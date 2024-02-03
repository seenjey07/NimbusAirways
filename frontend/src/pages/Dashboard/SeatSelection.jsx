import { useState } from "react";
import SeatLayoutA220_100 from "../../components/SeatLayoutA220_100";
const SeatSelection = () => {
  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSeatClick = (seatNumber) => {
    if (selectedSeat === seatNumber) {
      setSelectedSeat(null);
    } else {
      setSelectedSeat(seatNumber);
    }
  };

  const renderSeatInfo = () => {
    if (selectedSeat) {
      const seatLetter = selectedSeat.charAt(0);
      const seatNumber = selectedSeat.slice(1);

      return (
        <div>
          <h2 className="text-xl font-semibold mb-2">Selected Seat</h2>
          <p>{`Seat Letter: ${seatLetter}, Seat Number: ${seatNumber}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div >
      <h1 className="text-3xl font-semibold mb-4">Seat Selection</h1>
      <p>DI PA TOH GUMAGANA AH!!! HAHAHA PERO GANITO BABATUHIN NALNG TO SA API OKAY NA RIN YUNG SEAT LABELS</p>
      <SeatLayoutA220_100 selectedSeat={selectedSeat} onSeatClick={handleSeatClick} />
      <div className="mt-4">
        {renderSeatInfo()}
      </div>
    </div>
  );
};

export default SeatSelection;