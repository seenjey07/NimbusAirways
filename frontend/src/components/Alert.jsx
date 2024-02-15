// eslint-disable-next-line react/prop-types
const Alert = ({ type, message }) => {
  let alertType;
  let icon;
  let d;

  if (type === "success") {
    alertType = "alert-success";
    icon = "http://www.w3.org/2000/svg";
    d = "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z";
  } else if (type === "error") {
    alertType = "alert-danger";
    icon = "http://www.w3.org/2000/svg";
    d = "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z";
  } else {
    alertType = "alert-info";
    icon = "http://www.w3.org/2000/svg";
    d = "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z";
  }

  return (
    <>
      <div role="alert" className={`alert ${alertType}`}>
        <svg
          xmlns={icon}
          className="stroke-current shrink-0 h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={d}
          />
        </svg>
        <span>{message}</span>
      </div>
    </>
  );
};

export default Alert;
