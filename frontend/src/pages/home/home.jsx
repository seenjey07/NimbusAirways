import React from "react";
import Footer from "../home/footer";
import logoImage from "../../assets/logo.png";
import homepageVideo from "../../assets/HomepageVideo.mp4";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div>
        <div className="navbar bg-accent">
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
          <div className="flex-none gap-2">
            <div className="form-control">
              <input
                type="text"
                placeholder="Enter a city"
                className="input input-bordered bg-white text-sm w-20 md:w-auto"
              />
            </div>
            <div>
              <button className="btn btn-info">Search</button>
            </div>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-primary ">
                <div className="w-10 rounded-full text-white">Menu</div>
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
        </div>
      </div>

      <div
        style={{
          position: "relative",
          flex: 1,
        }}
      >
        <video
          src={homepageVideo}
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

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
