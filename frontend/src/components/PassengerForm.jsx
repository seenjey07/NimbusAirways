import SeatSelection from "../pages/Dashboard/SeatSelection"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "../components/ui/drawer";

/* eslint-disable react/prop-types */
const PassengerForm = ({
    bookForMyself,
    handleBookForMyselfChange,
    firstName,
    setFirstName,
    middleName,
    setMiddleName,
    lastName,
    setLastName,
    birthDate,
    setBirthDate,
    gender,
    setGender,
    isDiscounted,
    setIsDiscounted,
    baggageQuantity,
    setBaggageQuantity,
    handleSeatSelect,
    handleSubmit,
    addAlert,
  }) => {
    return (
        <div className="hero-content card flex flex-col lg:text-left  bg-white">
        <h1 className="text-3xl font-bold mb-4">Flight Booking</h1>
        <h2 className="text-xl font-semibold mb-2">Passenger Details</h2>
        <label className="label cursor-pointer flex-1 w-full">
          <div className="flex">
            <div>
              <span className="label-text mr-3">Book for yourself?</span>
            </div>
            <div>
              <input
                type="checkbox"
                className="toggle"
                name="bookForMyself"
                checked={bookForMyself}
                onChange={handleBookForMyselfChange}
              />
            </div>
          </div>
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label>Middle Name</label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label>Birth Date</label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label>Gender</label>
            <select
              id="gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="border p-2 w-full"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="flex place-items-center justify-center ">
            <div className="flex justify-center items-center">
              <input
                type="checkbox"
                id="isDiscounted"
                name="isDiscounted"
                checked={isDiscounted}
                onChange={(e) => setIsDiscounted(e.target.checked)}
                className="mr-3"
              />
              <label>PWD or Senior Citizen?</label>
            </div>
          </div>
          <div>
            <label>Baggage Quantity:</label>
            <input
              type="number"
              id="baggageQuantity"
              name="baggageQuantity"
              value={baggageQuantity}
              onChange={(e) => setBaggageQuantity(parseInt(e.target.value))}
              className="border p-2 w-full"
            />
          </div>
          <div className="flex place-items-center justify-center">
            <Drawer>
              <DrawerTrigger asChild>
                <button className="btn btn-primary">
                  Open Seat Selection
                </button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="bg-base-100">
                  <SeatSelection
                    addAlert={addAlert}
                    onSeatSelect={handleSeatSelect}
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
        <div>
          <button onClick={handleSubmit} className="btn btn-primary">
            Book Flight
          </button>
        </div>
      </div>
    );
  };

export default PassengerForm

