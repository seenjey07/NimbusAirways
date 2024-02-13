/* eslint-disable react/prop-types */
const SeatLayoutATR72 = ({ onSeatClick, selectedSeat }) => {
  const getSeatClasses = (seatLetter, seatNumber) => {
    const seatColorMap = {
      D: 'bg-green-500',
      C: 'bg-blue-500',
      B: 'bg-blue-500',
      A: 'bg-green-500',
    };

    const isSelected = selectedSeat === `${seatLetter}${seatNumber}`;
    const isSeat = seatLetter === 'B' || seatLetter === 'D' || seatLetter === 'C' || seatLetter === 'A';

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
            {['D', 'C', 'X', 'B', 'A'].map((rowLetter) => (
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

export default SeatLayoutATR72;