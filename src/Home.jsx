import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

export default function Home() {
  const [response, setResponse] = useState("");
  const navigate = useNavigate();

  const callApi = async (endpoint) => {
    try {
      const token = localStorage.getItem("accessToken");
      const url = `http://localhost:8801/sap/${endpoint}`;
      console.log(url, "22222222222222222222222222222222222222222222", token);
      let res = {}
      if (endpoint == "zhr2001") {
        res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        res = await axios.post(url, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });        
      }
      setResponse(JSON.stringify(res.data, null, 2));
    } catch (err) {
      console.log("Greška:", err);
      if (err.response?.status === 401) {
        localStorage.clear(); // 🧹 očisti token
        navigate("/"); // 🔀 preusmeri na login
      } else {
        const message = err.response?.data?.message || err.message;
        setResponse("Error: " + message);
      }
    }
  };

  const handleProfileClick = () => callApi("zhr2001");
  const handleDashboardClick = () => callApi("call-sap");
  const handleSettingsClick = () => callApi("settings");

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <div>
        <h2>Home</h2>
        <button onClick={handleProfileClick}>Sap pa2001</button>
        <button onClick={handleDashboardClick}>Sap test Sap Tokoen</button>
        <button onClick={handleSettingsClick}>Test</button>

        <br />
        <br />
        <textarea value={response} readOnly rows={10} cols={60}></textarea>
      </div>
    </>
  );
}
