

// eslint-disable-next-line react/prop-types
const TestAlerts = ({ addAlert }) => {
  const handleSuccess = () => {
    addAlert('success', 'Success Alert');
  };

  const handleError = () => {
    addAlert('error', 'Error Alert');
  };

  const handleInfo = () => {
    addAlert('info', 'Info Alert');
  };

  return (
    <div className="flex flex-col">
      <button className="flex btn btn-primary"onClick={handleSuccess}>Show Success Alert</button>
      <button className="flex btn btn-success"onClick={handleError}>Show Error Alert</button>
      <button className="flex btn btn-infoy"onClick={handleInfo}>Show Info Alert</button>
    </div>
  );
};

export default TestAlerts;