// eslint-disable-next-line react/prop-types
const SeatLayoutA220_100 = ({ onSeatClick }) => {
    const getSeatClasses = (seatLetter, seatNumber) => {
      const seatColorMap = {
        E: 'bg-accent',
        D: 'bg-secondary',
        C: 'bg-accent',
        B: 'bg-secondary',
        A: 'bg-accent',
      };
  
      if (seatLetter === 'C' && seatNumber >= 1 && seatNumber <= 5) {
        return 'disabled';
      }
  
      return `cursor-pointer ${seatColorMap[seatLetter]} border border-primary rounded-sm text-white`;
    };
  
    return (
    <>
    <div className="relative">
        <table className="mx-auto mt-10">
          <tbody>
            {['E', 'D', 'C', 'B', 'A'].map((rowLetter) => (
              <tr key={rowLetter}>
                {Array.from({ length: 25 }, (_, index) => {
                  const seatNumber = `${rowLetter}${index + 1}`;
                  const seatClasses = getSeatClasses(rowLetter, index + 1);
                  const isCSeatInRange = rowLetter === 'C' && index + 1 >= 1 && index + 1 <= 5;
  
                  return (
                    <td
                      key={seatNumber}
                      className={isCSeatInRange ? 'blank' : seatClasses}
                      onClick={() => onSeatClick(isCSeatInRange ? null : seatNumber)}
                    >
                      {isCSeatInRange ? '' : seatNumber}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
    );
  };
  
  export default SeatLayoutA220_100;