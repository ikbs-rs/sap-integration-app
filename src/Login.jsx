import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8801/user/login", {
        username,
        password,
      });
      console.log(response.data, "++++++++++++++++++++++++++++++++++++++++++++++++")
      const { token, refreshToken } = response.data;
      localStorage.setItem("accessToken", token);
      localStorage.setItem("refreshToken", refreshToken);
      navigate("/home");
    } catch (err) {
      alert("Login failed", err);
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
      <div className="card">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <div className="card">
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </>
  );
}
