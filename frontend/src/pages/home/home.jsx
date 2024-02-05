import React from "react";
import Footer from "../home/footer";
import logoImage from "../../assets/logo.png";
import homepageVideo from "../../assets/HomepageVideo.mp4";
import { useNavigate } from "react-router-dom";

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
                placeholder="Search"
                className="input input-bordered w-24 md:w-auto"
              />
            </div>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost">
                <div className="w-10 rounded-full text-base-100">Menu</div>
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
                  <a>About</a>
                </li>
                <li>
                  <a>Contact Us</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          flex: "1 0 auto",
          overflow: "hidden",
          position: "relative",
          height: "34vw", // Aspect ratio: 16:9 (1280x800)
          maxWidth: "100%",
        }}
      >
        <video
          src={homepageVideo}
          controls
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

      <div
        style={{
          flex: "1 0 auto",
          overflow: "hidden",
        }}
      >
        <Footer />
      </div>
    </div>
  );
};

export default Home;
