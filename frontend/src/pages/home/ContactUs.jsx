import React from "react";
import logoImage from "../../assets/logo.png";
import Footer from "./footer";
import { Link, useNavigate } from "react-router-dom";

const ContactUs = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-base-100">
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
                  <Link to="/">Home</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="hero">
        <div className="card w-96 bg-secondary text-primary-content my-10">
          <div className="card-body justify-center items-start">
            <h2 className="card-title font-serif">Contact Us</h2>
            <p className="text-sm text-justify font-serif">
              If you have any questions or concerns, please feel free to contact
              us using the details below. We are always happy to help and answer
              any questions you may have.
            </p>
            <br />
            <p className="font-bold text-center p-0">1-800-123-4567</p>
            <p className="font-bold text-center p-0">
              contact_us@nimbus-airways.com
            </p>
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ContactUs;
