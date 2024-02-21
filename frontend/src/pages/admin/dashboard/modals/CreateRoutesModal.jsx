import { useState } from "react";
import { routeOptions } from "../../../../assets/Datas";
import { adminCreateRoutesApi } from "../../../../lib/admin/adminusersapi";

// eslint-disable-next-line react/prop-types
const CreateRoutesModal = ({ addAlert }) => {
  const [selectedOriginRoute, setSelectedOriginRoute] = useState(null);
  const [selectedDestinationRoute, setSelectedDestinationRoute] =
    useState(null);
  const [price, setPrice] = useState(null);
  const [status, setStatus] = useState(null);

  const sortedRouteOptions = routeOptions
    .slice()
    .sort((a, b) => a.location.localeCompare(b.location));

  const handleSelectedOriginRoute = (option) => {
    setSelectedOriginRoute(option);
  };

  const handleSelectedDestinationRoute = (option) => {
    setSelectedDestinationRoute(option);
  };

  const handleOpenRoute = async () => {
    if (
      !selectedOriginRoute ||
      !selectedDestinationRoute ||
      !price ||
      !status
    ) {
      addAlert("error", "Please fill in all required fields");
      return;
    }

    const routeData = {
      origin_location: selectedOriginRoute.location,
      origin_code: selectedOriginRoute.code,
      origin_name: selectedOriginRoute.name,
      destination_location: selectedDestinationRoute.location,
      destination_code: selectedDestinationRoute.code,
      destination_name: selectedDestinationRoute.name,
      price: parseFloat(price),
      is_available: status === "true",
    };

    try {
      await adminCreateRoutesApi(routeData);
      addAlert("success", "Route created successfully");
      document.getElementById("CreateRoutes").close();
    } catch (error) {
      addAlert("error", "Error creating route.");
      console.error(
        "Error creating route:",
        error.response?.data?.errors || error.message
      );
    }
  };

  return (
    <div className="text-white">
      <div className="card-body">
        <h2 className="card-title flex justify-center">OPEN ROUTES</h2>

        <div className="flex gap-10">
          <form className="w-full">
            <label className="form-control w-full max-w-xs">
              Select Origin:
              <select
                className="select select-bordered w-full max-w-xs text-black"
                value={selectedOriginRoute ? selectedOriginRoute.code : ""}
                onChange={(e) => {
                  const selectedOption = routeOptions.find(
                    (option) => option.code === e.target.value
                  );
                  handleSelectedOriginRoute(selectedOption);
                }}
              >
                <option value="" disabled>
                  -- Select Origin Route --
                </option>
                {sortedRouteOptions.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.location}
                  </option>
                ))}
              </select>
            </label>
            {selectedOriginRoute && (
              <>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-white">Origin</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    disabled
                    value={selectedOriginRoute.name}
                  />
                </label>

                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-white">Code</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    disabled
                    value={selectedOriginRoute.code}
                  />
                </label>

                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-white">Location</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    disabled
                    value={selectedOriginRoute.location}
                  />
                </label>
              </>
            )}
          </form>

          <form className="w-full">
            <label className="form-control w-full max-w-xs">
              Select Destination:
              <select
                className="select select-bordered w-full max-w-xs text-black"
                value={
                  selectedDestinationRoute ? selectedDestinationRoute.code : ""
                }
                onChange={(e) => {
                  const selectedOption = routeOptions.find(
                    (option) => option.code === e.target.value
                  );
                  handleSelectedDestinationRoute(selectedOption);
                }}
              >
                <option value="" disabled>
                  -- Select Origin Route --
                </option>
                {sortedRouteOptions.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.location}
                  </option>
                ))}
              </select>
            </label>
            {selectedDestinationRoute && (
              <>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-white">Destination</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    disabled
                    value={selectedDestinationRoute.name}
                  />
                </label>

                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-white">Code</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    disabled
                    value={selectedDestinationRoute.code}
                  />
                </label>

                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-white">Location</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    disabled
                    value={selectedDestinationRoute.location}
                  />
                </label>
              </>
            )}
          </form>
        </div>

        <div className="flex justify-center gap-16">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-white">Price</span>
            </div>
            <input
              type="number"
              placeholder="Price"
              className="input input-bordered w-full max-w-xs text-center text-black"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>

          <label className="form-control w-full max-w-xs text-black">
            <div className="label">
              <span className="label-text text-white">Status</span>
            </div>
            <select
              className="select select-bordered"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option disabled selected>
                Select
              </option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </label>
        </div>

        <div className="flex justify-center">
          <button
            className="btn btn-primary text-white mt-4"
            type="button"
            onClick={handleOpenRoute}
          >
            Open Route
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRoutesModal;
