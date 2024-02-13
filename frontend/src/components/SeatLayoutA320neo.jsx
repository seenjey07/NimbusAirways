/* eslint-disable react/prop-types */
const SeatLayoutA320neo = ({ onSeatClick, selectedSeat }) => {
  const getSeatClasses = (seatLetter, seatNumber) => {
    const seatColorMap = {
      F: 'bg-green-500',
      E: 'bg-purple-500',
      D: 'bg-blue-500',
      C: 'bg-blue-500',
      B: 'bg-purple-500',
      A: 'bg-green-500',
    };

    const isSelected = selectedSeat === `${seatLetter}${seatNumber}`;
    const isSeat = seatLetter === 'A' || seatLetter === 'B' || seatLetter === 'C' || seatLetter === 'D' || seatLetter === 'E' || seatLetter === 'F';

    if (seatLetter === 'X') {
      return `text-black bg-black `;
    }

    if (isSeat && isSelected) {
      return `text-center cursor-pointer bg-red-500 border border-primary rounded-sm text-white`;
    }

    return `w-10 text-center h-5 cursor-pointer text-white ${seatColorMap[seatLetter]} border border-primary rounded-sm ${isSelected ? 'bg-red-500' : ''}`;
  };

  return (
    <div className="relative">
        <table className="mx-auto">
          <tbody>
            {['F', 'E', 'D', 'X', 'C', 'B', 'A'].map((rowLetter) => (
              <tr key={rowLetter}>
                {Array.from({ length: 30 }, (_, index) => {
                  const seatNumber = `${rowLetter}${index + 1}`;
                  const seatClasses = getSeatClasses(rowLetter, index + 1);
                  
                  const isXSeatInRange = rowLetter === 'X' && index + 1 >= 1 && index + 1 <= 30;

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

export default SeatLayoutA320neo;