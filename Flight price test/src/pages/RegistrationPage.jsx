import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const RegistrationPage = () => {
  const navigateTo = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const mainURL =
    "https://fictional-enigma-gw7pwwx7g9pf9rjq-3001.app.github.dev";

  const handleRegister = async () => {
    try {
      await axios.post(`${mainURL}/register`, {
        username,
        password,
      });
      setRegistrationSuccess(true);
      navigateTo("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <h2>Registration Page</h2>
      {registrationSuccess ? (
        <p>Registration successful! Redirecting to login...</p>
      ) : (
        <div>
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
          <button className="btn btn-primary" onClick={handleRegister}>
            Register
          </button>
        </div>
      )}
      {/* <button onClick={handleLogin}>Login</button> */}
    </div>
  );
};
export default RegistrationPage;
