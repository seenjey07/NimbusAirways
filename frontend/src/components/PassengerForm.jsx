import SeatSelection from "../pages/user/Dashboard/SeatSelection"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "../components/ui/drawer";

/* eslint-disable react/prop-types */
const PassengerForm = ({ formFields, addAlert, handleSeatSelect, onInputChange, passengerNumber }) => {
  return (
    <div className="flex flex-col lg:text-left ">

    {formFields.map((field) => (
    <>
      <div 
      className="flex justify-center "
      key={field.name}
      >
        {field.type === 'select' ? (
        <label className="form-control w-full max-w-xs">
          <div className="label">
            {field.label}
          </div>
          <select
            id={field.name}
            name={field.name}
            onChange={(e) => onInputChange(field.name, e.target.value)}
            className="select select-bordered"
            required={field.required}
          >
            <option value="" disabled selected>
              Select {field.label}
            </option>
            {field.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        ) : (
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">{field.label}</span>
            </div>
            <input
              type={field.type || 'text'}
              id={field.name}
              name={field.name}
              onChange={(e) => onInputChange(field.name, e.target.value)}
              className="input input-bordered w-full max-w-xs"
              required={field.required}
            />
          </label>
        )}
      </div>
    </>
    ))}

    <div className="flex place-items-center justify-center mt-4 ">
      <Drawer >
        <DrawerTrigger asChild>
          <div className="tooltip tooltip-secondary tooltip-bottom" data-tip={`Choose seat for Passenger ${passengerNumber}`}>
          <button className="btn btn-primary">Open Seat Selection</button>

          </div>
        </DrawerTrigger>
        <DrawerContent className="bg-white">
          <div>
            <span className="flex justify-center text-lg italic">Currently Choosing Passenger for {passengerNumber}</span>
          <SeatSelection
                addAlert={addAlert}
                onSeatSelect={(seatData) => {
                  handleSeatSelect(passengerNumber, seatData);
                }}
              />
            <DrawerFooter>
              <DrawerClose asChild>
                <button className="btn btn-primary">Cancel</button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  </div>
  );
};

export default PassengerForm

