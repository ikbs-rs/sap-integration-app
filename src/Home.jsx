import { useState } from "react";
import axios from "axios";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

const endpoints = ["profile", "dashboard", "settings"];

export default function Home() {
  const [response, setResponse] = useState("");

  const callApi = async (endpoint) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(`http://localhost:8801/user/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResponse(JSON.stringify(res.data));
    } catch (err) {
      setResponse("Error: " + err.message);
    }
  };

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
        {endpoints.map((ep) => (
          <button key={ep} onClick={() => callApi(ep)}>
            {ep}
          </button>
        ))}
        <br />
        <br />
        <textarea value={response} readOnly rows={10} cols={60}></textarea>
      </div>
    </>
  );
}
