import { useState, useEffect } from "react";
import { adminIndexRoutesApi } from "../../../../lib/admin/adminusersapi"

// eslint-disable-next-line react/prop-types
const ShowRoutesModal = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const routesData = await adminIndexRoutesApi();
        setRoutes(routesData);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };

    fetchRoutes();
  }, []);

  const headers = [
    "ID",
    "Origin",
    "Destination",
    "Origin Airport",
    "Destination Airport",
    "Price",
  ];

  return (
    <div className="overflow-x-auto bg-accent text-secondary">
      <h2 className="flex justify-center text-2xl font-bold my-2">CURRENT ROUTES</h2>
      <table className="table table-xs">
        <thead>
          <tr className="text-secondary">
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {routes.map((route) => (
            <tr key={route.id}>
              <td>{route.id}</td>

              <td>
                <p>{route.origin_location}</p>
                <span className="italic">{route.origin_code}</span>
              </td>

              <td>
                <p>{route.destination_location}</p>
                <span className="italic">{route.destination_code}</span>
              </td>


              <td>{route.origin_name}</td>

              

              <td>{route.destination_name}</td>
              <td>{route.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
  
  export default ShowRoutesModal;