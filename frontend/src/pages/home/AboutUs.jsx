import React from "react";
import logoImage from "../../assets/logo.png";
import AboutBackground from "../../assets/About-background.jpg";

import { Link, useNavigate } from "react-router-dom";
const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-hidden">
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
                  <Link to="/contact_us">Contact Us</Link>
                </li>
                <li>
                  <Link to="/">Home</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div
          style={{
            backgroundImage: `url(${AboutBackground})`,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            height: "60vh",
            width: "full",
            backgroundSize: "fit",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: -1,
            opacity: "0.4",
          }}
        ></div>

        <div className="card shadow-xl">
          <div className="bg-white text-neutral-content">
            <div className="card-body items-center text-center">
              <h2 className="card-title mt-2">About NimbusAirways</h2>
              <p className="text-sm">
                Welcome to NimbusAirways, where we transcend boundaries and
                bring the world closer to you. <br />
                At NimbusAirways, we believe in fostering connections, enabling
                people to explore the wonders of the world, and creating
                unforgettable travel experiences.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 bg-white text-neutral-content">
            <div className="card-body items-center text-center">
              <h2 className="card-title mt-2">
                Connecting People Across the Globe
              </h2>
              <p className="text-sm">
                In a world where distances are measured not just in miles but in
                the richness of experiences, NimbusAirways is committed to
                keeping people connected regardless of location. Our airline is
                more than a mode of transport; it's a bridge that connects
                cultures, reunites loved ones, and facilitates new beginnings.
              </p>
            </div>

            <div className="card-body items-center text-center">
              <h2 className="card-title mt-2">Your Journey, Our Priority</h2>
              <p className="text-sm">
                Whether you're traveling for business or pleasure, NimbusAirways
                is dedicated to ensuring that your journey is seamless,
                comfortable, and filled with anticipation. We understand that
                every trip is unique, and we strive to tailor our services to
                meet the diverse needs of our passengers. May it be a solo
                adventure or a family vacation, NimbusAirways is your trusted
                partner in exploration.
              </p>
            </div>

            <div className="card-body items-center text-center">
              <h2 className="card-title mt-2">
                Experience the Joy of Air Travel
              </h2>
              <p className="text-sm">
                There's an unparalleled joy in soaring through the skies,
                witnessing breathtaking landscapes unfold beneath you. At
                NimbusAirways, we believe that air travel should not only be
                swift but also enjoyable. With our state-of-the-art aircraft and
                a commitment to excellence, we promise an experience that goes
                beyond reaching your destination – it's about savoring the
                journey.
              </p>
            </div>

            <div className="card-body items-center text-center">
              <h2 className="card-title mt-2">Excellence in the Skies</h2>
              <p className="text-sm">
                NimbusAirways takes pride in its fleet of top-tier aircraft,
                meticulously maintained to meet the highest safety standards.
                Our crew comprises skilled professionals dedicated to making
                your flight memorable. From takeoff to landing, our commitment
                to outstanding customer service ensures that every aspect of
                your journey with NimbusAirways is nothing short of exceptional.
              </p>
            </div>
          </div>

          <div className="bg-white text-neutral-content">
            <div className="card-body items-center text-center">
              <p className="text-sm">
                Embark on a voyage with NimbusAirways - where each flight is a
                step towards connecting the world, making dreams take flight,
                and creating memories that last a lifetime. <br /> Thank you for
                choosing us as your travel companion. <br /> Discover the Skies
                with Nimbus Airways: Elevating Your Journey Beyond Boundaries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutUs;
