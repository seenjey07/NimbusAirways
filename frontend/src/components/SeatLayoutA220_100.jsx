
/* eslint-disable react/prop-types */
const SeatLayoutA220_100 = ({ onSeatClick, selectedSeat }) => {
  const retrievedSeatDataArray = localStorage.getItem('updatedSeatDataArray');
  const seatDataArray = retrievedSeatDataArray ? JSON.parse(retrievedSeatDataArray) : [];
  
  const getSeatClasses = (seatLetter, seatNumber) => {
    const seatColorMap = {
      E: 'bg-green-500',
      D: 'bg-purple-500',
      C: 'bg-blue-500',
      B: 'bg-purple-500',
      A: 'bg-green-500',
    };

    
    const isSelected = selectedSeat === `${seatLetter}${seatNumber}`;
    const isSeat = seatLetter === 'A' || seatLetter === 'B' || seatLetter === 'C' || seatLetter === 'D' || seatLetter === 'E'
    const isSeatTaken = seatDataArray.includes(`${seatLetter}${seatNumber}`);

    if (seatLetter === 'X') {
      return `text-black bg-black `;
    }

    if (isSeat && isSelected) {
      return `text-center cursor-pointer bg-red-500 border border-primary rounded-sm text-white`;
    }

    return `w-10 text-center h-5 cursor-pointer text-white ${seatColorMap[seatLetter]} border border-primary rounded-sm ${isSeatTaken ? 'bg-red-500' : ''}`;
  };

  return (
    <div className="relative">
        <table className="mx-auto">
          <tbody>
            {['E', 'D', 'C', 'X', 'B', 'A'].map((rowLetter) => (
              <tr key={rowLetter}>
                {Array.from({ length: 25 }, (_, index) => {
                  const seatNumber = `${rowLetter}${index + 1}`;
                  const seatClasses = getSeatClasses(rowLetter, index + 1);
                  const isXSeatInRange = rowLetter === 'X' && index + 1 >= 1 && index + 1 <= 25;

                  return (
                    <td
                    key={seatNumber}
                    className={seatClasses}
                    onClick={() => onSeatClick(isXSeatInRange ? null : seatNumber)}
                  >
                    {seatNumber}
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