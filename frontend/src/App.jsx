import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import FlightsSearchComponent from "./pages/FlightsSearch";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Registration />} />
          <Route path="/" element={<Home />} />
          <Route path="flight_search" element={<FlightsSearchComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
