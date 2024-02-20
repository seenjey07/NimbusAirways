import React, { useState, useEffect } from "react";
import Footer from "../home/footer";
import logoImage from "../../assets/logo.png";
// import homepageVideo from "../../assets/HomepageVideo.mp4";
import { Link, useNavigate } from "react-router-dom";
import FlightSearchDestination from "../../components/flightsearchdestination";
import { indexedRoutesApi } from "../../lib/flightsapi";

// eslint-disable-next-line react/prop-types
const Home = ({ addAlert }) => {
  const navigate = useNavigate();
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [destination_location, setDestination_location] = useState("");
  const [isBookNowClicked, setIsBookNowClicked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const routesData = await indexedRoutesApi();
        const uniqueDestinationLocations = Array.from(
          new Set(routesData.map((route) => route.destination_location))
        );
        setDestinationOptions(uniqueDestinationLocations);
      } catch (error) {
        console.error("Error fetching initial flight information:", error);
        addAlert("error", "Error fetching flights. Please try again.");
      }
    };
    fetchData();
  }, []);

  const handleDestinationSelect = (selectedOption) => {
    setDestination_location(selectedOption);
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!destination_location) {
      addAlert("error", "Please choose a destination before searching.");
      return;
    }

    localStorage.setItem("destination_from_homepage", destination_location);

    navigate(`/flight_search`);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <div className="navbar bg-accent top-0">
          <div className="flex-1">
            <figure>
              <img
                src={logoImage}
                alt="Logo"
                onClick={() => navigate("/")}
                className="btn btn-ghost cursor-pointer"
                style={{ width: "130px", height: "auto" }}
              />
            </figure>
          </div>
          <label className="form-control w-full max-w-xs mr-2 items-end">
            <FlightSearchDestination
              destinationOptions={destinationOptions}
              onSelect={handleDestinationSelect}
              setDestination_location={setDestination_location}
              setIsBookNowClicked={setIsBookNowClicked}
            />
          </label>
          <div>
            <button className="btn btn-info mr-2" onClick={handleSearch}>
              Search
            </button>
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-primary">
              <div className="w-10 rounded-full text-black">Menu</div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a
                  className="justify-between"
                  onClick={() => navigate("/login")}
                >
                  Login/Register
                </a>
              </li>
              <li>
                <Link to="/about_us">About Us</Link>
              </li>
              <li>
                <Link to="/contact_us">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          style={{
            position: "relative",
            flex: 1,
            height: "5%",
            margin: "0",
          }}
        >
          <video
            // src={homepageVideo}
            autoPlay
            loop
            muted
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Home;
