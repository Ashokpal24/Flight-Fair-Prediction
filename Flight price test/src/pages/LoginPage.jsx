import React, { useState } from "react";
import axios from "axios";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const mainURL =
    "https://fictional-enigma-gw7pwwx7g9pf9rjq-3001.app.github.dev";

  const handleLogin = async () => {
    try {
      await axios.post(`${mainURL}/login`, { username, password });
      setMessage("Login successful!");
      onLogin();
    } catch (error) {
      console.error(error);
      setMessage("Login failed.");
    }
  };
  return (
    <div className="login-container">
      <h2>Login Page</h2>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          Username
        </span>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-control "
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          Password
        </span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          placeholder="Password"
          aria-label="Password"
          aria-describedby="basic-addon1"
        />
      </div>
      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
      <div>{message}</div>
    </div>
  );
};

export default LoginPage;
