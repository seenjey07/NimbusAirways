import { useState } from "react";
import { aircraftOptions } from "../../../../assets/Datas"
import { adminCreateAircraftApi } from "../../../../lib/admin/adminusersapi"

// eslint-disable-next-line react/prop-types
const CreateAircraftModal = ({addAlert, setIsCreateModalOpen, isCreateModalOpen}) => {
    const [selectedAircraft, setSelectedAircraft] = useState(null);
  
    const handleSelectAircraft = (option) => {
      setSelectedAircraft(option);
    };
  
    const handleCreateAircraft = async () => {
        if (!selectedAircraft) {
          console.error("Please select an aircraft option");
          return;
        }
        const newAircraft = {
          aircraft: selectedAircraft,
        };
        try {
          await adminCreateAircraftApi(newAircraft);
          addAlert('success', 'Aircraft successfully!');
          setIsCreateModalOpen(false);
          document.getElementById('CreateAircraft').close();
        } catch (error) {
          addAlert('error', error.response.data.errors);
        }
      };


  
    return (
      <div className="text-white">
        <div className="card-body">
          <h2 className="card-title flex justify-center">Create Aircraft</h2>
          <form>
            <label className="form-control w-full max-w-xs">
              Select Aircraft:
              <select
                className="select select-bordered w-full max-w-xs text-black"
                value={selectedAircraft ? selectedAircraft.model : ""}
                onChange={(e) => {
                  const selectedOption = aircraftOptions.find(
                    (option) => option.model === e.target.value
                  );
                  handleSelectAircraft(selectedOption);
                }}
              >
                <option value="" disabled>
                  -- Select Aircraft --
                </option>
                {aircraftOptions.map((option) => (
                  <option key={option.model} value={option.model}>
                    {option.model}
                  </option>
                ))}
              </select>
            </label>
            {selectedAircraft && (
              <>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text text-white">Model</span>
                </div>
                <input 
                type="text" 
                className="input input-bordered w-full max-w-xs" 
                disabled
                value={selectedAircraft.model}
                />
            </label>

            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text text-white">Family</span>
                </div>
                <input 
                type="text" 
                className="input input-bordered w-full max-w-xs" 
                disabled
                value={selectedAircraft.family}
                />
            </label>

            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text text-white">Seat Capacity</span>
                </div>
                <input 
                type="text" 
                className="input input-bordered w-full max-w-xs" 
                disabled
                value={selectedAircraft.seat_capacity}
                />
            </label>

            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text text-white">Routes</span>
                </div>
                <input 
                type="text" 
                className="input input-bordered w-full max-w-xs" 
                disabled
                value={selectedAircraft.applicable_routes}
                />
            </label>
              </>
            )}
            <div className="flex justify-center">
                <button 
                className="btn btn-primary text-white mt-4"
                type="button" 
                onClick={handleCreateAircraft}>
                Create Aircraft
                </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default CreateAircraftModal;